const mongoose = require("mongoose");

const conn = async () => {
    try {
        await mongoose.connect(process.env.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "bookstore"  // 🔥 FORCE this!
        });

        console.log("✅ Connected to MongoDB:", mongoose.connection.name);
    } catch (err) {
        console.log("❌ MongoDB connection error:", err);
    }
};

conn();
