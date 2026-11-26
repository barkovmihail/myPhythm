import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  use: { reducedMotion: 'reduce' },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 0',
    wait: { stdout: /Local:\s+(?<PLAYWRIGHT_TEST_BASE_URL>http:\/\/127\.0\.0\.1:\d+\/)/ },
    env: { RHYTHM_DATA_DIR: 'test-results/data' },
  },
})
