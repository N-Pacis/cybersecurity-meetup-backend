import express, { json, urlencoded } from "express";
const app = express();
import { config } from "dotenv";
config({ path: "./.env" });
import "./utils/db_connection.js";
const PORT = process.env.PORT;
import cors from "cors";
import { swaggerUi } from "./utils/swagger.js";
import { corsFunction } from "./utils/cors.js";
import production from "./utils/production.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerJson = require("./swagger.json");

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
//routes
import userRoutes from "./routes/user.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import eventRoutes from "./routes/event.routes.js";
import speakerRoutes from "./routes/speaker.routes.js";
import applicantRoutes from "./routes/applicant.routes.js";
import partnerRoutes from "./routes/partner.routes.js";
import roleRoutes from "./routes/role.routes.js";
import { Applicant } from "./models/applicant.model.js";

app.use(cors());
app.use(corsFunction);
production(app);
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(express.static(__dirname + "/assets"));

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use(userRoutes);
app.use(contactRoutes);
app.use(eventRoutes);
app.use(speakerRoutes);
app.use(applicantRoutes);
app.use(partnerRoutes);
app.use(roleRoutes);

// const updateDb = async()=>{
//     await Applicant.updateMany([
//          {},
//          {$set:{
//              "applicationEmailSent":true,
//              "confirmationRejectionEmailSent":false
//              }
//          },
//          {
//              upsert:true
//          }
//      ])
//  }
//  updateDb()
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
