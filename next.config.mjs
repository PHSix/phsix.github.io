import mdx from '@next/mdx'

const withMDX = mdx()

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  distDir: 'dist',
  experimental: {
  },
  webpack: (conf) => {
    conf.resolve.fallback = {
      fs: false,
    }
    return conf
  },
}

export default withMDX(nextConfig)
