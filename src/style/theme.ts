// thema provider 에서 테마를 가져다가 사용하게 되면 테마를 변경할 수 있음
// 테마 파일들도 파일로 관리하면 좋음
// 타입으로 관리하지 않으면 정해놓은 규칙에서 벗어나는 테마가 나올 수 잇기 때문
// 타입가드

export type ThemeName = "light" | "dark";
type ColorKey = "primary" | "background" | "secondary" | "third"; // 컬러가 계속해서 늘어날 수 있기 때문에 

interface Theme {
    name: ThemeName,
    color: {
        [key in ColorKey]: string;
        // Record<ColorKey, string>
    }
}


export const light: Theme = {
    name: 'light',
    color: {
        primary: 'brown',
        
        background: 'lightgray',
        secondary: 'blue',
        third: 'green'
    },
};

export const dark: Theme = {
    name: 'dark',
    color: {
        primary: 'coral',
        background: 'midnightblue',
        secondary: 'darkblue',
        third: 'darkgreen'
    },
};

// 테마를 얻어오도록
export const getTheme = (themeName: ThemeName): Theme => {
    switch (themeName) {
        case "light":
            return light;
        case "dark":
            return dark;
    }
}