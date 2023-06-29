
require("dotenv").config();
const cors = require("cors");

const port = process.env.mongoURL
const mongoose  = require('mongoose');
const { connection } = mongoose.connect(port);
mongoose.set('strictQuery', false);


app.use(
    cors({
        origin: "*",
        credentials: true,
        optionsSuccessStatus: 200
    })
)


module.exports = { connection }





