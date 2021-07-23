import { useState } from 'react';

export default function useInput(defaultValue: string = '') {
  const [value, setValue] = useState(defaultValue);
  const onChange = ({ target }: { target: HTMLInputElement }) => setValue(target.value);

  return { value, setValue, onChange };
}
