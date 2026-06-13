jsexport default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const url = 'https://api.prizepicks.com/projections?per_page=500&single_stat=true';
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/json',
      'Referer': 'https://app.prizepicks.com/'
    }
  });

  const data = await response.json();
  res.status(200).json(data);
}
