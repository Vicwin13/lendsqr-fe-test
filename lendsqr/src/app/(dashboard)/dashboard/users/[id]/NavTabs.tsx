"use client";

import Link from "next/link";
import style from "./layout.module.scss";
import { usePathname } from "next/navigation";

interface NavTabsProps {
    id: string;
}

export default function NavTabs({ id }: NavTabsProps) {
    const pathname = usePathname();
    
    return (
        <nav className={style.navTabs}>
            <Link 
                className={`${style.link} ${pathname === `/dashboard/users/${id}` ? style.active : ''}`} 
                href={`/dashboard/users/${id}`}
            >General Details</Link>
            <Link 
                className={`${style.link} ${pathname === `/dashboard/users/${id}/documents` ? style.active : ''}`} 
                href={`/dashboard/users/${id}/documents`}
            >Documents</Link>
            <Link 
                className={`${style.link} ${pathname === `/dashboard/users/${id}/bank-details` ? style.active : ''}`} 
                href={`/dashboard/users/${id}/bank-details`}
            >Bank Details</Link>
            <Link 
                className={`${style.link} ${pathname === `/dashboard/users/${id}/loans` ? style.active : ''}`} 
                href={`/dashboard/users/${id}/loans`}
            >Loans</Link>
            <Link 
                className={`${style.link} ${pathname === `/dashboard/users/${id}/savings` ? style.active : ''}`} 
                href={`/dashboard/users/${id}/savings`}
            >Savings</Link>
            <Link 
                className={`${style.link} ${pathname === `/dashboard/users/${id}/app-system` ? style.active : ''}`} 
                href={`/dashboard/users/${id}/app-system`}
            >App and System</Link>
        </nav>
    );
}
