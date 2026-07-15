// Genera la firma de integridad que Wompi exige para procesar pagos.
// El secreto (WOMPI_INTEGRITY_SECRET) vive SOLO como variable de entorno en Netlify,
// nunca en el código visible del sitio.

const crypto = require('crypto');

exports.handler = async function (event) {
  // CORS básico (mismo sitio, pero por si acaso)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Método no permitido' }) };
  }

  try {
    const { reference, amountInCents, currency } = JSON.parse(event.body || '{}');

    if (!reference || !amountInCents || !currency) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Faltan parámetros (reference, amountInCents, currency)' }) };
    }

    const secret = process.env.WOMPI_INTEGRITY_SECRET;
    if (!secret) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Falta configurar WOMPI_INTEGRITY_SECRET en Netlify' }) };
    }

    // Fórmula exacta que exige Wompi: SHA256(referencia + montoEnCentavos + moneda + secreto)
    const cadena = `${reference}${amountInCents}${currency}${secret}`;
    const signature = crypto.createHash('sha256').update(cadena).digest('hex');

    return {
      statusCode: 200,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ signature }),
    };
  } catch (err) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: err.message }) };
  }
};
