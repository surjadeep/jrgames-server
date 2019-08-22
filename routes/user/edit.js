const express = require("express");
const pool = require("../../core/database");
const router = express.Router();

router.post("/edit", async function(req, res, next) {
    const token = req.body.token;
    if (!token) {
        return res.status(200).send({
            status: false,
            statusCode: 1001,
            errorText: "Not authorized"
        });
    }
    const user_key = req.body.user_key;
    const user_type = req.body.usertype;
    let first_name = req.body.firstname;
    let last_name = req.body.lastname;
    first_name = first_name.replace(/[\\$'"]/g, "\\$&");
    last_name = last_name.replace(/[\\$'"]/g, "\\$&");
    try {
        const sql =
            "UPDATE `users` SET `user_type` = '" +
            user_type +
            "', `first_name` = '" +
            first_name +
            "', `last_name` = '" +
            last_name +
            "' WHERE `users`.`user_key` = '" +
            user_key +
            "'";
        const result = await pool.query(sql);
        if (result) {
            res.send({ status: true, statusCode: 1019 });
        } else {
            return res.send({
                status: false,
                statusCode: 1020,
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
