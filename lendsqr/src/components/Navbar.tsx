"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { getUser } from "@/lib/auth";
import style from "./navbar.module.scss"

export default function Navbar() {
  const [name, setName] = useState<string>("");


  useEffect(() => {
    const user = getUser();
    if (user && user?.fullname) {
      const firstname = user.fullname.trim().split(" ")[0];
      setName(firstname);
    }
  },[])
  return (
    <nav className={style.navbar}>

      <div>
        <Image
          src={"/Group.svg"}
          alt={"Logo"}
          width={140}
          height={30}
        />
      </div>
      <div className={style.search}>
        <input type="text" placeholder="Search for anything" />
        <div className={style.search_icon}>
          <Image src={"/Vector.svg"}
            alt={"search icon"}
            width={14}
            height={14}
          />
        </div>
      </div>
      <div className={style.last_nav_items}>
        <Link href={"#"}> Docs</Link>

        <Image src={"/np_notification.svg"} 
          alt={"notification icons"}
          width={26}
          height={26}
        />

        <div className={style.profile}>
          <div className={style.avatar}>
            <Image
              src={"/image.svg"}
              alt={"avartar"}
              width={30}
              height={30}
              className={style.avatar_image}
            />
          </div>
              {name && <span >{name}</span>}

        </div>
      </div>

    </nav>
  )
}
