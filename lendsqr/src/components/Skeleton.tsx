import style from "./skeleton.module.scss";

interface Props {
  variant?: "card" | "table-row" | "text" | "avatar";
  width?: string;
  height?: string;
}

export default function Skeleton({ variant = "text", width, height }: Props) {
  if (variant === "card") {
    return (
      <div className={style.card}>
        <div className={style.cardIcon}></div>
        <div className={style.cardContent}>
          <div className={style.skeletonText}></div>
          <div className={style.skeletonTitle}></div>
        </div>
      </div>
    );
  }

  if (variant === "table-row") {
    return (
      <tr className={style.tableRow}>
        <td><div className={style.skeletonCell}></div></td>
        <td><div className={style.skeletonCell}></div></td>
        <td><div className={style.skeletonCell}></div></td>
        <td><div className={style.skeletonCell}></div></td>
        <td><div className={style.skeletonCell}></div></td>
        <td><div className={style.skeletonCell}></div></td>
        <td><div className={style.skeletonCellSmall}></div></td>
      </tr>
    );
  }

  if (variant === "avatar") {
    return <div className={style.avatar}></div>;
  }

  return (
    <div
      className={style.skeletonText}
      style={{ width, height }}
    ></div>
  );
}
