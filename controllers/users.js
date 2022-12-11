import User from "../models/User.js";
import qs from "qs";
import XLSX from "xlsx";
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
export const getAllUsersInExcel = async (req, res) => {
  try {
    let { langs, sortBy } = qs.parse(req.query);
    let users;
    if (!langs) {
      users = await User.find().sort([[sortBy, -1]]);
    }
    users = await User.find({ langs: { $all: langs } }).sort([[sortBy, -1]]);
    users = users.map((user) => {
      return {
        name: user.name,
        langs: user.langs,
        stars: user.stars,
        commits: user.commits,
        prs: user.prs,
        issues: user.issues,
        contribs: user.contribs,
      };
    });
    let binaryWS = XLSX.utils.json_to_sheet(users);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, binaryWS, "Binary values");
    XLSX.writeFile(wb, "./excels/users.xlsx");
    res.redirect("../../excels/users.xlsx");
  } catch (error) {
    res.status(404).json({ message: `Не удалось получить пользователей` });
  }
};
