import 'server-only';
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI as string;

if (!uri) {
    throw new Error('MONGODB_URI가 설정되지 않았습니다.');
}

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
    }
};

export default connectDB;
