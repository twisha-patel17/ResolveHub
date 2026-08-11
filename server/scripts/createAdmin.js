import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../src/models/User.model.js";
import connectDB from "../src/config/db.js";

dotenv.config();

const createAdmin = async () => {
    try {
        await connectDB();

        const adminEmail = "admin@resolvehub.com";

        const existingAdmin = await User.findOne({
            email: adminEmail,
        });

        if (existingAdmin) {
            console.log("⚠️ Admin already exists.");

            await mongoose.connection.close();
            process.exit(0);
        }

        const admin = await User.create({
            name: "ResolveHub Admin",
            email: adminEmail,
            password: "Admin@123456",
            role: "admin",
            isActive: true,
        });

        console.log("✅ Admin created successfully");
        console.log("--------------------------------");
        console.log(`Name: ${admin.name}`);
        console.log(`Email: ${admin.email}`);
        console.log("Password: Admin@123456");
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