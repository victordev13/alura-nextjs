import db from '../../db.json';

export default function dbHandler(req, res) {
    /**
     * Liberar acesso externo à API
     */
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    }

    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,OPTIONS,PATCH,DELETE,POST,PUT'
    );

    res.json(db);
}
