/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  // 本番環境でのスタンドアロンビルド設定
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  
  // 画像最適化設定
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
    ],
  },
  
  // 環境変数設定
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 
      (process.env.NODE_ENV === 'production' 
        ? 'https://ca-fastapi-demo.happystone-9a8bfb39.japaneast.azurecontainerapps.io'
        : 'http://localhost:8000'),
  },
}

module.exports = nextConfig 