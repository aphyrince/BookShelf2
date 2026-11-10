import 'server-only';
import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema<ICategory>(
    {
        name: { type: String, required: true, unique: true },
        color: { type: String, required: true },
        bg: { type: String, required: true },
        darkColor: { type: String, required: true },
        darkBg: { type: String, required: true },
    },
    { timestamps: true },
);

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
