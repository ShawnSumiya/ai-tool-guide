import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  title: '利用規約 | AI Tool Guide',
  description: 'AI Tool Guideの利用規約。サイトの利用条件について説明しています。',
  alternates: { canonical: `${siteUrl}/terms` },
};

export default function TermsPage() {
  return (
    <article className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">利用規約</h1>
        <p className="text-sm text-gray-600 mb-8">
          最終更新日: {new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. はじめに</h2>
            <p className="text-gray-700 leading-relaxed">
              本利用規約（以下「本規約」）は、AI Tool Guide（以下「当サイト」）の利用条件を定めるものです。
              当サイトをご利用いただく際は、本規約に同意していただいたものとみなします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. サービスの内容</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトは、AIアプリケーション・Webツールに関する情報を提供するサービスです。
              当サイトは、予告なくサービス内容の変更・追加・削除を行う場合があります。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. 利用者の義務</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              利用者は、当サイトの利用にあたり、以下の行為を行ってはなりません：
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>当サイトの内容の無断転載・複製・改変</li>
              <li>当サイトの運営を妨害する行為</li>
              <li>他の利用者の情報収集</li>
              <li>不正アクセス、ハッキング、ウィルス送信</li>
              <li>その他、当サイトが不適切と判断する行為</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. 知的財産権</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトに掲載されているすべてのコンテンツ（文章、画像、デザインなど）の著作権その他の知的財産権は、
              当サイト運営者または正当な権利を有する第三者に帰属します。
              無断で複製・転載・改変することは禁止されています。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. 広告について</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトでは、第三者配信の広告サービス（Google AdSense等）を利用しています。
              広告の内容については、当サイト運営者は一切の責任を負いません。
              広告リンクから外部サイトに移動した際の取引・損害についても、当サイト運営者は責任を負いかねます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. 外部リンク</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトには、外部サイトへのリンクが含まれています。
              外部サイトの内容・利用規約・プライバシーポリシーについては、当サイト運営者は責任を負いません。
              外部サイトへのアクセスは、利用者の判断と責任において行ってください。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. サービスの中断・終了</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトは、以下の場合、サービスの全部または一部を中断・終了することがあります：
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>システムのメンテナンス・更新</li>
              <li>天災、その他の不可抗力</li>
              <li>その他、当サイト運営者が必要と判断した場合</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">8. 免責事項</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトの情報は、正確性・最新性・有用性を保証するものではありません。
              当サイトの利用により生じた損害について、当サイト運営者は一切の責任を負いません。
              詳細については、
              <Link href="/disclaimer" className="text-blue-600 hover:text-blue-800 underline">
                免責事項ページ
              </Link>
              をご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">9. 利用規約の変更</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトは、必要に応じて本規約を変更する場合があります。
              変更後の規約は、当サイトに掲載した時点で効力を生じるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">10. 準拠法・管轄裁判所</h2>
            <p className="text-gray-700 leading-relaxed">
              本規約は、日本法に準拠して解釈されます。
              本規約に関連する紛争については、当サイト運営者の所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。
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
