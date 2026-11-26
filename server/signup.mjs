import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { validEmail } from './email.mjs'

let database
function register(email) {
  if (!database) {
    const directory = resolve(process.env.RHYTHM_DATA_DIR || '.data')
    mkdirSync(directory, { recursive: true })
    database = new DatabaseSync(resolve(directory, 'early-access.sqlite'))
    database.exec('CREATE TABLE IF NOT EXISTS signups (email TEXT PRIMARY KEY)')
  }
  database.prepare('INSERT INTO signups (email) VALUES (?) ON CONFLICT(email) DO NOTHING').run(email)
}

function reply(response, status, ok) {
  response.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' })
  response.end(JSON.stringify({ ok }))
}

export async function signup(request, response, next) {
  if (request.url?.split('?')[0] !== '/api/early-access') return next()
  if (request.method !== 'POST') return reply(response, 405, false)
  if (request.headers['content-type']?.split(';')[0] !== 'application/json') return reply(response, 415, false)
  const chunks = []
  let size = 0
  try {
    for await (const chunk of request) {
      size += chunk.length
      if (size > 4096) return reply(response, 413, false)
      chunks.push(chunk)
    }
    const payload = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    const email = typeof payload?.email === 'string' ? payload.email.trim().toLowerCase() : ''
    if (!validEmail(email)) return reply(response, 422, false)
    register(email)
    reply(response, 200, true)
  } catch (error) {
    reply(response, error instanceof SyntaxError ? 400 : 500, false)
  }
}
