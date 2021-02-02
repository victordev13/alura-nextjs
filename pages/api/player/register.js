import dbConnect from '../../../src/utils/dbConnect';
import PlayerScore from '../../../src/models/PlayerScore';

export default async function register(req, res) {
    if (req.method === 'POST') {
        await dbConnect();
        if (!req.body.player || !req.body.score) {
            res.status(400).json({
                message: 'Dados mal informados',
            });
            return;
        }
        const { player, score } = req.body;
        const playerData = { player, score };

        try {
            const playerExists = await PlayerScore.findOne({
                player: player,
            });

            if (playerExists) {
                res.status(409).json({ message: 'Player já registrado' });
                return;
            }

            const newRegister = new PlayerScore(playerData);
            await newRegister.save();

            if (!newRegister) {
                throw new Error('Não foi possível registrar a pontuação');
            }

            res.json({ message: 'Pontuação registrada', data: newRegister });
        } catch (err) {
            console.error(err);
        }
        return;
    }

    res.end();
}
