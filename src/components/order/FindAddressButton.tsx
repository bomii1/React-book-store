import { useEffect } from 'react';
import Button from '../common/Button'

interface Props {
    onCompleted: (address: string) => void;
}

// 주소찾기 버튼이 form 과 form 사이에 들어가 있음 -> 버튼은 기본적으로 submit 타입을 가짐 
// -> 별도의 submit 을 지정하지 않아도 버튼을 정의하는 순간 -> 필드내용 가지고 제출해버림 -> 이럴 때는 버튼 타입을 지정해줘야함
// form 안에 주소찾기 기능을 작성할 때는 꼭 type='button' 을 명시해 줘야 함

const SCRIPT_URL = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

const FindAddressButton = ({onCompleted}: Props) => {

  // 스크립트 로드

  // 핸들러

  // 입력
  const handleOpen = () => {
    new window.daum.Postcode({
        oncomplete: (data: any) => {
            onCompleted(data.address as string);
        },
    }).open();
  };

  useEffect(() => {
    const script = document.createElement('script'); // <script></script>를 만들어줌
    script.src = SCRIPT_URL; // <script src='URL'></script>
    script.async = true;
    document.head.appendChild(script); // <head><script src='URL'></script></head>

    return () => {
        document.head.removeChild(script);
    };
  }, []);

  
  // 버튼 타입은 button 과 submit 이 있다

  return (
    <Button 
        type='button' 
        size='medium' 
        scheme='normal' 
        onClick={handleOpen}
    >
      주소 찾기
    </Button>
  )
}

export default FindAddressButton
