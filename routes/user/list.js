const express = require("express");
const pool = require("../../core/database");
const router = express.Router();

router.post("/list", async function(req, res, next) {
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
            "SELECT * FROM `users` WHERE users.auth_token <> '" +
            token +
            "' AND users.user_type <> '1'";
        const result = await pool.query(sql);
        if (result.length) {
            return res.send({ status: true, statusCode: 1015, result: result });
        } else {
            return res.send({
                status: false,
                statusCode: 1016,
                errorText: ""
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
