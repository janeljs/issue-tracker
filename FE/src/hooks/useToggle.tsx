import { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react';

interface CtrlModal {
  toggle: RefObject<HTMLDivElement>[];
  modal: RefObject<HTMLDivElement>;
}

interface toggleReturnType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function useToggle({ toggle, modal }: CtrlModal): toggleReturnType {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!toggle) return;
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;

    if (!toggle.length) return;

    for (const element of toggle) {
      if (element.current?.contains(target)) {
        setOpen((open) => !open);
        return;
      }
    }

    if (modal.current?.contains(target)) setOpen(true);
    else setOpen(false);
  };

  return { open, setOpen };
}
export default useToggle;
