/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['static.overlay-tech.com', 'lh3.googleusercontent.com', 'books.google.com', 'firebasestorage.googleapis.com'],
  },
}
module.exports = nextConfig
