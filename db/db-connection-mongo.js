const mongoose = require("mongoose");

const getConnection = async () => {
  try {
    const URL = "mongodb://user_bd:nqzOTQIu84EqBCV3@ac-fvcraex-shard-00-00.efnomkq.mongodb.net:27017,ac-fvcraex-shard-00-01.efnomkq.mongodb.net:27017,ac-fvcraex-shard-00-02.efnomkq.mongodb.net:27017/?ssl=true&replicaSet=atlas-zwx3z8-shard-0&authSource=admin&retryWrites=true&w=majority";

    await mongoose.connect(URL);

    console.log("--> conexion exitosa");
  } catch (error) {
    console.log("error-->", error);
  }
};

module.exports = {
  getConnection,
};
