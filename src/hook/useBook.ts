import { useEffect, useState } from "react"
import { BookDetail } from "../models/book.models";
import { fetchBook, likeBook, unlikeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import useAlert from "./useAlert";
import { addCart } from "../api/carts.api";

export const useBook = (bookId: string | undefined) => {
    const [book, setBook] = useState<BookDetail | null>(null);

    const { isLoggedIn } = useAuthStore(); // 로그인 상태를 가져옴
    const { showAlert } = useAlert();
    const [cartAdded, setCartAdded] = useState(false); // 추가되었다는 창 뜨게하냐 마냐
    
    const likeToggle = () => {
        // 권한 확인
        
        if (!isLoggedIn) {
            showAlert('로그인이 필요합니다.');
            return; // 리턴하지 않으면 주르륵 내려가면서 프로세스를 그대로 진행
        }

        if (!book) return;

        if (book.liked) {
            // 라이크 상태 -> 언라이크
            unlikeBook(book.id).then(() => {
                setBook({...book, liked: false, likes: book.likes-1});
            })
        } else { 
            // 언라이크 상태 -> 라이크
            likeBook(book.id).then(() => {
                setBook({...book, liked: true, likes: book.likes+1}); // 낙관적 업데이트 방법, 일반적으로는 요청을 하고 리패치를 해서 전체 화면을 업뎃
            }) // 낙관적 업데이트를 하면 성공시 화면을 바로 업데이트, 좋아요는 상태적으로 마이너한 정보라 낙관적 업데이트를 많이 함
        }
    };

    const addToCart = (quantity: number) => {
        if (!book) return;
        
        addCart({book_id: book.id, quantity: quantity}).then(() => {
            // showAlert('장바구니에 추가되었습니다.');
            setCartAdded(true);
    
            setTimeout(() => {
              setCartAdded(false);
            }, 3000);
        })
      };

    useEffect(() => {
        if (!bookId) return; // bookId 가 undefined 일 때는 fetch 안함

        fetchBook(bookId).then((book) => {
            setBook(book);
        })
    }, [bookId]);

    return { book, likeToggle, addToCart, cartAdded };
}

// 궁금한 점1 -> 왜 일반 변수에 담지 않고 state 변수에 담는가? 
// useEffect 의 deps 는 state 변수만 지켜볼 수 있나?