const jwt = require("jwt-simple");
const config = require("./config");

module.exports = {
    encrypt: function(text) {
        return jwt.encode(
            {
                sub: text
            },
            config.SECRET
        );
    },
    generateRandomInteger: function() {
        return Math.floor(Math.random() * 1000000000000000000) + 1;
    },
    generateRandomString: function() {
        return (
            Math.random()
                .toString(36)
                .substring(2, 15) +
            Math.random()
                .toString(36)
                .substring(2, 15)
        );
    },
    tokenForUser: function() {
        const timestamp = new Date().getTime();
        return jwt.encode(
            {
                sub: this.generateRandomInteger(),
                name: this.generateRandomString(),
                iat: timestamp
            },
            this.generateRandomString()
        );
    }
};
