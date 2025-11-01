import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {
  const { url, title, desc } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      ok: true,
      message: 'OPENAI_API_KEY が未設定のため、ダミー応答を返しました。',
      draft: `【下書き】\nタイトル: ${title ?? ''}\nURL: ${url ?? ''}\n概要: ${desc ?? ''}`,
    });
  }

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

    const draft = completion.choices?.[0]?.message?.content ?? '';
    return NextResponse.json({ ok: true, message: '生成しました', draft });
  } catch (e) {
    return NextResponse.json({ ok: false, message: '生成に失敗しました' }, { status: 500 });
  }
}
