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

# ポート3000を公開
EXPOSE 3000

# 開発モードでアプリケーションを起動
CMD ["pnpm", "dev"]