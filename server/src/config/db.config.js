const mongoose = require('mongoose');
const logger = require('../logger/api.logger');

const connect = () => {

    // const url = process.env.ATLAS_URI;
    const url = "mongodb+srv://admin:admin123@cluster0.wafnaph.mongodb.net/sri_sai_cold_storage?retryWrites=true&w=majority";

    mongoose.connect(url, {
        useNewUrlParser: true,
        // useFindAndModify: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
    })

    mongoose.connection.once("open", async () => {
        logger.info("Connected to database");
    });
      
    mongoose.connection.on("error", (err) => {
        logger.error("Error connecting to database  ", err);
    });
}

const disconnect = () => {
    
    if (!mongoose.connection) {
      return;
    }
    
    mongoose.disconnect();

    mongoose.once("close", async () => {
        console.log("Diconnected  to database");
    });

};

module.exports = {
    connect,
    disconnect
}