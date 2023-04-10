const mongoose = require("mongoose");
exports.dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("connected to db"))
    .catch((err) => console.error(err));
};
