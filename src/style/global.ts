import { createGlobalStyle } from "styled-components";
// import "sanitize.css";
import { ThemeName } from "./theme";


interface Props {
    themeName: ThemeName // 타입가드
}

export const GlobalStyle = createGlobalStyle<Props>`
    body {
        padding: 0;
        maring: 0;
        background-color: ${(props) => props.themeName === 'light' ? 'white' : 'black'}
    }

    h1 {
        margin: 0;
    }

    * {
        color: ${(props) => props.themeName === 'light' ? 'black' : 'pink'};
    }
`;

// 글로벌 스타일은 테마에 따라 적용되어야 한다