
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'

// pages/api/test-dns.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetch('https://django-gis-coffee.fly.dev/api/v1/authentication/login/', { method: "POST" });
        res.status(200).json({ success: true, status: response.status });
    } catch (e) {
        if (e instanceof Error) {
            res.status(500).json({ "error": { "cause": e?.cause, "message": e?.message } });
        }
    }
}