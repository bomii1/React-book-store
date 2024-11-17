import styled from "styled-components";
import React, { ForwardedRef } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{
    placeholder?: string;
    inputType?: "text" | "email" | "password" | "number";
}

const InputText = React.forwardRef(({placeholder, inputType, onChange, ...props}: Props, ref: ForwardedRef<HTMLInputElement>) => {
    return (
        <InputTextStyled placeholder={placeholder} ref={ref} type={inputType} {...props} onChange={onChange} />
    );
})

export const InputTextStyled = styled.input`
    padding: 0.25rem 0.75rem;
    margin: 4px 0;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    font-size: 1rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.color.text};
`;

export default InputText;

/*
export const InputTextStyled = styled.input.attrs({ type: input })`
    padding: 0.25rem 0.75rem;
    margin: 4px 0;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    font-size: 1rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.color.text};
`;
*/