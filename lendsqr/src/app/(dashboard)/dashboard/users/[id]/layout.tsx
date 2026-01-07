// app/dashboard/users/[id]/layout.tsx

import Image from "next/image";
import Link from "next/link";
import { MoveLeft } from 'lucide-react';
import NavTabs from "./NavTabs"
import { UserRound } from "lucide-react";
import { getUserById } from "@/lib/users.api";
import style from "./layout.module.scss"

type Props = {
    params: Promise<{
        id: string;
    }>
    children: React.ReactNode
}

export default async function UserLayout({
  children,
  params,
}: Props) {
    const { id } = await params;
    let user;
    try {
        user = await getUserById(id);
    } catch (error) {
        return (
            <div>
                <div className={style.links}>
                <Link href="/dashboard" className={style.back}><MoveLeft/> Back to Users</Link>
                </div>
                <div>User not found</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div>
                <div className={style.links}>
                <Link href="/dashboard" className={style.back}><MoveLeft/>Back Users</Link>
                </div>
                <div>User not found</div>
            </div>
        );
    }

  return (
      <div className={style.container}>
          <div className={style.links}>
              <Link href={"/dashboard"} className={style.back}> <MoveLeft/> Back to Users</Link>
          </div>
          <div className={style.action}>
            
              <p className={style.usd}>User Details</p>

        <div className={style.actionUser}>
          
              <button className={style.blacklist}>Blacklist User</button>
              <button className={style.activate}>Activate User</button>
              </div>
              
          </div>
          

      <div className={style.bigBanner}>
        
      <div className={style.banner}>
        <div className={style.profile}>
          <div className={style.avatar}>
                    <UserRound color="#213F7D" size={40}/>
          </div>
          <div className={style.name}>
              <h2 className={style.fullname}>{ user.fullName}</h2>
            <p className={style.Uid}>LSQFf587g90</p>
          </div>
        </div>

        <hr className="hr"/>

        <div className={style.tier}>
          <span>User's Tier</span>
          <div className={style.star}>

                  <Image src={"/np_star.svg"} alt={"star"} width={16} height={16} />
                  <Image src={"/np_star_1.svg"} alt={"star"} width={16} height={16} />
                  <Image src={"/np_star_1.svg"} alt={"star"} width={16} height={16}/>
          </div>
        </div>

        <hr />

        <div className={style.number}>
          <h3 className={style.amount}>₦200,000.00</h3>
          <p className={style.bank}>9912345678 / Providus Bank</p>
        </div>
      </div>

      <NavTabs id={id} />
</div>


      <div className={""}>{children}</div>
    </div>
  );
}
