//dotenv connection
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

//express setup
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//database connection
require("./config/database");

//cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//user schema
const UserData = require("./model/userSchema");

//all routes
app.use(require("./routes/Auth"));

//cors policy issue
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
