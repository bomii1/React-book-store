import { useEffect, useState } from "react"
import { BookDetail } from "../models/book.models";
import { fetchBook } from "../api/books.api";

export const useBook = (bookId: string | undefined) => {
    const [book, setBook] = useState<BookDetail | null>(null);

    useEffect(() => {
        if (!bookId) return; // bookId 가 undefined 일 때는 fetch 안함

        fetchBook(bookId).then((book) => {
            setBook(book);
        })
    }, [bookId]);

    return { book };
}

// 궁금한 점1 -> 왜 일반 변수에 담지 않고 state 변수에 담는가? 
// useEffect 의 deps 는 state 변수만 지켜볼 수 있나?