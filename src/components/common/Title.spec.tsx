// 테스트
import { render, screen } from "@testing-library/react";
import Title from "./Title";
import { BookStoreThemeProvider } from "../../context/ThemeContext";

describe("Title 컴포넌트 테스트", () => {
    it('렌더를 확인', () => {
        // 1. 렌더
        render(
            <BookStoreThemeProvider>
                <Title size="large">제목</Title>
            </BookStoreThemeProvider>
        );

        // 2. 확인
        expect(screen.getByText('제목')).toBeInTheDocument();
    });

    it('size props 적용', () => {
        const { container } = render(
            <BookStoreThemeProvider>
                <Title size="large">제목</Title>
            </BookStoreThemeProvider>
        );
        expect(container?.firstChild).toHaveStyle({ fontSize: "2rem" });
    });

    it('color props 적용', () => {
        const { container } = render(
            <BookStoreThemeProvider>
                <Title size="large" color="secondary">제목</Title>
            </BookStoreThemeProvider>
        );
        expect(container?.firstChild).toHaveStyle({ color: 'blue' })
    })
    // 화면상에 '제목' 이라는 텍스트를 가진 element 를 가져옴 -> tobe~~ 화면상에 있나 확인
    // 렌더해서 셀렉트된 도큐먼트가 화면상에 있는지!
})