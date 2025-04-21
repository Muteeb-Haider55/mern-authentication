import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // console.log(process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connection to mongoDB ", error.message);
    process.exit(1); //1 status code for failure and 0 status code for success
  }
};
