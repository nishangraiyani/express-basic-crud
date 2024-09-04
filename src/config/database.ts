import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL is not defined in the environment variables."
      );
    }

    await mongoose.connect(process.env.DATABASE_URL, {});

    console.log("Connected to Database Successfully...");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};
