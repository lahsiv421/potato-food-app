const mongoose = require('mongoose');
const username = encodeURIComponent("0214vishal");
const password = encodeURIComponent("Lucky@123");
const mongoURI = `mongodb+srv://${username}:${password}@cluster0.8dxkkp7.mongodb.net/potato?retryWrites=true&w=majority`;

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log("Connected successfully");

    const fetchedData = await mongoose.connection.db.collection("foodItem").find({}).toArray();
    const catData = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
    


    global.foodItem = fetchedData;
    global.foodCategory = catData;
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoDB;
