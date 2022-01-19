const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./config/database");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const UserData = require("./model/userSchema");
app.use(require("./routes/Auth"));

const cors = require("cors");
app.use(cors());

app.use(UserData);

// ----------------- production --------------------------
const path = require("path");

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/clients/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "clients", "build", "index.html"));
  });
}
// ----------------- production --------------------------

app.listen(process.env.PORT, () => {
  console.log("server started...");
});
