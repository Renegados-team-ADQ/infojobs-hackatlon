/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  ...nextConfig,
  env: {
    INFOJOBS_ID: process.env.INFOJOBS_ID,
    INFOJOBS_SECRET: process.env.INFOJOBS_SECRET
  }
}