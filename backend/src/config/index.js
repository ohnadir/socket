const mongoose = require("mongoose");
const connectDb = async() => {
  try {
    await mongoose.connect("mongodb+srv://nadirhossain336:bgLbjuOcasCacIz9@cluster0.2zvd497.mongodb.net/?retryWrites=true&w=majority");
    console.log(`Server Running On ${mongoose.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDb;