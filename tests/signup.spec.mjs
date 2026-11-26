import { expect, test } from '@playwright/test'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'

const endpoint = '/api/early-access'
const maxDomain = ['a'.repeat(63), 'b'.repeat(63), 'c'.repeat(57), 'com'].join('.')
const maxAddress = 'd'.repeat(64) + '@' + maxDomain

test('Форма и API отклоняют некорректные адреса', async ({ page, request }) => {
  const submitted = []
  page.on('request', req => {
    if (req.method() === 'POST' && new URL(req.url()).pathname === endpoint) submitted.push(req.url())
  })
  await page.goto('/')
  const field = page.getByLabel('Электронная почта')
  const submit = page.getByRole('button', { name: 'Получить ранний доступ' })
  for (const email of ['', 'example', 'person@example..com', 'a@-example.com', 'a@example-.com',
    'a@' + 'x'.repeat(64) + '.com', 'a b@example.com', 'a@@example.com', maxAddress + 'x']) {
    await field.fill(email)
    await submit.click()
    await expect(page.getByRole('alert')).toContainText(email ? 'Проверь адрес' : 'Введи почту')
    await expect(field).toBeFocused()
    await expect(field).toHaveAttribute('aria-invalid', 'true')

    const response = await request.post(endpoint, { data: { email } })
    expect(response.status(), email).toBe(422)
    expect(await response.json()).toEqual({ ok: false })
  }
  expect(submitted).toEqual([])
})

test('Форма и API принимают одинаковые адреса и сохраняют по одной заявке', async ({ page, request }, testInfo) => {
  const cases = [
    ['  Qa+Tag@Sub-Domain.Example  ', 'qa+tag@sub-domain.example'],
    ['qa@пример.рф', 'qa@xn--e1afmkfd.xn--p1ai'],
    [maxAddress, maxAddress],
  ]
  for (const [email] of cases) {
    await page.goto('/')
    await page.getByLabel('Электронная почта').fill(email)
    const sent = page.waitForResponse(res => new URL(res.url()).pathname === endpoint && res.request().method() === 'POST')
    await page.getByRole('button', { name: 'Получить ранний доступ' }).click()
    expect((await sent).status()).toBe(200)
    await expect(page.getByRole('heading', { name: 'Ты в списке раннего доступа' })).toBeVisible()

    const response = await request.post(endpoint, { data: { email } })
    expect(response.status(), email).toBe(200)
    expect(await response.json()).toEqual({ ok: true })
  }

  const db = new DatabaseSync(join(testInfo.project.outputDir, 'data', 'early-access.sqlite'), { readOnly: true })
  try {
    const stored = db.prepare('SELECT email FROM signups ORDER BY email').all().map(row => row.email)
    expect(stored).toEqual(cases.map(([, normalized]) => normalized).sort())
  } finally {
    db.close()
  }
})
