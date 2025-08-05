# Node.js 18のイメージを使用
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpnpm-lock.yamlをコピー
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# pnpmをインストール
RUN npm install -g pnpm

# 依存関係をインストール
RUN pnpm install

# アプリケーションコードをコピー
COPY . .

# 既存の.nextディレクトリを削除（権限問題回避）
RUN rm -rf .next

# 環境変数を設定（Build時に埋め込まれる）
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NODE_ENV=production

# Next.jsアプリケーションをビルド
RUN pnpm build

# ポート3000を公開
EXPOSE 3000

# 本番モードでアプリケーションを起動
CMD ["pnpm", "start"]