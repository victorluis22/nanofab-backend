import db from "../database/index.js";

class scheduleController {
	async create(req, res) {
		const { analysisType, qtdSample, technique, returnSample, codUser } =
			req.body;

		db.query(
			"INSERT INTO schedule (AnalysisType, QtdSample, Technique, ReturnSample, CodUser) VALUES (?, ?, ?, ?, ?)",
			[analysisType, qtdSample, technique, returnSample, codUser],
			(err) => {
				if (err) {
					return res.status(500).send(err);
				}

				return res.json({ message: "Agendamento cadastrado com sucesso!" });
			}
		);
	}

	async read(req, res) {
		db.query("SELECT * FROM schedule", (err, result) => {
			if (err) {
				return res.status(500).send(err);
			}

			return res.send(result);
		});
	}

	async update(req, res) {
		const { analysisType, qtdSample, technique, returnSample, codUser } =
			req.body;
		const { id } = req.params;

		db.query(
			"UPDATE schedule SET AnalysisType=?, QtdSample=?, Technique=?, ReturnSample=?, CodUser=? WHERE CodSchedule=?",
			[analysisType, qtdSample, technique, returnSample, codUser, id],
			(err, result) => {
				if (err) {
					return res.status(500).send(err);
				}

				if (result.affectedRows === 0) {
					return res
						.status(404)
						.json({
							message: "Nenhum agendamento encontrado com esse id.",
						});
				}

				return res.json({ message: "Agendamento atualizado com sucesso!" });
			}
		);
	}

	async delete(req, res) {
		const { id } = req.params;

		db.query(
			"DELETE FROM schedule WHERE CodSchedule = ?",
			[id],
			(err, result) => {
				if (err) {
					return res.status(500).send(err);
				}

                if(result.affectedRows === 0) {
                    return res.status(404).json({message: "Nenhum agendamento encontrado com esse id."})
                }

				return res.json({ message: "Agendamento deletado com sucesso!" });
			}
		);
	}
}

export default new scheduleController();
