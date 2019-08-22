const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const signin = require("./routes/auth/signin");
const signout = require("./routes/auth/signout");
const requireauth = require("./routes/auth/requireauth");
const changepassword = require("./routes/auth/changepassword");
const useradd = require("./routes/user/add");
const useredit = require("./routes/user/edit");
const userdelete = require("./routes/user/delete");
const userlist = require("./routes/user/list");
const userone = require("./routes/user/one");
const userblock = require("./routes/user/block");
const userunblock = require("./routes/user/unblock");
const app = express();
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/auth", signin);
app.use("/api/v1/auth", signout);
app.use("/api/v1/auth", requireauth);
app.use("/api/v1/user", changepassword);
app.use("/api/v1/user", useradd);
app.use("/api/v1/user", useredit);
app.use("/api/v1/user", userdelete);
app.use("/api/v1/user", userlist);
app.use("/api/v1/user", userone);
app.use("/api/v1/user", userblock);
app.use("/api/v1/user", userunblock);

const PORT = process.env.PORT || 5000;
app.listen(PORT, function(req, res, next) {
    console.log("web server listening on port 5000");
});
