import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { ButtonScheme, ButtonSize } from '../../style/theme';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode;
    size: ButtonSize;
    scheme: ButtonScheme;
    disabled?: boolean;
    isLoading?: boolean; // 명령이 여러번 실행되지 않도록
}



const Button = ({children, size, scheme, onClick, disabled, isLoading, className, ...props}: Props) => {
  return (
    <ButtonStyle size={size} scheme={scheme} onClick={onClick} disabled={disabled} isLoading={isLoading} className={className} {...props}>
        {children}
    </ButtonStyle>
  )
}

const ButtonStyle = styled.button<Omit<Props, 'children'>>`
    font-size: ${({ theme, size }) => theme.button[size].fontSize};
    padding: ${({ theme, size }) => theme.button[size].padding};
    color: ${({ theme, scheme }) => theme.buttonScheme[scheme].color};
    background-color: ${({ theme, scheme }) => theme.buttonScheme[scheme].backgroundColor};
    border: 0;
    border-radius: ${({ theme }) => theme.borderRadius.default};
    opacity: ${({ disabled }) => disabled ? 0.5 : 1};
    pointer-events: ${({ disabled }) => disabled ? "none" : "auto"};
    cursor: ${({ disabled }) => disabled ? "none" : 'pointer'};
`;

export default Button;
