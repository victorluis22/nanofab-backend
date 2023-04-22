import db from "../database/index.js"

class scheduleController{
    async create(req, res){}
    async read(req, res){
        db.query("Select * FROM schedule", (err, result) => {
			if (err) {
				return res.status(500).send(err);
			}

			return res.send(result);
		});
    }
    async update(req, res){}
    async delete(req, res){}
}

export default new scheduleController()