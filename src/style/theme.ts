// thema provider 에서 테마를 가져다가 사용하게 되면 테마를 변경할 수 있음
// 테마 파일들도 파일로 관리하면 좋음
// 타입으로 관리하지 않으면 정해놓은 규칙에서 벗어나는 테마가 나올 수 잇기 때문
// 타입가드

export type ThemeName = "light" | "dark";
export type ColorKey = "primary" | "background" | "secondary" | "third" | "border" | "text"; // 컬러가 계속해서 늘어날 수 있기 때문에 
export type HeadingSize = "large" | "medium" | "small";
export  type ButtonSize = "large" | "medium" | "small";
export type ButtonScheme = "primary" | "normal"; // primary 확인, normal 취소
export type LayoutWidth = "large" | "medium" | "small";

interface Theme {
    name: ThemeName;
    color: Record<ColorKey, string>;
        // [key in ColorKey]: string;
    heading: {
        [key in HeadingSize]: {
            fontSize: string;
        }
    },
    button: {
        [key in ButtonSize]: {
            fontSize: string;
            padding: string;
        }
    },
    buttonScheme: {
        [key in ButtonScheme]: {
            color: string;
            backgroundColor: string;
        }
    },
    borderRadius: {
        default: string;
    },
    layout: {
        width: {
            [key in LayoutWidth]: string;
        }
    }
    
}


export const light: Theme = {
    name: 'light',
    color: {
        primary: '#ff5800',
        
        background: 'lightgray',
        secondary: '#5F5F5F',
        third: 'green',
        border: 'gray',
        text: 'black'
    },
    heading: {
        large: {
            fontSize: "2rem"
        },
        medium: {
            fontSize: "1.5rem"
        },
        small: {
            fontSize: "1rem"
        }
    },
    button: {
        large: {
            fontSize: "1.5rem",
            padding: "1rem 2rem"
        },
        medium: {
            fontSize: "1rem",
            padding: "0.5rem 1rem"
        },
        small: {
            fontSize: "0.75rem",
            padding: "0.25rem 0.5rem"
        }
    },
    buttonScheme: {
        primary: {
            color: "white",
            backgroundColor: "midnightblue"
        },
        normal: {
            color: "black",
            backgroundColor: "lightgray"
        }
    },
    borderRadius: {
        default: '4px'
    },
    layout: {
        width: {
            large: '1020px',
            medium: '760px',
            small: '320px'
        }
    }
};

export const dark: Theme = {
    ...light, // light 테마 내용 가져오고 name, color 만 오버라이드함
    name: 'dark',
    color: {
        primary: 'coral',
        background: 'midnightblue',
        secondary: 'darkblue',
        third: 'darkgreen',
        border: 'gray',
        text: 'black'

    },
};

// 테마를 얻어오도록
export const getTheme = (themeName: ThemeName): Theme => {
    switch (themeName) {
        case "light":
            return light; // 테마객체
        case "dark":
            return dark;
    }
}