# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


## Other commands .

### npx nuxt dev 
 起動


##
### git init
現在のディレクトリで新しい Git リポジトリを初期化します。 （これにより、バージョン管理が開始されます。）
### git add README.md
README.md ファイルをステージングエリアに追加します。 （全ファイルを追加する場合は git add --all とします。）
### git commit -m "first commit"
ステージングエリアにある変更を「first commit」というメッセージでコミットします。 （最初の変更履歴を記録します。）
### git branch -M main
現在のブランチの名前を強制的に「main」に変更します。 （ローカルリポジトリのデフォルトブランチを「main」に設定します。）
### git remote add origin https://github.com/Ryu114-Sato/Nuxt-Project-1.git
GitHub 上のリポジトリ URL を「origin」という名前でリモートリポジトリとして登録します。 （ローカルリポジトリとリモートリポジトリを連携させるための設定です。）

### git push -u origin main --force
最初にgithubにpushする時のみforce コマンドでmainブランチを上書きする

### git push -u origin feature_202504
ローカルの「main」ブランチをリモートの「origin」リポジトリにプッシュし、今後のプッシュ・プルの対象として追跡関係を設定します。 （これにより、リモートにも初回のコミット内容が反映されます。）
### git branch feature_202504
