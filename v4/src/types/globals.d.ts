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
