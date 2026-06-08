import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOrderConfirmation({
  to,
  orderNumber,
  items,
  total,
  shipping,
}: {
  to: string
  orderNumber: string
  items: { name: string; brand: string; quantity: number; price_cents: number }[]
  total: number
  shipping: number
}) {
  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 10px 0; border-bottom: 0.5px solid #F5ECD8; color: #5C3317; font-size: 13px;">
        ${item.brand} — ${item.name}
      </td>
      <td style="padding: 10px 0; border-bottom: 0.5px solid #F5ECD8; color: #8A7D6B; font-size: 13px; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 10px 0; border-bottom: 0.5px solid #F5ECD8; color: #5C3317; font-size: 13px; text-align: right;">
        ${((item.price_cents * item.quantity) / 100).toFixed(2).replace('.', ',')} €
      </td>
    </tr>
  `).join('')

  const totalEur = (total / 100).toFixed(2).replace('.', ',')
  const shippingEur = (shipping / 100).toFixed(2).replace('.', ',')

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="UTF-8"></head>
    <body style="margin: 0; padding: 0; background: #FAF6EE; font-family: Georgia, serif;">
      <div style="max-width: 560px; margin: 0 auto; padding: 40px 20px;">

        <!-- Header -->
        <div style="text-align: center; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid #C4722A;">
          <h1 style="font-size: 28px; color: #5C3317; margin: 0 0 4px;">Luis Fernando</h1>
          <p style="font-size: 13px; color: #C4722A; margin: 0; font-style: italic;">Sabores de Puente Genil</p>
        </div>

        <!-- Confirmación -->
        <div style="background: #fff; border-radius: 10px; border: 0.5px solid rgba(92,51,23,0.15); padding: 28px; margin-bottom: 24px;">
          <p style="font-size: 11px; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase; color: #8A7D6B; margin: 0 0 8px;">Pedido confirmado</p>
          <h2 style="font-size: 22px; color: #5C3317; margin: 0 0 16px;">Gracias por tu pedido</h2>
          <p style="font-size: 13px; color: #8A7D6B; line-height: 1.7; margin: 0;">
            Hemos recibido tu pedido <strong style="color: #5C3317;">#${orderNumber}</strong> y lo estamos preparando. 
            Te avisaremos cuando esté en camino.
          </p>
        </div>

        <!-- Productos -->
        <div style="background: #fff; border-radius: 10px; border: 0.5px solid rgba(92,51,23,0.15); padding: 28px; margin-bottom: 24px;">
          <p style="font-size: 11px; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase; color: #8A7D6B; margin: 0 0 16px;">Tu selección</p>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="text-align: left; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #8A7D6B; padding-bottom: 8px; border-bottom: 1px solid #F5ECD8;">Producto</th>
                <th style="text-align: center; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #8A7D6B; padding-bottom: 8px; border-bottom: 1px solid #F5ECD8;">Uds.</th>
                <th style="text-align: right; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #8A7D6B; padding-bottom: 8px; border-bottom: 1px solid #F5ECD8;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #F5ECD8;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
              <span style="font-size: 12px; color: #8A7D6B;">Envío</span>
              <span style="font-size: 12px; color: #8A7D6B;">${shippingEur} €</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="font-size: 15px; color: #5C3317; font-weight: bold;">Total</span>
              <span style="font-size: 20px; color: #5C3317;">${totalEur} €</span>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding-top: 24px;">
          <p style="font-size: 11px; color: #8A7D6B; line-height: 1.7; margin: 0 0 8px;">
            Si tienes alguna duda escríbenos por Instagram<br>
            <a href="https://instagram.com/confiteriamiragenil" style="color: #C4722A;">@confiteriamiragenil</a>
          </p>
          <p style="font-size: 10px; color: #8A7D6B; letter-spacing: 0.1em; text-transform: uppercase; margin: 0;">
            Puente Genil · Córdoba · España
          </p>
        </div>

      </div>
    </body>
    </html>
  `

  return resend.emails.send({
    from: 'Luis Fernando <onboarding@resend.dev>',
    to,
    subject: `Pedido confirmado #${orderNumber} · Luis Fernando`,
    html,
  })
}