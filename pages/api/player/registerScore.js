import dbConnect from '../../../src/utils/dbConnect';
import PlayerScore from '../../../src/models/PlayerScore';

export default async function register(req, res) {
  if (req.method === 'POST') {
    await dbConnect();
    if (!req.body.player && !req.body.score) {
      res.status(400).json({
        message: 'Dados mal informados',
      });
      return;
    }
    const { player, score } = req.body;

    try {
      const dbPlayer = await PlayerScore.findOne({
        player: player,
      });

      if (!dbPlayer) {
        res.status(409).json({ message: 'O player informado não existe' });
        return;
      }

      await PlayerScore.findOneAndUpdate({ player }, { score });

      res.json({
        message: 'Pontuação registrada',
        data: { player: player, score: score },
      });
    } catch (err) {
      console.error(err);
    }
    return;
  }

  res.end();
}
