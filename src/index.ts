import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import routes from "./api/routes";
import { initializeModels } from "./common/models";

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10) || 8000;
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

initializeModels();

app.use("/api", routes);
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
