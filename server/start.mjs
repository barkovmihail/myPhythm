import { createServer } from 'node:http'
import { existsSync } from 'node:fs'
import sirv from 'sirv'
import { signup } from './signup.mjs'

if (!existsSync('dist/index.html')) throw new Error('Сначала запусти npm run build.')
const assets = sirv('dist', { etag: true })
const port = Number(process.env.PORT || 4173)
createServer((req, res) => signup(req, res, () => assets(req, res))).listen(port, () => {
  console.log('My Rhythm: http://localhost:' + port)
})
