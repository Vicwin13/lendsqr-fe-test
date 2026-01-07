"use client";

import Image from "next/image";
import style from "./userCards.module.scss"

interface Props { 
    icon: string;
    label: string;
  value: string;
  variant?: "pink" | "purple" | "orange" | "red";
}

export default function UserCards({
    icon,
    label,
    value,
    variant
}: Props) {
  return (
    <div className={style.card}>
      <div className={` ${style.image} ${variant ? style[variant] : ""}`}>
      <Image src={icon} alt={label} width={24} height={24} />
      </div>
      <div>
        <p className={style.label}>{label}</p>
        <h3 className={style.value}>{value}</h3>
      </div>
    </div>
  )
}
