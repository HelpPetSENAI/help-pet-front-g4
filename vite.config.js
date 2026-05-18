import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const normalizeBearerToken = (token) => {
  if (!token || token.trim() === '' || token.trim() === 'COLE_SEU_TOKEN_AQUI') {
    return null
  }

  const cleanToken = token.trim()
  return cleanToken.toLowerCase().startsWith('bearer ')
    ? cleanToken
    : `Bearer ${cleanToken}`
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = env.VITE_API_TARGET_URL || 'https://help-pet-back-g2.azurewebsites.net'
  const bearerToken = normalizeBearerToken(env.VITE_API_TOKEN)

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (bearerToken) {
                proxyReq.setHeader('Authorization', bearerToken)
              }
            })
          },
        },
      },
    },
  }
})
