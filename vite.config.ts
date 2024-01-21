import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://johnnystorm19.github.io/RA_Toolkit_task-1_search-movie-app/'
})
