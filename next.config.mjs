import path from 'path'
import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    // Aquí agregamos los alias para que Webpack los entienda
    webpackConfig.resolve.alias = {
      ...(webpackConfig.resolve.alias || {}),
      '@': path.resolve(process.cwd(), 'src'),
      '@payload-config': path.resolve(process.cwd(), 'src/payload.config.ts'),
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
