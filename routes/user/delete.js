const express = require("express");
const pool = require("../../core/database");
const router = express.Router();

router.post("/delete", async function(req, res, next) {
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
            "DELETE FROM `users` WHERE `users`.`user_key` = '" + user_key + "'";
        const result = await pool.query(sql);
        if (result.affectedRows) {
            const sql1 =
                "SELECT * FROM `users` WHERE users.auth_token <> '" +
                token +
                "' AND users.user_type <> '1'";
            const result1 = await pool.query(sql1);
            return res.send({
                status: true,
                statusCode: 1021,
                result: result1
            });
        } else {
            return res.send({
                status: false,
                statusCode: 1022,
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
