# AIアプリ・Webツール紹介サイト

AIで下書きをほぼ自動生成し、最小編集で量産を目指す紹介サイト。

## セットアップ

```bash
npm i
cp .env.local .env.local.example # 値は空のまま残す用
```

`.env.local` に以下を設定:

- `NEXT_PUBLIC_SITE_URL`: 本番のURL（例：`https://yourdomain.com`）**【重要: SEO対策に必須】**
- `NEXT_PUBLIC_ADSENSE_CLIENT_ID`: `ca-pub-xxxxxxxxxxxxxxxx` 形式
- `NEXT_PUBLIC_ADSENSE_SLOT_ID`: バナーのスロットID
- `OPENAI_API_KEY`: OpenAI のAPIキー（任意。未設定時はダミー応答）

## 開発

```bash
npm run dev
```

## ビルド

```bash
npm run build
npm run start
```

ビルド後に `postbuild` で自動的に `sitemap.xml` と `robots.txt` を生成します。

## 構成
- `src/app` App Router 構成
- `content/tools/*.md` 記事データ
- `src/app/api/generate` AI下書き生成API（暫定）
- `src/components/Adsense.tsx` AdSense 表示
- `src/app/rss/route.ts` RSS フィード

## 収益化
- AdSense クライアントIDとスロットを `.env.local` に設定
- 表示密度はポリシー準拠でチューニング

## Netlifyへのデプロイ

### 1. GitHubリポジトリの作成とプッシュ

```bash
# 変更をコミット
git add .
git commit -m "Initial commit"

# GitHubで新しいリポジトリを作成後、リモートを追加
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

### 2. Netlifyでの設定

1. [Netlify](https://app.netlify.com/) にログイン
2. 「Add new site」→「Import an existing project」
3. GitHubを選択して、リポジトリを接続
4. ビルド設定は自動検出されますが、以下を確認：
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: `20`（環境変数で設定可能）

### 3. 環境変数の設定

Netlifyのダッシュボードで環境変数を設定します。**初回デプロイ前またはデプロイ後すぐに設定してください。**

#### 環境変数の設定手順

1. Netlifyダッシュボードで、サイトを選択
2. 左サイドバーの「Site configuration」をクリック
3. 「Environment variables」をクリック
4. 「Add a variable」をクリック
5. 以下の環境変数を追加：

**必須（SEO対策）：**
- `NEXT_PUBLIC_SITE_URL`: NetlifyのURL（例：`https://your-site.netlify.app`）またはカスタムドメイン

**任意（機能を有効化する場合）：**
- `NEXT_PUBLIC_ADSENSE_CLIENT_ID`: AdSenseクライアントID（例：`ca-pub-xxxxxxxxxxxxxxxx`）  
  → 未設定の場合：広告は表示されません（非表示）
- `NEXT_PUBLIC_ADSENSE_SLOT_ID`: AdSenseスロットID  
  → 未設定の場合：広告は表示されません（非表示）
- `OPENAI_API_KEY`: OpenAIのAPIキー  
  → 未設定の場合：ツール投稿時にダミーの下書きが生成されます
- `FORMSPREE_ENDPOINT`: Formspreeの送信先URL  
  → 未設定の場合：デフォルトのURLが使用されます（メール通知は送信されます）

**💡 各機能の動作：**
- **広告表示**：`NEXT_PUBLIC_ADSENSE_CLIENT_ID`と`NEXT_PUBLIC_ADSENSE_SLOT_ID`の両方を設定すると、サイトに広告バナーが表示されます  
  → Google AdSenseの審査完了後、Netlifyの環境変数に設定してください
- **AI記事生成**：`OPENAI_API_KEY`を設定すると、ツール投稿時にAIが自動で記事の下書きを生成します
- **メール通知**：`FORMSPREE_ENDPOINT`は既にデフォルト値が設定されているため、変更しなくてもメール通知は送信されます

6. 各環境変数を追加したら、再度デプロイ（「Site overview」→「Trigger deploy」→「Deploy site」）

#### 環境変数の確認方法

デプロイが完了したら、以下を確認してください：

1. サイトのHTMLソースを表示（右クリック→「ページのソースを表示」）
2. `<meta>` タグ内のURLが正しい本番URLになっているか確認
3. `https://your-site.netlify.app/sitemap.xml` を開いて、URLが正しいか確認
4. `https://your-site.netlify.app/robots.txt` を開いて、Hostが正しいか確認

**⚠️ 重要：** `NEXT_PUBLIC_SITE_URL` が `https://example.com` のままになっている場合は、環境変数の設定が反映されていません。再度デプロイしてください。

### 4. デプロイの確認

- デプロイが完了したら、サイトURLで動作を確認
- `sitemap.xml` と `robots.txt` が正しく生成されているか確認

## SEO対策について

本プロジェクトは以下のSEO対策が実装されています：

### ✅ 実装済みのSEO対策

1. **メタタグ・OGP設定**
   - 全ページにメタタグ・Open Graph・Twitterカードを設定
   - 動的メタデータ生成（`generateMetadata`）
   - 適切なタイトル・説明文・画像設定

2. **構造化データ（JSON-LD）**
   - Schema.orgのArticle構造化データを記事ページに実装
   - 公開日・更新日・著者・パブリッシャー情報を含む

3. **サイトマップ・robots.txt**
   - ビルド時に自動生成される`sitemap.xml`
   - 検索エンジン用`robots.txt`の設定
   - カテゴリ・ツールページのインデックス

4. **RSSフィード**
   - `/rss`エンドポイントでRSSフィードを提供
   - ツール一覧を自動的に含む

5. **言語設定**
   - `<html lang="ja">`で日本語対応
   - locale設定で`ja_JP`を指定

6. **Canonical URL**
   - 全ページにcanonical URLを設定
   - 重複コンテンツ対策

### ⚠️ 重要：環境変数の設定

**必ず本番環境で環境変数を設定してください：**

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com  # 本番URLを設定
```

この設定がない場合、メタタグやsitemapに`https://example.com`が使用されます。

### 📝 確認方法

1. `npm run build` でビルド後、`public/sitemap.xml`を確認
2. `public/robots.txt`のURLが正しいか確認
3. ブラウザの開発者ツールでHTMLソースのメタタグを確認
4. [GoogleのRich Results Test](https://search.google.com/test/rich-results)で構造化データを確認

## 今後の拡張
- 管理UIからURL投入→原稿生成→Markdown保存
- 画像生成/OGP自動化
- カテゴリ自動タグ付け
