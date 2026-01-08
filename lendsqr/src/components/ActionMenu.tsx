import { useEffect, useRef } from "react";

import Image from "next/image";
import style from "./ActionMenu.module.scss";

export type MenuItem = {
  text: string;
  icon: string;
  onClick?: () => void;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  position: { top: number; left: number };
  items: MenuItem[];
};

export default function ActionMenu({
  isOpen,
  onClose,
  position,
  items,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className={style.menu}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={style.menuItem}
          onClick={() => {
            item.onClick?.();
            onClose();
          }}
        >
          <Image src={item.icon} alt={item.text} width={16} height={16} />
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}
