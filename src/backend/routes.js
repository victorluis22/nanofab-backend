import { Router } from "express";

import auth from "./middleWares/auth.js";
import sessionsController from "./controllers/sessionsController.js";
import userController from "./controllers/userController.js";
import scheduleController from "./controllers/scheduleController.js";

const routes = Router();

//RESTFull
routes.post("/login", sessionsController.create);

routes.post("/user", userController.create);
routes.get("/users", userController.read);
routes.put('/user/:id', userController.update)
routes.delete("/user/:id", userController.delete);

routes.post("/schedule", scheduleController.create);
routes.get("/schedules", scheduleController.read);
routes.put('/schedule/:id', scheduleController.update)
routes.delete("/schedule/:id", scheduleController.delete);


// routes.use(auth)


export default routes;
