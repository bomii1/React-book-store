import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext';

// interface Props {
//     themeName: ThemeName; // 타입 좁혀주기
//     setThemeName: (themeName: ThemeName) => void;
// }

// 테마 스위처는 스스로 상태를 가지는 것이 아니라 useContext 에 의존해서 상태를 바꾸는 애 

const ThemeSwitcher = () => {
    const { themeName, toggleTheme } = useContext(ThemeContext);

    // const toggleThemeName = () => {
    //     setThemeName(themeName === 'light' ? themeName = 'dark' : themeName = 'light');
    // }

    // 이벤트 타입 호환 왜 안돼? {toggleTheme}
    return (
        <div>
            <button onClick={toggleTheme}>{themeName}</button>
        </div>
  )
}

export default ThemeSwitcher
