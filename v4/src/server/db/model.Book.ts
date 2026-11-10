import mongoose, { Schema } from 'mongoose';

const bookSchema = new Schema<IBook>(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
        },
        category: {
            type: String,
        },
        readAt: {
            type: [Date],
        },
        comment: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

const Book = mongoose.model<IBook>('Book', bookSchema);

export default Book;
