const express = require("express");
const pool = require("../../core/database");
const router = express.Router();

router.post("/signout", async function(req, res, next) {
    const token = req.body.token;
    if (!token) {
        return res.send({
            status: false,
            statusCode: 1001,
            errorText: "Not authorized"
        });
    }
    try {
        const sql =
            "UPDATE `users` SET `signin_status` = '0', `auth_token` = '' WHERE `auth_token` = '" +
            token +
            "'";
        const result = await pool.query(sql);
        if (result.affectedRows) {
            res.send({ status: true, statusCode: 1008 });
        } else {
            return res.send({
                status: false,
                statusCode: 1009,
                errorText: "Not authorized"
            });
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
