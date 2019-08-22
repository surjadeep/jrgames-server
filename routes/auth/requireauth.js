const express = require("express");
const pool = require("../../core/database");
const router = express.Router();
router.post("/requireauth", async function(req, res, next) {
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
            "SELECT id FROM users WHERE auth_token = '" +
            token +
            "' AND signin_status = '1'";
        const result = await pool.query(sql);
        if (result.length) {
            res.send({ status: true, statusCode: 1003, token: token });
        } else {
            return res.send({
                status: false,
                statusCode: 1002,
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
