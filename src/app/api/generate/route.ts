import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {
  const { url, title, desc } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;
  const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT || 'https://formspree.io/f/xovpyqnw';

  let draft = '';

  // AI生成処理
  if (!apiKey) {
    draft = `【下書き】\nタイトル: ${title ?? ''}\nURL: ${url ?? ''}\n概要: ${desc ?? ''}`;
  } else {
    try {
      const openai = new OpenAI({ apiKey });
      const prompt = `以下のツール紹介記事の骨子を日本語で300-500字程度で作成してください。\n\nタイトル: ${title}\nURL: ${url}\n補足: ${desc}`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'あなたはWebメディア編集者です。簡潔で読みやすい紹介文を書きます。' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      });

      draft = completion.choices?.[0]?.message?.content ?? '';
    } catch (e) {
      return NextResponse.json({ ok: false, message: '生成に失敗しました' }, { status: 500 });
    }
  }

  // Formspreeに送信（メール通知）
  let formspreeSent = false;
  try {
    const formspreeResponse = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _subject: `📝 新しいツール投稿: ${title}`,
        title: title,
        url: url,
        description: desc,
        draft: draft,
        timestamp: new Date().toISOString(),
        _format: 'plain',
      }),
    });

    if (formspreeResponse.ok) {
      formspreeSent = true;
    }
  } catch (formspreeError) {
    // Formspree送信エラーは警告のみ（メイン処理は続行）
    console.error('Formspree送信エラー:', formspreeError);
  }

  return NextResponse.json({ 
    ok: true, 
    message: formspreeSent 
      ? '投稿を受け付けました。メール通知を送信しました。' 
      : '投稿を受け付けました。',
    draft 
  });
}
