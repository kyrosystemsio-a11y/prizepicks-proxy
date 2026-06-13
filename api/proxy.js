export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  try {
    const url = 'https://api.prizepicks.com/projections?per_page=500&single_stat=true';
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
        'Accept': 'application/json',
        'Referer': 'https://app.prizepicks.com/',
        'Origin': 'https://app.prizepicks.com'
      }
    });

    const text = await response.text();

    if (!response.ok) {
      res.status(200).json({ error: true, status: response.status, body: text.slice(0, 500) });
      return;
    }

    try {
      const data = JSON.parse(text);
      res.status(200).json(data);
    } catch (parseErr) {
      res.status(200).json({ error: true, message: 'Non-JSON response', body: text.slice(0, 500) });
    }
  } catch (err) {
    res.status(200).json({ error: true, message: err.message });
  }
}
