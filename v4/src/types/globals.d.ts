interface IBook {
    title: string;
    author?: string;
    category?: string;
    readAt?: Date[];
    comment?: string;
}

interface ICategory {
    name: string;
    color: string;
    bg: string;
    darkColor: string;
    darkBg: string;
}

type BookDTO = IBook & {
    _id: Types.ObjectId;
} & {
    __v: number;
};

type CategoryDTO = ICategory & {
    _id: Types.ObjectId;
} & {
    __v: number;
};
