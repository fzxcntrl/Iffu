import mongoose from 'mongoose';

const connectDB = async (retries = 5, delay = 5000) => {
  while (retries > 0) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        dbName: 'iffu', // Explicitly connecting to the 'iffu' database
      });
      console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
      return; 
    } catch (error) {
      console.error(`❌ MongoDB Connection Error: ${error.message}`);
      retries -= 1;
      
      if (retries === 0) {
        console.error('All retries exhausted. Exiting application...');
        process.exit(1); 
      }
      
      console.log(`Retrying connection in ${delay / 1000} seconds... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

export default connectDB;
