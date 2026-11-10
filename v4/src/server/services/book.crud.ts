import Book from '../db/model.Book';

export async function getBooks() {
    return await Book.find().lean();
}

export async function getBookById(id: string) {
    return await Book.findById(id).lean();
}

export async function createBook(newBook: IBook) {
    const book = new Book(newBook);

    return await book.save();
}

export async function updateBook(bookDTO: BookDTO) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, __v, ...updatedBookData } = bookDTO;

    return await Book.findByIdAndUpdate(bookDTO._id, updatedBookData, {
        new: true,
        runValidators: true,
    });
}

export async function deleteBook(bookDTO: BookDTO) {
    return await Book.findByIdAndDelete(bookDTO._id);
}
