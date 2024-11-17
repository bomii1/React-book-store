// 테스트
import React from "react";
import { render, screen } from "@testing-library/react";
import InputText from "./InputText";
import { BookStoreThemeProvider } from "../../context/ThemeContext";
import exp from "constants";

describe("InputText 컴포넌트 테스트", () => {
    it('렌더를 확인', () => {
        // 1. 렌더
        render(
            <BookStoreThemeProvider>
                <InputText placeholder="여기 입력"></InputText>
            </BookStoreThemeProvider>
        );

        // 2. 확인
        expect(screen.getByPlaceholderText('여기 입력')).toBeInTheDocument();
    });

    it('forwardRef 테스트', () => {
        const ref = React.createRef<HTMLInputElement>();

        render(
            <BookStoreThemeProvider>
                <InputText placeholder="여기 입력" ref={ref}></InputText>
            </BookStoreThemeProvider>
        );

        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    })
})