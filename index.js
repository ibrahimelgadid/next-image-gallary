require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const albums = require("./routes/albumsRouter");
const photos = require("./routes/photosRouter");
const { dbConnect } = require("./utilis/database");

dbConnect();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// app.use(express.static(path.join(__dirname, "./client/build")));
// app.get("*", (req, res, next) => {
//   res.sendFile(path.join(__dirname, "./client/build/"));
// });

app.use("/api/albums", albums);
app.use("/api/photos", photos);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server started on port 5000");
});
