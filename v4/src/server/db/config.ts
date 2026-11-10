import 'server-only';
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI as string;

if (!uri) {
    throw new Error('MONGODB_URI가 설정되지 않았습니다.');
}

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongooseCache: MongooseCache | undefined;
}

const cached = (globalThis.mongooseCache ??= {
    conn: null,
    promise: null,
});

const connectDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(uri, {
            bufferCommands: false,
        });
    }

    try {
        // await mongoose.connect(uri);
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        console.error('MongoDB Connection Error:', error);
        throw error;
    }
};

export default connectDB;
