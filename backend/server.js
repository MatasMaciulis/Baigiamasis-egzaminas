// importuojame express js modulį :
import express from "express";

// importuojame dotenv - saugoja paslaptis
import dotenv from "dotenv";

// importuojame irašyta mongose - kuris padės prisijungti prie serverio
import mongoose from "mongoose";

// importuojame routes iš routes.js failo
import router from "./routes/routes.js";

// importuojame irašyta cors - kur nuima apsaugas nuo request
import cors from "cors";

// tam kad paimtume info is .env failo
dotenv.config();

// su process.env patenkame į .env faila ir pasiimame duomenis kurios išsaugojam į const
// || 4000 suveiks tuo atveju jei port 3000 bus užimtas ir t.t.
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// prisijungiam prie mongo DB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err));

// express pagalba susikurkime aplikacija (app)
const app = express();

// 1-kad mūsų app naudotu cors :
app.use(cors());

// 2-kad mūsų app naudotu is express paimta funkciją kuri padeda dirbti su json ir suprasti kas tai yra
app.use(express.json());

// 3-nurodome kad mūsų app naudotu routes kuriuos importavome iš routes.js failo
app.use(router);

// app STARTAS : pasirašome porta su funkcija kuri suveikia pasileidus app
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
