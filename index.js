import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./models/User.js";
import { getUsers } from "./controllers/users.js";
// import { users } from "./nodeJsUsers.js";
// Настройки
const app = express();
app.use(express.json());
app.use(cors());

app.get("/users", getUsers);

// Подключение к БД, запуск сервера
const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
      // User.insertMany(users);
    })
  )
  .catch((error) => console.log(`${error}, server not running`));
