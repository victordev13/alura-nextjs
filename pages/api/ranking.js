import dbConnect from '../../src/utils/dbConnect';
import PlayerScore from '../../src/models/PlayerScore';

export default async function ranking(req, res) {
    await dbConnect();

    let ranking = await PlayerScore.find({});

    ranking.sort((a, b) => {
        return b.score - a.score;
    });

    ranking = ranking.map((item) => {
        return { player: item.player, score: item.score };
    });

    res.json(ranking);
}
