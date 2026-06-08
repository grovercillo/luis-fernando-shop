import { test, expect } from '@playwright/test'

test.describe('Flujo de compra', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.removeItem('luis-fernando-cart'))
  })

  test('la home carga con los productos', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Luis Fernando/)
    await expect(page.getByText('Nuestros productos')).toBeVisible()
    await expect(page.getByText('Regere Emporium').first()).toBeVisible()
    await expect(page.getByText('La Membrillera').first()).toBeVisible()
    await expect(page.getByText('Lanzas').first()).toBeVisible()
  })

  test('añadir producto al carrito actualiza el contador', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('nav a[href="/carrito"] span')).not.toBeVisible()
    const buttons = page.getByRole('button', { name: 'Añadir al carrito' })
    await buttons.first().click()
    await expect(page.locator('nav a[href="/carrito"] span')).toBeVisible()
    await expect(page.locator('nav a[href="/carrito"] span')).toHaveText('1')
  })

  test('el carrito muestra los productos añadidos', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Añadir al carrito' }).first().click()
    await expect(page.locator('nav a[href="/carrito"] span')).toHaveText('1')
    await page.goto('/carrito')
    await expect(page.getByRole('heading', { name: 'Carrito' })).toBeVisible()
    await expect(page.getByText('Regere Emporium').first()).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('30,00 €', { exact: true })).toBeVisible()
  })

  test('el carrito persiste al navegar', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Añadir al carrito' }).first().click()
    await expect(page.locator('nav a[href="/carrito"] span')).toHaveText('1')
    await page.goto('/')
    await page.goto('/carrito')
    await expect(page.getByText('Regere Emporium').first()).toBeVisible({ timeout: 10000 })
  })

  test('se puede eliminar un producto del carrito', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Añadir al carrito' }).first().click()
    await page.goto('/carrito')
    await expect(page.getByText('Regere Emporium').first()).toBeVisible({ timeout: 10000 })
    await page.getByRole('button', { name: '×' }).click()
    await expect(page.getByText('Tu carrito está vacío')).toBeVisible()
  })

  test('el carrito vacío muestra mensaje y botón de volver', async ({ page }) => {
    await page.goto('/carrito')
    await expect(page.getByText('Tu carrito está vacío')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Ver productos' })).toBeVisible()
  })

  test('botón ver productos lleva a la home', async ({ page }) => {
    await page.goto('/carrito')
    await page.getByRole('button', { name: 'Ver productos' }).click()
    await expect(page).toHaveURL('/')
  })

})