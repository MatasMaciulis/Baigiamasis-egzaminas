// tam kad paimtume Router funkciją
import express from "express";

// importuojame aprašytas Callback funkcijas iš controllers.js
import { addNewUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/controllers.js";
// pasiimame Router funkciją, kad galėtume susikurti routes
const router = express.Router();

//---------------------------------------------- POST -----------------------------------------------------------
// susikuriame .post router
// Callback funkcija mes aprašysime controllers.js faile taip "paskaldydami" savo kodą
// apraše ir importave į routers.js Callback funkciją mes ją idedame čia į post router:
router.post("/registration", addNewUser);

//---------------------------------------------- GET -----------------------------------------------------------
// susikuriame .get router
// Callback funkcija mes aprašysime controllers.js faile taip "paskaldydami" savo kodą
// apraše ir importave į routers.js Callback funkciją mes ją idedame čia į get router:
router.get("/registration",getAllUsers);

//---------------------------------------------- GET by ID -----------------------------------------------------------
// susikuriame .get router
// Callback funkcija mes aprašysime controllers.js faile taip "paskaldydami" savo kodą
// apraše ir importave į routers.js Callback funkciją mes ją idedame čia į get router:
router.get("/registration/:id",getUserById);

//---------------------------------------------- DELETE -----------------------------------------------------------

// susikuriame .delete router, kuris priims :id pagal kuri trinsime
// Callback funkcija mes aprašysime controllers.js faile taip "paskaldydami" savo kodą
// apraše ir importave į routers.js Callback funkciją mes ją idedame čia į delete router:
router.delete("/registration/:id",deleteUser);

//---------------------------------------------- PUT (update) --------------------------------------------------------

// susikuriame .put router, kuris priims :id pagal kuri atnaujinsime
// Callback funkcija mes aprašysime controllers.js faile taip "paskaldydami" savo kodą
// apraše ir importave į routers.js Callback funkciją mes ją idedame čia į put router:
router.put("/registration/:id",updateUser);

// sukurta Router exportuojame
export default router;













