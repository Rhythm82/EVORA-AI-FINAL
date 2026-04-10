import Score from "../models/score.model.js";
import Criteria from "../models/criteria.model.js";
import Participant from "../models/participant.model.js";

export const getLeaderboard = async (req, res) => {
  try {
    const { eventId } = req.params;
    if (!eventId) {
      return res.status(400).json({ message: "EventId required" });
    }
    const criteria = await Criteria.find({ eventId });

    const scores = await Score.find({ eventId });

    const result = {};

    for (const s of scores) {
      const weight =
        criteria.find((c) => c._id.toString() === s.criteriaId)?.weight || 1;

      if (!result[s.participantId]) {
        result[s.participantId] = 0;
      }

      result[s.participantId] += s.score * weight;
    }

    const leaderboard = [];

    for (const pid in result) {
      const participant = await Participant.findById(pid);

      leaderboard.push({
        teamName: participant.teamName,
        leader: participant.name,
        email: participant.email,
        phone: participant.phone,
        score: result[pid],
      });
    }

    leaderboard.sort((a, b) => b.score - a.score);

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({
      message: "Leaderboard error",
    });
  }
};
