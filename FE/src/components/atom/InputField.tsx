import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: ({ target }: { target: HTMLInputElement }) => void;
  [key: string]: any;
}

function InputField({ label, className, value = '', onChange, placeholder, ...props }: Props) {
  const [isFocus, setIsFocus] = useState(false);
  const handleOnFocus = () => setIsFocus(true);
  const handleOnBlur = () => setIsFocus(false);
  return (
    <InputFieldBlock isFocus={isFocus} className={className}>
      {label && <div>{label}</div>}
      <input
        type='text'
        value={value}
        onChange={onChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        placeholder={placeholder}
        {...props}
      />
    </InputFieldBlock>
  );
}
export default InputField;
interface StyleProps {
  isFocus: boolean;
}

const InputFieldBlock = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: ${({ isFocus, theme }) => (isFocus ? theme.color.white : theme.color.bgGrey)};
  border: 1px solid ${({ isFocus, theme }) => (isFocus ? theme.color.lineGrey : theme.color.bgGrey)};
  border-radius: 11px;
  box-shadow: ${({ isFocus }) => isFocus && '0px 4px 8px rgba(149, 157, 165, 0.2)'};
  & > div {
    width: 80px;
    font-size: ${({ theme }) => theme.size.sm}px;
  }
  & > input {
    background-color: ${({ isFocus, theme }) => (isFocus ? theme.color.white : theme.color.bgGrey)};
    border: 1px solid ${({ isFocus, theme }) => (isFocus ? theme.color.white : theme.color.bgGrey)};
    border-radius: 11px;
    width: 90%;
    color: ${({ theme }) => theme.color.fontGrey};
    &:focus {
      outline: none;
    }
  }
`;
