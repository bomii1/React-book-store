import React, { ReactNode, useState } from 'react'
import styled from 'styled-components';
import Button from './Button';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

interface Props {
    children: ReactNode;
    linelimit: number;
}

const ElipsisBox = ({ children, linelimit }: Props) => {

  const [expanded, setExpanded] = useState(false); // 처음엔 확장되지 않음

  return (
    <ElipsisBoxStyle linelimit={linelimit} $expanded={expanded}>
      <p>{children}</p>
      <div className="toggle">
        <Button size='small' scheme='normal' onClick={() => {setExpanded(!expanded)}}>
            {expanded ? '접기' : '펼치기'} { expanded ? <FaAngleUp /> : <FaAngleDown /> }
        </Button>
      </div>
    </ElipsisBoxStyle>
  )
};

interface ElipsisBoxStyleProps {
    linelimit: number;
    $expanded: boolean; // 스타일드 컴포넌트에 불린을 전달하지 말라
};

// 사실 엘립시스 박스는 div 임, div 는 어트리뷰트를 스트링만 받을 수 있음
// 스타일드 컴포넌트와 일반적인 div 를 구분할 수 없기 때문에 생기는 이슈
// 이럴 땐 앞에 $ 붙여주기 -> 문제 해결 -> 왜..?

const ElipsisBoxStyle = styled.div<ElipsisBoxStyleProps>`
    p {
        overflow: hidden;
        text-overflow: elipsis;
        display: -webkit-box;
        -webkit-line-clamp: ${({ linelimit, $expanded }) => 
            ($expanded ? 'none' : linelimit)};
        -webkit-box-orient: vertical;
        padding: 20px 0 0 0;
        margin: 0;
    }

    .toggle {
        display: flex;
        justify-content: right;
        // svg {
        //     transform: ${({ $expanded }) => ($expanded ? 'rotate(180deg)' : 'rotate(0deg)')};
        // }
    }
`;

export default ElipsisBox
