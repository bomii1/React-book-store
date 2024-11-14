import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { ThemeName } from '../style/theme';
import { ThemeProvider } from 'styled-components';
import { getTheme } from '../style/theme';
import { GlobalStyle } from '../style/global';

const DEFAULT_THEME_NAME = 'light'; // 디폴트 테마 키
const THEME_LOCAL_STORAGE_KEY = 'book_store_theme'; // 로컬 스토리지에 테마이름을 저장할 때 사용할 키

interface State {
    themeName: ThemeName,
    toggleTheme: () => void;
}

// 초기 상태 설정 및 컨텍스트 생성 -> 테마 컨텍스트에서 사용할 객체 형태를 정의
export const state: State = {
    themeName: DEFAULT_THEME_NAME, // 디폴트값
    toggleTheme: () => {}
};

// ThemeProvider 를 통해 이 컨텍스트를 하위 컴포넌트에서 사용할 수 있게 함
export const ThemeContext = createContext<State>(state);

// children 을 props 로 받아 모든 하위 컴포넌트가 테마를 사용할 수 있도록 설정
export const BookStoreThemeProvider = ({children}: {children: ReactNode}) => {

    const [themeName, setThemeName] = useState<ThemeName>(DEFAULT_THEME_NAME);
    const toggleTheme = () => { // 테마변경함수
        setThemeName(themeName === 'light' ? 'dark' : 'light');
        localStorage.setItem(THEME_LOCAL_STORAGE_KEY, themeName === 'light' ? 'dark' : 'light');
    };

    // localstorage 에 초기값이 있다면 받아오고 없다면 디폴트 테마 적용
    useEffect(() => {
        const savedThemeName = localStorage.getItem(THEME_LOCAL_STORAGE_KEY) as ThemeName;
        setThemeName(savedThemeName || DEFAULT_THEME_NAME);
    }, []); // 초기화하는 부분

    return (
        <ThemeContext.Provider value={{themeName, toggleTheme}}>
            <ThemeProvider theme={getTheme(themeName)}>
                <GlobalStyle themeName={themeName} />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

// context 는 리액트에서 제공하는 중요한 API 중 하나
// createContext 를 이용해서 context 를 만듦 (context 는 wrapper 라고 생각하면 됨)
// provider 하위 컴포넌트들이 이를 구독하고 언제든지 꺼내 쓸 수 있음
// useContext 라는 훅을 이용해서 꺼내어서 쓸 수 있음, 훅에 만든 객체 넣고 꺼내어 씀
// 꺼내어서 쓸 때 기본적으로 제공하는 state 는 사용자가 직접 커스텀할 수 있음
// 테마 프로바이더를 커스텀해서 사용함