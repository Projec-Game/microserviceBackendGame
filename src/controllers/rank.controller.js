import Ranking from '../models/ranking.model.js'
import User from '../models/user.model.js';

export const rankScore = async (req, resp) => {
    try {
      const { score, username } = req.body;

      // Buscar si ya existe un registro para el usuario actual
      const existingRanking = await Ranking.findOne({ username });
  
      if (existingRanking) {
        // Si el usuario ya tiene un registro, actualiza solo si el nuevo puntaje es mayor
        if (score > existingRanking.score) {
          existingRanking.score = score;
          const updatedRanking = await existingRanking.save();
          resp.json(updatedRanking);
        } else {
          // No actualiza si el nuevo puntaje no es mayor
          resp.json(existingRanking);
        }
      } else {
        // Si el usuario no tiene un registro, crea uno nuevo
        const newRanking = new Ranking({
          username,
          score,
        });
  
        const saveRanking = await newRanking.save();
        resp.json(saveRanking);
      }
    } catch (error) {
      resp.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const rankScoreTop = async (req, resp) => {
    try {
      // Paso 1: Obtener los primeros 5 registros con score más alto
      const topScores = await Ranking.find()
        .sort({ score: -1 })
        .limit(5);
  
      if (topScores.length === 0) {
        return resp.status(404).json({ message: 'No se encontraron registros' });
      }
  
      resp.json(topScores);
    } catch (error) {
      resp.status(500).json({ error: 'Error interno del servidor' });
    }
};
  