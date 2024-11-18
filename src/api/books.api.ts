import { Pagination } from "../models/pagination.models";
import { Book, BookDetail } from "../models/book.models";
import { httpClient } from "./http";

interface FetchBooksParams {
    category_id?: number;
    news?: boolean;
    currentPage?: number;
    limit: number;
}

interface FetchBooksResponse {
    books: Book[];
    pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
    try {
        const response = await httpClient.get<FetchBooksResponse>('/books', {
            params: params, // 알아서 붙여줌
        });
        return response.data;
    } catch (error) {
        return {
            books: [],
            pagination: {
                totalCount: 0,
                currentPage: 1,
            },
        };
    }
};

export const fetchBook = async (bookId: string) => {
    const response = await httpClient.get<BookDetail>(`/books/${bookId}`);
    // console.log('fetch book', response.data);
    return response.data;
}