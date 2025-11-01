import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  title: '免責事項 | AI Tool Guide',
  description: 'AI Tool Guideの免責事項。サイトの利用にあたっての責任範囲について説明しています。',
  alternates: { canonical: `${siteUrl}/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <article className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">免責事項</h1>
        <p className="text-sm text-gray-600 mb-8">
          最終更新日: {new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. 情報の正確性について</h2>
            <p className="text-gray-700 leading-relaxed">
              AI Tool Guide（以下「当サイト」）に掲載されている情報については、可能な限り正確な情報を提供するよう努めていますが、
              情報の正確性・完全性・最新性を保証するものではありません。
              ツールの機能や仕様、料金体系などは、メーカーの判断により予告なく変更される場合があります。
              必ず各ツールの公式サイトで最新情報をご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. 損害について</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              当サイトの利用により、以下のいずれかの損害が生じた場合でも、当サイト運営者は一切の責任を負いません：
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>当サイトに掲載されている情報を利用したことによる直接・間接的な損害</li>
              <li>当サイトで紹介しているツールの利用により生じた損害</li>
              <li>外部サイトへのリンクから移動した先での取引により生じた損害</li>
              <li>システムの不具合、サーバーダウン、その他の技術的な問題による損害</li>
              <li>当サイトへのアクセス、またはアクセス不能により生じた損害</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. 推奨・保証について</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトで紹介しているツールについて、特定のツールを推奨するものではありません。
              また、ツールの動作・機能・安全性について、当サイトは一切の保証を行いません。
              ツールの利用は、利用者の自己責任において行ってください。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. 外部サイトについて</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトには、外部サイトへのリンクが多数含まれています。
              外部サイトの内容、利用規約、プライバシーポリシー、サービス内容などについては、
              当サイト運営者は一切の責任を負いません。
              外部サイトへのアクセスは、利用者の判断と責任において行ってください。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. 広告について</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトでは、Google AdSense等の第三者配信による広告を掲載しています。
              広告の内容、広告主のサービス、広告から移動した先のサイトの内容については、
              当サイト運営者は一切の責任を負いません。
              広告の内容を信頼したことによるいかなる損害についても、当サイト運営者は責任を負いかねます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. サービスの中断・終了について</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトは、予告なくサービスの全部または一部を中断・終了することがあります。
              サービスの中断・終了により生じた損害について、当サイト運営者は一切の責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. コンテンツの変更・削除について</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトは、予告なくコンテンツの変更・削除を行う場合があります。
              掲載されていた情報が削除されたことにより生じた損害について、当サイト運営者は一切の責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">8. ウイルス・セキュリティについて</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトでは、セキュリティ対策を行っていますが、完全な安全性を保証するものではありません。
              当サイトの利用により、ウイルス感染やその他のセキュリティ上の問題が生じた場合でも、
              当サイト運営者は責任を負いかねます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">9. 免責事項の変更</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトは、必要に応じて本免責事項を変更する場合があります。
              変更後の免責事項は、当サイトに掲載した時点で効力を生じるものとします。
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
