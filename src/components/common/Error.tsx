import React from 'react'
import { useRouteError } from 'react-router';

interface RouteError {
    statusText?: string;
    message?: string;
}

const Error = () => {

  const error = useRouteError() as RouteError;

  return (
    <div>
      <h1>오류가 발생했습니다.</h1>
      <p>다음과 같은 오류가 발생했습니다.</p>
      <p>{error.statusText || error.message}</p>
    </div>
  )
}

export default Error

// 에러페이지는 리액트라우트 돔에서 준비한 에러 엘리먼트를 받도록 되어있음