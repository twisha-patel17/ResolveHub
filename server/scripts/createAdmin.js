import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../src/models/User.model.js";
import connectDB from "../src/config/db.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error(
        "ADMIN_EMAIL and ADMIN_PASSWORD are required in .env"
      );
    }

    const existingAdmin = await User.findOne({
      email: adminEmail,
    });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists.");
      console.log(`Email: ${adminEmail}`);

      await mongoose.connection.close();
      process.exit(0);
    }

    const admin = await User.create({
      name: "ResolveHub Admin",
      email: adminEmail,
      password: adminPassword,
      role: "admin",
      isActive: true,
    });

    console.log("✅ Admin created successfully");
    console.log("--------------------------------");
    console.log(`Name: ${admin.name}`);
    console.log(`Email: ${admin.email}`);
    console.log(`Role: ${admin.role}`);
    console.log("--------------------------------");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to create admin:", error);

    await mongoose.connection.close();
    process.exit(1);
  }
};

createAdmin();