import Jwt from "jsonwebtoken";
import db from "../database/index.js";
import { checkPassword } from "../services/auth.js";
import authConfig from '../config/auth.js'

class sessionControler{
    async create(req, res){
        const { email, password } = req.body;

        db.query("SELECT * FROM user WHERE email = ?", [email], async (err, result) => {
            if(err){
                return res.status(500).send(err);
            }

            if(result.length === 0){
                return res.status(401).json({error: "User invalid."})
            }
            
            if(result.length > 0){
                const user = result[0]

                if(!await checkPassword(user, password)){
                    return res.status(401).json({error: "Password invalid."})
                }

                const { CodUser, Name, Email } = user

                return res.json({
                    user: {
                        CodUser,
                        Email,
                        Name,
                    },
                    token: Jwt.sign({ CodUser }, authConfig.secret, {
                        expiresIn: authConfig.expiresIn
                    })
                })
            }
        })
    }
}

export default new sessionControler()