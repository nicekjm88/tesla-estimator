// next.config.js

const isProd = process.env.NODE_ENV === 'production';

const repo = 'tesla-estimator'; // 네 저장소 이름

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ✅ static export 모드
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
};

module.exports = nextConfig;
