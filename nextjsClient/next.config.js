/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    KEY: "123",
    REDIS_HOST: "127.0.0.1:6379",
    REDIS_PASSWORD: "1234",
    REDIS_PORT: "6379",
  },
};

module.exports = nextConfig
