const express = require("express");
const pool = require("../../core/database");
const router = express.Router();

router.post("/one", async function(req, res, next) {
    const token = req.body.token;
    const key = req.body.key;
    if (!token) {
        return res.send({
            status: false,
            statusCode: 1001,
            errorText: "Not authorized"
        });
    }
    try {
        const sql =
            "SELECT * FROM `users` WHERE users.user_key = '" + key + "'";
        const result = await pool.query(sql);
        if (result.length) {
            return res.send({ status: true, statusCode: 1017, result: result });
        } else {
            return res.send({
                status: false,
                statusCode: 1018,
                errorText: "User not found"
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
