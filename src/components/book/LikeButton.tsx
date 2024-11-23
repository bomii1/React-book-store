import styled from "styled-components"
import { BookDetail } from "../../models/book.models";
import Button from "../common/Button";
import { FaHeart } from "react-icons/fa";

interface Props {
    book: BookDetail;
    onClick: () => void;
}

const LikeButton = ({book, onClick}: Props) => {
  return (
    <LikeButtonStyle 
        size="medium" 
        scheme={book.liked ? 'like' : "normal"}
        onClick={onClick}
    >
        <FaHeart />
        {book.likes}
    </LikeButtonStyle>
  )
};

const LikeButtonStyle = styled(Button)` // Button 에 직접 스타일링할 때
    display: flex;
    gap: 6px;
    
    svg {
        color: inherit;
        * {
            color: inherit;
        }
    }
`;

export default LikeButton
