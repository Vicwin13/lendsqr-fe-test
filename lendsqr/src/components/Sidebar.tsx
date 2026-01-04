import { businessItems, customerItems, dashboardItems, settingsItems } from "./sideItems"

import Image from "next/image"
import SidebarItem from "./sidebarItem"
import style from "./sidebar.module.scss"
import { useState } from "react"

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={` ${style.sidebar} ${collapsed ? style.collapsed : ""}`}>
      <button className={style.toggle}
      onClick={() => setCollapsed((prev)=>!prev)}
      >
        {collapsed ? <Image
          src={"/list-collapse.svg"}
          alt={"Expand"}
          width={16}
          height={16}
        /> : <Image
          src={"/list-collapse.svg"}
          alt={"Collapse"}
          width={16}
          height={16}
        />} 
      </button>
      <div className={ ` ${style.switch} `}>
        <Image
          src={"/briefcase1.svg"}
          alt={"briefcase"}
          width={16}
          height={16}
        />
        <span>Switch Organization</span>
        <Image
          src={"/np_next.svg"}
          alt={"arrow down"}
          width={16}
          height={16}
        />
      </div>

      <div style={{marginTop: "45x"}}>
        {dashboardItems.map((item) => (
          <SidebarItem
            key={item.label}
            {...item}
            collapse={collapsed} />
        ))}
      </div>
      


      <div className={style.nav_items}>
        <p className={style.side_headings}>Customers</p>
        {customerItems.map((item) => (
          <SidebarItem
            key={item.label}
            {...item}
            collapse={collapsed} />
        ))}
      </div>

        <div className={style.nav_items}>
        <p className={style.side_headings}>Businesses</p>
        {businessItems.map((item) => (
          <SidebarItem
            key={item.label}
            {...item}
            collapse={collapsed} />
        ))}
      </div>
        <div className={style.nav_items}>
        <p className={style.side_headings}>Settings</p>
        {settingsItems.map((item) => (
          <SidebarItem
            key={item.label}
            {...item}
            collapse={collapsed} />
        ))}
      </div>
    </aside>
  )
}

export default Sidebar