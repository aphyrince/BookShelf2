import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
    }
};

export default connectDB;
