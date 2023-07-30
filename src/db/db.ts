import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!)

    const connection = mongoose.connection; // capture a connection object from mongoose

    // listen to events brought or fired by the connection
    connection.on('connected', () => {
      console.log("MongoDB Connected Successlly")
    })

    connection.on('error', (err) => {
      console.log("Error on DB connection: ", err);
      process.exit(); // exit the process
    })
  } catch (error) {
    // catch the error
    console.log("Error: ", error);
  }
} 