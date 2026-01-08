"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { getUser } from "@/lib/auth";
import style from "./navbar.module.scss"
import { useSearch } from "@/lib/SearchContext";

export default function Navbar() {
  const [name, setName] = useState<string>("");
  const { searchQuery, setSearchQuery } = useSearch();


  useEffect(() => {
    const user = getUser();
    if (user && user?.fullname) {
      const firstname = user.fullname.trim().split(" ")[0];
      setName(firstname);
    }
  },[])
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };
  
  return (
    <nav className={style.navbar}>

      <div className={style.logo}>
        <Image
          src={"/Group.svg"}
          alt={"Logo"}
          width={140}
          height={30}
        />
      </div>
      <div className={style.search}>
        <input
          type="text"
          placeholder="Search for anything"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {/* {searchQuery && (
          <button
            className={style.clear_search}
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )} */}
        <div className={style.search_icon}>
          <Image src={"/Vector.svg"}
            alt={"search icon"}
            width={14}
            height={14}
          />
        </div>
      </div>
      <div className={style.last_nav_items}>
        <Link href={"#"} className={style.docs}> Docs</Link>

        <Image src={"/np_notification.svg"}
          alt={"notification icons"}
          width={26}
          height={26}
          className={style.notification}
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
