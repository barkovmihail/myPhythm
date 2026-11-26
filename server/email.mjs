const localPartPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/
const domainLabelPattern = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/

function normalizeDomain(domain) {
  if (/^[\x00-\x7F]*$/.test(domain)) return domain.toLowerCase()
  // Only hostname characters may reach the URL parser for IDN conversion.
  if (!/^[a-zA-Z0-9.\u0080-\u{10FFFF}-]+$/u.test(domain)) return ''
  try {
    return new URL(`http://${domain}`).hostname
  } catch {
    return ''
  }
}

export function normalizeEmail(value) {
  if (typeof value !== 'string') return ''
  const address = value.trim()
  if (address.length > 254) return ''

  const [local, domain, extra] = address.split('@')
  if (!domain || extra !== undefined || !localPartPattern.test(local)) return ''

  const hostname = normalizeDomain(domain)
  const labels = hostname.split('.')
  if (labels.length < 2 || !labels.every(label => domainLabelPattern.test(label))) return ''

  const normalized = `${local.toLowerCase()}@${hostname}`
  return normalized.length <= 254 ? normalized : ''
}
