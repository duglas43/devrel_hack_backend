import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from "./models/User.js";
import { getUsers } from "./controllers/users.js";
// import { users } from "./nodeJsUsers.js";
// Настройки
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/users", getUsers);

// Подключение к БД, запуск сервера
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    })
  )
  .catch((error) => console.log(`${error}, server not running`));
