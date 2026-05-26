const RAG_BASE = 'http://localhost:8000';
const N8N_WEBHOOK = 'http://localhost:5678/webhook/diyam-order';

export async function askQuestion(question, topK = 3) {
  const res = await fetch(`${RAG_BASE}/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, top_k: topK }),
  });
  if (!res.ok) throw new Error(`RAG API error ${res.status}`);
  return res.json();
}

export async function searchProducts(query, topK = 3, categoryFilter = null) {
  const body = { query, top_k: topK };
  if (categoryFilter) body.category_filter = categoryFilter;
  const res = await fetch(`${RAG_BASE}/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Search API error ${res.status}`);
  return res.json();
}

export async function sendOrderInquiry({ customerName, customerEmail, productName, quantity, totalValue }) {
  const res = await fetch(N8N_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customer_name: customerName,
      customer_email: customerEmail,
      product_name: productName,
      quantity,
      total_value: totalValue,
    }),
  });
  return res.ok;
}
