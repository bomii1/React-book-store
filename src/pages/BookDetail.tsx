import { useParams } from "react-router"
import styled from "styled-components";
import { useBook } from "../hook/useBook";
import { getImgSrc } from "../utils/image";
import Title from "../components/common/Title";
import { BookDetail as IBookDetail } from "../models/book.models";
import { formatDate, formatNumber } from "../utils/format";
import { Link } from "react-router-dom";
import ElipsisBox from "../components/common/ElipsisBox";
import LikeButton from "../components/book/LikeButton";
import AddToCart from "../components/book/AddToCart";

const bookInfoList = [
    {
        label: "카테고리",
        key: "category_name",
        filter: (book: IBookDetail) =>
            <Link to={`/books?category_id=${book.category_id}`}>
                {book.category_name}
            </Link>
    },
    {
        label: "포멧",
        key: "form"
    },
    {
        label: "페이지",
        key: "pages"
    },
    {
        label: "ISBN",
        key: "isbn"
    },
    {
        label: "출간일",
        key: "pubDate",
        filter: (book: IBookDetail) => {
            return formatDate(book.pubDate);
        }
    },
    {
        label: "가격",
        key: "price",
        filter: (book: IBookDetail) => {
            return `${formatNumber(book.price)} 원`;
        }
    },
];

const BookDetail = () => {

  const { bookId } = useParams(); // :bookId 를 가져옴, : 로 정의된 params 가져오는 훅
  const { book, likeToggle } = useBook(bookId);

  // console.log(book);
  // 초기값이 null 인 이유는 book 의 초기값이 null 이기 때문에 제대로 fetch 하기 전에 null 이 먼저 찍힘


  if (!book) return null; // 얼리리턴 -> 아무것도 보여주지 않겠다.

  return (
    <BookDetailStyle>
      <header className="header">
        <div className="img">
            <img src={getImgSrc(book.img)} alt={book.title} />
        </div>
        <div className="info">
            <Title size='large' color="text">
                {book.title}
            </Title>
            {
                bookInfoList.map((item) => (
                    <dl key={item.label}>
                        <dt>{item.label}</dt>
                        <dd>
                            {
                                item.filter ? item.filter(book) :
                                book[item.key as keyof IBookDetail]
                            }
                        </dd>
                    </dl>
                ))
            }
            <p className="summary">
                {book.summary}
            </p>
            <div className="like">
                <LikeButton book={book} onClick={likeToggle}/>
            </div>
            <div className="add-cart">
                <AddToCart book={book}/>
            </div>
        </div>
      </header>
      <div className="content">
        <Title size="medium">상세설명</Title>
        <ElipsisBox linelimit={4}>
            {book.detail}
        </ElipsisBox>

        <Title size='medium'>목차</Title>
        <p className="index">
            {book.contents}
        </p>
      </div>
    </BookDetailStyle>
  )
};

const BookDetailStyle = styled.div`
    .header {
        display: flex;
        align-items: start;
        gap: 24px;
        padding: 0 0 24px 0;
    }

    .img {
        flex: 1;
        img {
            width: 100%;
            height: auto;
        }
    }

    .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12px;

        dl {
            display: flex;
            margin: 0;
            dt {
                width: 80px;
                color: ${({ theme }) => theme.color.secondary};
            }
            a {
                color: ${({ theme }) => theme.color.primary};
            }
        }
    }

    .content {
        // .detail {
        //     overflow: hidden;
        //     text-overflow: elipsis;
        //     display: -webkit-box;
        //     -webkit-line-clamp: 4;
        //     -webkit-box-orient: vertical;
        // }
    }

`;


/*
text-overflow: elipsis; -> 오버플로우가 생기면 ... 을 넣어서 말줄임 표시를 하겠다
-webkit-line-clamp: 4; -> 4줄까지 보여준다
*/
export default BookDetail
