/**
 * ==========================================================================
 * Vercel Serverless Function - Supabase 서버리스 프록시 API (/api/supabase)
 * 프론트엔드에서 API Key 노출 없이 DB 읽기/쓰기를 서버 측에서 안전하게 대행함
 * 환경변수: SUPABASE_URL, SUPABASE_ANON_KEY
 * ==========================================================================
 */

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const supabaseUrl = process.env.SUPABASE_URL || "https://jeubjwaalcwkkxshbxys.supabase.co";
    const supabaseKey = process.env.SUPABASE_ANON_KEY || "sb_publishable_9qdJ56qWaMxsoJaSIlBWWQ_gdy45IwL";

    const { action, table, payload, id, select } = req.method === 'POST' 
        ? (typeof req.body === 'string' ? JSON.parse(req.body) : req.body)
        : req.query;

    try {
        let fetchUrl = `${supabaseUrl}/rest/v1/${table || 'profiles'}`;
        let fetchOptions = {
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            }
        };

        if (req.method === 'GET' || action === 'fetch') {
            if (id) fetchUrl += `?id=eq.${id}`;
            else if (select) fetchUrl += `?select=${select}`;
            else fetchUrl += `?select=*`;

            fetchOptions.method = 'GET';
        } else if (action === 'save' || action === 'upsert') {
            fetchOptions.method = 'POST';
            fetchOptions.headers['Prefer'] = 'resolution=merge-duplicates';
            fetchOptions.body = JSON.stringify(payload);
        } else if (action === 'delete') {
            fetchUrl += `?id=eq.${id}`;
            fetchOptions.method = 'DELETE';
        }

        const dbRes = await fetch(fetchUrl, fetchOptions);
        if (dbRes.ok) {
            const data = await dbRes.json();
            return res.status(200).json({ success: true, data });
        } else {
            const errText = await dbRes.text();
            return res.status(dbRes.status).json({ success: false, message: errText });
        }
    } catch (err) {
        console.error('Supabase Proxy Error:', err);
        return res.status(500).json({ success: false, message: err.message });
    }
}
