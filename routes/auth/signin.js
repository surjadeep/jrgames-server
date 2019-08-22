const express = require("express");
const pool = require("../../core/database");
const utility = require("../../core/utility");
const router = express.Router();

router.post("/signin", async function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    username = username.replace(/[\\$'"]/g, "\\$&");
    password = password.replace(/[\\$'"]/g, "\\$&");
    if (!username || !password) {
        return res.send({
            status: false,
            statusCode: 1005,
            errorText: "Username & Password cann't be left blank"
        });
    }
    try {
        const sql =
            "SELECT user_key, user_type, username, first_name, last_name FROM users WHERE username = '" +
            username +
            "' AND password = '" +
            password +
            "'";
        const result = await pool.query(sql);
        if (result.length) {
            const user_key = result[0].user_key;
            const token = utility.tokenForUser();
            const user_type = result[0].user_type;
            const username = result[0].username;
            const first_name = result[0].first_name;
            const last_name = result[0].last_name;
            const sql1 =
                "UPDATE `users` SET `signin_status` = '1', `auth_token` = '" +
                token +
                "' WHERE `user_key` = '" +
                user_key +
                "'";
            const result1 = await pool.query(sql1);
            if (result1) {
                res.send({
                    status: true,
                    statusCode: 1006,
                    token: token,
                    name: first_name + " " + last_name,
                    user_type: user_type,
                    username: username
                });
            }
        } else {
            return res.send({
                status: false,
                statusCode: 1007,
                errorText: "Invalid Username / Password"
            });
        }
    } catch (error) {
        return res.send({
            status: false,
            statusCode: 1004,
            errorCode: error.code
        });
    }
});
module.exports = router;
