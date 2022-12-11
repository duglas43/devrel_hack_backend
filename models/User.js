import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  langs: {
    type: Array,
    default: [],
  },
  stars: {
    type: Number,
    default: 0,
  },
  commits: {
    type: Number,
    default: 0,
  },
  prs: {
    type: Number,
    default: 0,
  },
  issues: {
    type: Number,
    default: 0,
  },
  contribs: {
    type: Number,
    default: 0,
  },
});
export default mongoose.model("User", UserSchema);
