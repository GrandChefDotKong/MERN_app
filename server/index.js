import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extented: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extented: true }));
app.use(cors());
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => { res.send("APP Is RuNiNg":)) };

const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb+srv://adodotkong:LoZelda_64@cluster0.1mdlg.mongodb.net/<dbname>?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) =>  console.log(error.message));

mongoose.set('useFindAndModify', false);
