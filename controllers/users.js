import User from "../models/user.js";
import qs from "qs";
export const getUsers = async (req, res) => {
  try {
    let perPage = 50;
    let { sortBy, langs, page } = qs.parse(req.query);
    page = Math.max(0, page);

    let users;
    let userCount;
    let maxPage = 0;

    if (!langs) {
      users = await User.find()
        .sort([[sortBy, -1]])
        .limit(perPage)
        .skip(perPage * page);
      userCount = await User.countDocuments();
    } else {
      users = await User.find({ langs: { $all: langs } })
        .sort([[sortBy, -1]])
        .limit(perPage)
        .skip(perPage * page);
      userCount = await User.countDocuments({ langs: { $all: langs } });
    }
    maxPage = Math.floor(userCount / perPage);
    res.status(200).json({ users, maxPage, userCount });
  } catch (error) {
    res.status(404).json({ message: `Не удалось получить пользователей` });
  }
};
