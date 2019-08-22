const express = require("express");
const pool = require("../../core/database");
const router = express.Router();

router.post("/unblock", async function(req, res, next) {
    const token = req.body.token;
    if (!token) {
        return res.status(200).send({
            status: false,
            statusCode: 1001,
            errorText: "Not authorized"
        });
    }
    const user_key = req.body.user_key;
    try {
        const sql =
            "UPDATE `users` SET `active_status` = '1' WHERE `users`.`user_key` = '" +
            user_key +
            "'";
        const result = await pool.query(sql);
        if (result) {
            const sql1 =
                "SELECT * FROM `users` WHERE users.auth_token <> '" +
                token +
                "' AND users.user_type <> '1'";
            const result1 = await pool.query(sql1);
            return res.send({
                status: true,
                statusCode: 1025,
                result: result1
            });
        } else {
            return res.send({
                status: false,
                statusCode: 1026,
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
