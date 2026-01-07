import { useEffect, useRef } from "react";

import style from "./Filterpopover.module.scss"

type Props = {
    organization: string[];
    filters: any;
    setFilters: Function;
    onClose: () => void;
    onApply: () => void;
    onReset: () => void;
    position: { top: number; left: number };
}

export default function FilterPopover({
    organization,
    filters,
    setFilters,
    onClose,
    onApply,
    position,
    onReset

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
}, []);

    return (
        <div ref={ref} className={style.popover} style={{
    position: "absolute",
    top: position.top,
    left: position.left,
  }}>
            <div className={style.cell}>

                <label htmlFor="Organization"> Organization</label>
                <select
                    value={filters.organization}
                    onChange={(e) => setFilters((prev: any) => ({
                        ...prev, organization:e.target.value
                    }))}
                    name="organization" id="organizations">
                    <option value="">Select</option>
                    {
                        organization.map((org) => (
                            <option key={org} value={org}>
                                {org}
                            </option>
                        ))
                    }
                    
              </select>
            </div>
                
                <div className={style.cell}>

                <label htmlFor="Username"> Username</label>
                <input
                    placeholder="Username"
                    value={filters.username}
                    onChange={(e)=> setFilters((prev: any) => ({...prev, username: e.target.value}))}
                    type="text" />
            </div>
                <div className={style.cell}>

                <label htmlFor="Email"> Email</label>
                <input
                    placeholder="Email"
                    value={filters.email}
                    onChange={(e)=> setFilters((prev: any) => ({...prev, email: e.target.value}))}
                    type="email" />
            </div>
            <div className={style.cell}>

                <label htmlFor="Date"> Date Joined</label>
                <input
                    placeholder="phone"
                    value={filters.date}
                    onChange={(e)=> setFilters((prev: any) => ({...prev, date: e.target.value}))}
                    type="date" />
            </div>
            <div className={style.cell}>

                <label htmlFor="phone"> Phone</label>
                <input
                    placeholder="phone"
                    value={filters.phone}
                    onChange={(e)=> setFilters((prev: any) => ({...prev, phone: e.target.value}))}
                    type="text" />
            </div>
            <div className={style.cell}>
                <label htmlFor="Status">Status</label>
                <select
                    value={filters.status}
                    onChange={(e) => setFilters((prev: any) => ({...prev, status:e.target.value}))}
                >
                    <option value="">Select status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="blacklisted">Blacklisted</option>
                    <option value="pending">Pending</option>
                </select>
            </div>
            <div className={style.action}>
        <button onClick={onReset}>Reset</button>
        <button onClick={onApply}>Filter</button>
      </div>


        </div>
    )
    
}