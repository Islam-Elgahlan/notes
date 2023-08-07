const mongoose = require("mongoose");
const connection = () => {
    return mongoose
    .connect(process.env.connection_string_deploy)
    .then((result) => console.log("db connected"))
    .catch((error) => console.log(error , " db not connected"))
}

module.exports = connection;