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

Netlifyのダッシュボードで「Site settings」→「Environment variables」から以下を設定：

- `NEXT_PUBLIC_SITE_URL`: NetlifyのURL（例：`https://your-site.netlify.app`）またはカスタムドメイン
- `NEXT_PUBLIC_ADSENSE_CLIENT_ID`: （任意）AdSenseクライアントID
- `NEXT_PUBLIC_ADSENSE_SLOT_ID`: （任意）AdSenseスロットID
- `OPENAI_API_KEY`: （任意）OpenAIのAPIキー

### 4. デプロイの確認

- デプロイが完了したら、サイトURLで動作を確認
- `sitemap.xml` と `robots.txt` が正しく生成されているか確認

## 今後の拡張
- 管理UIからURL投入→原稿生成→Markdown保存
- 画像生成/OGP自動化
- カテゴリ自動タグ付け
