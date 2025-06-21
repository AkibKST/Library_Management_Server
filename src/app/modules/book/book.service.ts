import { TBook } from "./book.interface";
import { Book } from "./book.model";

//create book into database
const createBookIntoDB = async (bookData: TBook) => {
  const result = await Book.create(bookData);

  return result;
};
//--------------------------------

//get all books from database
const getAllBooksFromDB = async (query: any) => {
  if (query?.filter) {
    const book = await Book.aggregate([
      {
        $match: {
          genre: query.filter,
        },
      },
      {
        $sort: {
          [query.sortBy]: query.sort === "asc" ? 1 : -1,
        },
      },
      {
        $limit: parseInt(query.limit) || 10,
      },
    ]);

    return book;
  } else {
    const book = await Book.find()
      .sort({ [query.sortBy]: query.sort === "asc" ? 1 : -1 })
      .limit(parseInt(query.limit) || 10);

    return book;
  }
};
//--------------------------------

//get single book by id from database
const getSingleBookByIdFromDB = async (id: string) => {
  const result = await Book.findById(id);
  console.log(result);

  return result;
};
//--------------------------------

export const BookServices = {
  createBookIntoDB,
  getAllBooksFromDB,
  getSingleBookByIdFromDB,
};
