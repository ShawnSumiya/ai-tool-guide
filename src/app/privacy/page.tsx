import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | AI Tool Guide',
  description: 'AI Tool Guideのプライバシーポリシー。個人情報の取り扱い、Cookieの使用について説明しています。',
  alternates: { canonical: `${siteUrl}/privacy` },
};

export default function PrivacyPage() {
  return (
    <article className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">プライバシーポリシー</h1>
        <p className="text-sm text-gray-600 mb-8">
          最終更新日: {new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. はじめに</h2>
            <p className="text-gray-700 leading-relaxed">
              AI Tool Guide（以下「当サイト」）は、ユーザーの個人情報の保護に細心の注意を払い、適切な管理を行います。
              本プライバシーポリシーは、当サイトがどのような情報を収集し、どのように使用・管理するかについて説明します。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. 収集する情報</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              当サイトでは、以下の情報を収集する場合があります：
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>アクセスログ情報（IPアドレス、ブラウザの種類、アクセス日時など）</li>
              <li>Cookie情報</li>
              <li>お問い合わせフォームから送信された情報（メールアドレス、お名前など）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Cookie（クッキー）について</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              当サイトでは、サービス向上と広告配信のためにCookieを使用しています。Cookieとは、ウェブサイトがユーザーのコンピュータに保存する小さなテキストファイルです。
            </p>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">3.1 Google AdSenseによるCookie</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              当サイトでは、Google AdSenseを使用して広告を配信しています。Googleおよびそのパートナーは、当サイトや他のサイトにアクセスした際のCookieを使用して、ユーザーに適切な広告を表示します。
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              Google AdSenseでは、以下の目的でCookieを使用します：
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>広告の配信と効果測定</li>
              <li>ユーザーに適した広告の表示（パーソナライズド広告）</li>
              <li>広告の不正クリックの防止</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Googleの広告Cookieの使用については、
              <a 
                href="https://policies.google.com/technologies/ads" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Googleの広告ポリシー
              </a>
              をご確認ください。
            </p>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">3.2 Cookieの管理</h3>
            <p className="text-gray-700 leading-relaxed">
              ブラウザの設定からCookieを無効にすることも可能です。ただし、Cookieを無効にすると、サイトの一部機能が正常に動作しない場合があります。
              Googleのパーソナライズド広告を無効にする場合は、
              <a 
                href="https://www.google.com/settings/ads" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Google広告設定
              </a>
              から設定できます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. 情報の使用目的</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              収集した情報は、以下の目的で使用します：
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>サイトの運営・改善・分析</li>
              <li>ユーザーへの適切な広告配信</li>
              <li>お問い合わせへの対応</li>
              <li>不正行為の防止・セキュリティ対策</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. 第三者への情報提供</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              当サイトでは、以下の場合を除き、ユーザーの個人情報を第三者に提供することはありません：
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>ユーザーの同意がある場合</li>
              <li>法令に基づき開示が求められた場合</li>
              <li>Google AdSenseなど、サービス提供のために必要な第三者（広告配信事業者など）への提供</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Google AdSenseによる情報収集については、
              <a 
                href="https://policies.google.com/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Googleのプライバシーポリシー
              </a>
              をご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. データの保護</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトでは、ユーザーの個人情報を保護するため、適切なセキュリティ対策を講じています。
              ただし、インターネット上での情報伝送は完全に安全ではないため、100%の安全性を保証することはできません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. プライバシーポリシーの変更</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトは、必要に応じて本プライバシーポリシーを変更する場合があります。
              変更後のプライバシーポリシーは、当サイトに掲載した時点で効力を生じるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">8. お問い合わせ</h2>
            <p className="text-gray-700 leading-relaxed">
              プライバシーポリシーに関するお問い合わせは、
              <Link href="/submit" className="text-blue-600 hover:text-blue-800 underline">
                お問い合わせフォーム
              </Link>
              よりご連絡ください。
            </p>
          </section>
        </div>
      </div>

      <div className="text-center">
        <Link 
          href="/"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          ホームに戻る
        </Link>
      </div>
    </article>
  );
}
