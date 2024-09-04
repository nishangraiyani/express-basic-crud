import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/database";
import { router } from "./routes";
import path from "path";

const app = express();
dotenv.config();
const port = process.env.PORT ?? 3000;

app.use(bodyParser.json());

connectDB();
console.log("path.join(__dirname, public))", path.join(__dirname, "public/pages"));
app.use(express.static(path.join(__dirname, "public/pages")));

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/login.html"));
});
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/home.html"));
});


app.use(router);

app.get("/", (_req, res) => res.status(200).send("Server running!!"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
