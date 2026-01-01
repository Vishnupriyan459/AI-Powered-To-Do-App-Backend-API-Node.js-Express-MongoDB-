import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB_NAME || "todoapp",
    });

    console.log("MongoDB Connected ✔");

    // Check existing collections
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    console.log("Collections:", collectionNames);

    console.log("Todoapp DB Ready");
  } catch (err) {
    console.error("Mongo Error ❌:", err.message);
    process.exit(1);
  }
};

export default connectDB;
