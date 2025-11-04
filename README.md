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

## Re setup

```bash
# package-lock.json を再構築
rm -rf node_modules package-lock.json

npm install

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

### npx nuxt -v

| 種類                | バージョン | 内容                                            |
| ------------------- | ---------- | ----------------------------------------------- |
| **Nuxt CLI (nuxi)** | 3.28.0     | 開発用 CLI。`nuxi dev`, `nuxi build` などを実行 |
| **Nuxt 本体**       | 4.1.2      | 実際にアプリケーションを構成するフレームワーク  |

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

最初に github に push する時のみ force コマンドで main ブランチを上書きする

### git push -u origin feature_202504

ローカルの「main」ブランチをリモートの「origin」リポジトリにプッシュし、今後のプッシュ・プルの対象として追跡関係を設定します。 （これにより、リモートにも初回のコミット内容が反映されます。）

### git branch feature_202504

## Typescript

- 数値型
  let num: number = 42;
- 文字列型
  let str: string = "こんにちは";
- 真偽値型
  let isActive: boolean = true;
- 配列型
  let numbers: number[] = [1, 2, 3];
- オブジェクト型
  let person: { name: string; age: number } = { name: "太郎", age: 25 };
- ユニオン型（複数の型を許容）
  let id: number | string = "12345";
- any 型（任意の型を許容）
  let anything: any = "何でも OK";
- タプル型（固定長の配列）
  let tuple: [string, number] = ["TypeScript", 2023];

# TailwindCSS (テイルウィンド)

(環境設定)[https://tailwindcss.com/docs/installation/framework-guides/nuxt]

## ユーティリティクラスの例：

- p-4 　　　　：パディングを 16px 追加
- bg-blue-500：背景色を青に設定
- text-white ：テキスト色を白に設定
- rounded-lg ：角を丸くする
- max-w-md 　：要素の最大幅を「medium」に制限
- mx-auto 　　：要素を左右中央に配置
- mt-10 　　　：上方向に 40px のマージンを追加
- flex : <div>タグ内の要素を横並びにできる

## Responsive Design

- https://qiita.com/NaaaRiii/items/af1a5ee5cc35e56dfb2e

**Tailwind はモバイルファーストの設計思想に基づいて設計されています**

- モバイルファーストの例

```
<div className="text-sm sm:text-base lg:text-lg">
  {/*
    - デフォルト（モバイル）: text-sm (14px)
    - 640px以上: text-base (16px)
    - 1024px以上: text-lg (18px)
  */}
</div>
```

## Tailwind では、一貫性のあるデザインを実現するためにスケール値というシステムを採用しています。

1. これは、spacing（余白）、font-size（文字サイズ）、width（幅）などの値を統一された基準で管理する仕組みです。

2. 基本単位: 1 単位 = 0.25rem = 4px（ブラウザのデフォルトフォントサイズが 16px の場合）

3. よく使われるスケール値：

- 1 = 4px
- 2 = 8px
- 3 = 12px
- 4 = 16px ← gap-4、p-4 などでよく使用
- 6 = 24px
- 8 = 32px
- 12 = 48px
- 16 = 64px
- このため、gap-4 は「4 × 4px = 16px」の間隔を意味します。
