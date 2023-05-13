import { createPasswordHash } from "../services/auth.js";
import db from "../database/index.js";

class userController {
	async create(req, res) {
		const {
			name,
			email,
			password,
			phone,
			phoneBranch,
			advisor,
			institute,
			instituteType,
			role,
		} = req.body;

		db.query(
			"SELECT * FROM user WHERE Email = ?",
			[email],
			async (err, result) => {
				if (err) {
					return res.status(500).send(err);
				} else if (result.length > 0) {
					return res.status(400).json({ message: "Email já existente!" });
				} else {
					const hashPassword = await createPasswordHash(password);

					db.query(
						`INSERT INTO user 
                        (Name, Email, Password, Phone, PhoneBranch, Advisor, Institute, InstituteType, CodRole) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
						[
							name,
							email,
							hashPassword,
							phone,
							phoneBranch,
							advisor,
							institute,
							instituteType,
							role,
						],
						(err) => {
							if (err) {
								return res.status(500).send(err);
							} else {
								return res
									.status(200)
									.json({ message: "Novo usuário cadastrado com sucesso!" });
							}
						}
					);
				}
			}
		);
	}

	async read(req, res) {
		db.query("SELECT * FROM user", (err, result) => {
			if (err) {
				return res.status(500).send(err);
			}

			return res.send(result);
		});
	}

	async update(req, res) {
		const {
			name,
			email,
			password,
			phone,
			phoneBranch,
			advisor,
			institute,
			instituteType,
			role,
		} = req.body;

		const { id } = req.params;

		const hashPassword = await createPasswordHash(password);

		db.query(
			`UPDATE user SET Name=?, Email=?, Password=?, Phone=?, PhoneBranch=?, Advisor=?, Institute=?, InstituteType=?, CodRole=? WHERE CodUser=?`,
			[
				name,
				email,
				hashPassword,
				phone,
				phoneBranch,
				advisor,
				institute,
				instituteType,
				role,
				id,
			],
			(err, result) => {
				if (err) {
					return res.status(500).send(err);
				}

				if (result.affectedRows === 0) {
					return res.status(404).json({
						message: "Nenhum agendamento encontrado com esse id.",
					});
				}

				return res
					.status(200)
					.json({ message: "Usuário atualizado com sucesso!" });
			}
		);
	}

	async delete(req, res) {
		const { id } = req.params;

		db.query("DELETE FROM user WHERE CodUser=?;", [id], async (err, result) => {
			if (err) {
				return res.status(500).send(err);
			}

			if (result.affectedRows === 0) {
				return res
					.status(404)
					.json({ message: "Nenhum usuário encontrado com esse id." });
			} else {
				return res
					.status(200)
					.send({ message: "Usuário excluido com sucesso!" });
			}
		});
	}
}

export default new userController();
