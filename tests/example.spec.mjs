import { expect, test } from '@playwright/test'

for (const width of [360, 768, 1440]) {
  test(`«Посмотреть пример» переводит фокус на видимый заголовок при ширине ${width} px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const link = page.getByRole('link', { name: 'Посмотреть пример' })
    await link.focus()
    await page.keyboard.press('Enter')

    const heading = page.getByRole('heading', { level: 2, name: 'Представь, что ты заходишь в магазин после работы' })
    await expect(page).toHaveURL(/#dinner-question$/)
    await expect(heading).toBeFocused()
    await expect(heading).toBeInViewport({ ratio: 1 })
  })
}
