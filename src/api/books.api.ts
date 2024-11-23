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

// string 처리 이유: 라우트에서 상태를 받아와서 string 으로 들어옴
export const fetchBook = async (bookId: string) => {
    const response = await httpClient.get<BookDetail>(`/books/${bookId}`);
    // console.log('fetch book', response.data);
    return response.data;
};

// 라우트를 통한 요청이 아니라서 number
export const likeBook = async (bookId: number) => {
    // 사용자 정보는 토큰에 들어있기 때문에 토큰에서 user id 를 뽑을 것
    // userid 와 bookid 를 db에 기록하는 형태로 동작할 것
    const response = await httpClient.post(`/likes/${bookId}`);
    return response.data;
};

export const unlikeBook = async (bookId: number) => {
    const response = await httpClient.delete(`/likes/${bookId}`);
    return response.data;
}