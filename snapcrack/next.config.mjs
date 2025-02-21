let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Potrebné pre Cloudflare Pages
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['res.cloudinary.com'], // Pre Cloudinary obrázky
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  }
}

// Opravená mergeConfig funkcia
function mergeConfig(baseConfig, userConfig) {
  if (!userConfig) {
    return baseConfig // Vráti základnú konfiguráciu ak nie je user config
  }

  const mergedConfig = { ...baseConfig }

  for (const key in userConfig) {
    if (
      typeof baseConfig[key] === 'object' &&
      !Array.isArray(baseConfig[key])
    ) {
      mergedConfig[key] = {
        ...baseConfig[key],
        ...userConfig[key],
      }
    } else {
      mergedConfig[key] = userConfig[key]
    }
  }

  return mergedConfig // Vráti zlúčenú konfiguráciu
}

export default mergeConfig(nextConfig, userConfig)
