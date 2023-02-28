import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => { res.send("sharing-memories API ...") });

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL, { 
    useNewUrlParser: true, useUnifiedTopology: true 
})
.then(() => app.listen(PORT, () => console.log(`Server running  ...`)))
.catch((error) =>  console.log(error.message));


mongoose.set('useFindAndModify', false);
