import Image from "next/image";
import Link from "next/link";
import { Span } from "next/dist/trace";
import style from "./sidebar.module.scss"
import { usePathname } from "next/navigation";

interface Props{
    label: string;
    href: string;
    icon: string;
    collapse: boolean;

}

export default function SidebarItem({
    label,
    href,
    icon,
    collapse
}: Props) {
    
    const pathname = usePathname();
    const isActive = pathname === href;

  return (
      <Link href={href} className={ ` ${style.each_item} ${isActive ? style.active: ""}` }>
          <Image
              src={icon}
              alt={"icon"}
              width={16}
              height={16}
          />
          {!collapse && <span>{label}</span> }
      </Link>
  )
}
