import express, { Express } from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import "./firebase";

const PORT: number = 2001;

const app: Express = express();
app.use(json());

const uri =
  "mongodb+srv://qtma:qtma@cluster0.eehgg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });

app.get("/test", function (req, res) {
  res.send("hullo");
});
