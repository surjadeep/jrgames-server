const express = require("express");
const pool = require("../../core/database");
const utility = require("../../core/utility");
const router = express.Router();

router.post("/changepassword", async function(req, res, next) {
    const token = req.body.token;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    oldPassword = oldPassword.replace(/[\\$'"]/g, "\\$&");
    newPassword = newPassword.replace(/[\\$'"]/g, "\\$&");
    if (!token) {
        return res.send({
            status: false,
            statusCode: 1001,
            errorText: "Not authorized"
        });
    }
    try {
        const sql1 =
            "SELECT user_key FROM users WHERE auth_token = '" +
            token +
            "' AND password = '" +
            oldPassword +
            "'";
        const result1 = await pool.query(sql1);
        if (!result1.length) {
            return res.send({
                status: false,
                statusCode: 1010,
                errorText: "Current password not correct!"
            });
        } else {
            const sql =
                "UPDATE `users` SET `password` = '" +
                newPassword +
                "' WHERE `auth_token` = '" +
                token +
                "'";
            const result = await pool.query(sql);
            if (result.affectedRows) {
                res.send({ status: true, statusCode: 1011 });
            } else {
                return res.send({
                    status: false,
                    statusCode: 1012,
                    errorText: "Not authorized"
                });
            }
        }
    } catch (error) {
        return res.send({
            status: false,
            statusCode: 1004,
            errorText: error
        });
    }
});
module.exports = router;
