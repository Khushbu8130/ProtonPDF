const mongoose = require('mongoose');

const getConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ DB is connected");
  } catch (error) {
    console.error("❌ Failed to connect to DB:", error.message);
  }
};

module.exports = getConnection;
