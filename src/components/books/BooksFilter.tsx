import styled from 'styled-components';
import { useCategory } from '../../hook/useCategory';
import Button from '../common/Button';
import { useSearchParams } from 'react-router-dom';
import { QUERYSTRING } from '../../contants/querystring';

// 쿼리 스트링을 사용하면 좋은 점 -> 상태공유, 재사용성

const BooksFilter = () => {

  const { category } = useCategory();
  const [ searchParams, setSearchParams ] = useSearchParams();

  const handleCategory = (id: number | null) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (id === null) { // 전체를 클릭했을 경우
      newSearchParams.delete(QUERYSTRING.CATEGORY_ID); // 뒤에 파라미터 제거
    } else {
      newSearchParams.set(QUERYSTRING.CATEGORY_ID, id.toString());
    }
    setSearchParams(newSearchParams); // 실제적인 업데이트
  }

  const handleNews = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newSearchParams.get(QUERYSTRING.NEWS)) {
      newSearchParams.delete(QUERYSTRING.NEWS);
    } else {
      newSearchParams.set(QUERYSTRING.NEWS, 'true');
    }

    setSearchParams(newSearchParams);
  }

  return (
    <BooksFilterStyle>
      <div className='category'>
        {
          category.map((item) => (
            <Button 
              size='medium' 
              scheme={item.isActive ? 'primary' : 'normal'}
              key={item.category_id}
              onClick={() => handleCategory(item.category_id)}
            >
              {item.category_name}
            </Button>
          ))
        }
      </div>
      <div className="new">
        <Button 
          size='medium' 
          scheme={searchParams.get(QUERYSTRING.NEWS) ? 'primary' : 'normal'}
          onClick={handleNews}
        >
          신간
        </Button>
      </div>
    </BooksFilterStyle>
  )
};

const BooksFilterStyle = styled.div`
  display: flex;
  gap: 24px;

  .category {
    display: flex;
    gap: 8px;
  }
`;

export default BooksFilter
