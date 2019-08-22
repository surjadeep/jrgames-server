const express = require("express");
const pool = require("../../core/database");
const utility = require("../../core/utility");
const router = express.Router();

router.post("/add", async function(req, res, next) {
    const token = req.body.token;
    if (!token) {
        return res.status(200).send({
            status: false,
            statusCode: 1001,
            errorText: "Not authorized"
        });
    }
    const user_key = utility.generateRandomInteger();
    const user_type = req.body.usertype;
    let username = req.body.username;
    let password = req.body.password;
    let first_name = req.body.firstname;
    let last_name = req.body.lastname;
    const signin_status = "0";
    const auth_token = "";
    const active_status = "1";
    username = username.replace(/[\\$'"]/g, "\\$&");
    password = password.replace(/[\\$'"]/g, "\\$&");
    first_name = first_name.replace(/[\\$'"]/g, "\\$&");
    last_name = last_name.replace(/[\\$'"]/g, "\\$&");
    try {
        const sql =
            "INSERT INTO `users` (`id`, `user_key`, `user_type`, `username`, `password`, `first_name`, `last_name`, `signin_status`, `auth_token`, `created`, `created_by`, `updated`, `updated_by`, `active_status`) VALUES (NULL, '" +
            user_key +
            "', '" +
            user_type +
            "', '" +
            username +
            "', '" +
            password +
            "', '" +
            first_name +
            "', '" +
            last_name +
            "', '" +
            signin_status +
            "', '" +
            auth_token +
            "', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP, '', '" +
            active_status +
            "')";

        const result = await pool.query(sql);
        if (result.affectedRows) {
            res.send({ status: true, statusCode: 1013 });
        } else {
            return res.send({
                status: false,
                statusCode: 1014,
                errorText: "Not authorized"
            });
        }
    } catch (error) {
        return res.status(200).send({
            status: false,
            statusCode: 1004,
            errorText: error
        });
    }
});
module.exports = router;
