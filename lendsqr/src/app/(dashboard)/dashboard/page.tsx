"use client";

import ActionMenu, { MenuItem } from "@/components/ActionMenu";
import { ChevronLeft, ChevronRight, EllipsisVertical } from "lucide-react"
import { useEffect, useState } from "react";

import { Eye } from 'lucide-react';
import FilterPopover from "@/components/FilterPopover";
import Image from "next/image";
import Skeleton from "@/components/Skeleton";
import { User } from "@/types/user";
import UserCards from "@/components/UserCards";
import { getUsers } from "@/lib/users.api";
import styles from "./dashboard.module.scss";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";

export default function Dashboard() {

  const router = useRouter()
  const [users, setUsers] = useState<User[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [filteredUsers, setFilterUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [actionMenuOpen, setActionMenuOpen] = useState<boolean>(false);
  const [actionMenuPosition, setActionMenuPosition] = useState({ top: 0, left: 0 });
  const [activeUserId, setActiveUserId] = useState<string | null>(null);


  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const [filters, setFilters] = useState({
    organization: "",
    username: "",
    email: "",
    phone: "",
    status: "",
    date: "",
  });

  const handleFilterClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    column: string
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

    
    setFilterPosition({
      top: rect.bottom + window.scrollY + 8,
      left: rect.left + window.scrollX,
    });

    setActiveFilter(column)
    setFilterOpen(true);
  }

const applyFilters = () => {
  const filtered = users.filter((user) => {
    return (
      (!filters.organization ||
        user.organization
          .toLowerCase() === filters.organization.toLowerCase()) &&

      (!filters.username ||
        user.username
          .toLowerCase()
          .includes(filters.username.toLowerCase())) &&

      (!filters.email ||
        user.email.toLowerCase().includes(filters.email.toLowerCase())) &&

      (!filters.phone ||
        user.phone.includes(filters.phone)) &&

      (!filters.status ||
        user.status.toLowerCase() === filters.status.toLowerCase()) &&
      (!filters.date || 
        new Date(user.dateJoined).toISOString().split("T")[0] === filters.date
      )
    );
  });

  setFilterUsers(filtered);
  setCurrentPage(1);
  setFilterOpen(false);
};


const resetFilters = () => {
  setFilters({
    organization: "",
    username: "",
    email: "",
    phone: "",
    status: "",
    date: "",
  });

  setFilterUsers(users);
  setCurrentPage(1)
  setFilterOpen(false);
};







useEffect(() => { 
  async function fetchUsers() {
    try {
        const data = await getUsers();
        setUsers(data);
        setFilterUsers(data)
        setLoading(false);
        toast.success("Users fetched successfully.");
      }
      catch (error) { 
        toast.error("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  },[])


  const getStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return styles.active;
      case "pending":
      return styles.pending;
    case "inactive":
      return styles.inactive;
    case "blacklisted":
        return styles.blacklisted;
      default:
        return "";
    }
  }

  const organizations = Array.from(
    new Set(users.map((u)=> u.organization))
  )

  const handleActionMenuClick = (
    e: React.MouseEvent<SVGSVGElement>,
    userId: string
  ) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setActionMenuPosition({
      top: rect.bottom + window.scrollY + 5,
      left: rect.left + window.scrollX - 130,
    });
    setActiveUserId(userId);
    setActionMenuOpen(true);
  };

  const actionMenuItems: MenuItem[] = [
    {
      text: "View Details",
      icon: "/eye(1).svg",
      onClick: () => {
        if (activeUserId) {
          router.push(`/dashboard/users/${activeUserId}`);
        }
      },
    },
    {
      text: "Blacklist user",
      icon: "/user-times1.svg",
      onClick: () => {
        toast.success("User blacklisted");
      },
    },
    {
      text: "Activate user",
      icon: "/user-check1.svg",
      onClick: () => {
        toast.success("User activated");
      },
    },
  ];


  return (
    <div>
      <h1 className={styles.head}>Users</h1>
      <div className={styles.users}>

      {loading ? (
        <>
          <Skeleton variant="card" />
          <Skeleton variant="card" />
          <Skeleton variant="card" />
          <Skeleton variant="card" />
        </>
      ) : (
        <>
          <UserCards
            icon={"/np_users.svg"}
            label={"users"}
              value={users.length.toLocaleString()}
              variant="pink"
            />
            <UserCards
            icon={"/Group(1).svg"}
            label={"active"}
            value={users.filter(u => u.status.toLowerCase() === "active").length.toLocaleString()}
            variant="purple"
            />
            <UserCards
            icon={"/Group(2).svg"}
            label={"users with loans"}
              value={users.filter(u => u.details.educationAndEmployment.loanRepayment).length.toLocaleString()}
              variant="orange"
            />
            <UserCards
            icon={"/Group(3).svg"}
            label={"users with savings"}
              value={"53"}
              variant="red"
            />
        </>
      )}
        </div>
        <div className={styles['table-container']}>
        {
          filterOpen && (
            <FilterPopover
              organization={organizations}
              filters={filters}
              setFilters={setFilters}
              onClose={() => setFilterOpen(false)}
              position={filterPosition}
              onApply={applyFilters}
              onReset={resetFilters}
            />
          )
        }
        {
          actionMenuOpen && (
            <ActionMenu
              isOpen={actionMenuOpen}
              onClose={() => setActionMenuOpen(false)}
              position={actionMenuPosition}
              items={actionMenuItems}
            />
          )
        }
      <table>
        <thead>
          <tr>
              <th>
                <div className={styles.headings}>

                Organization
                  <button className={styles.filter}
                    onClick={(e) =>
                    {
                      e.stopPropagation()
                      handleFilterClick(e, "organization")
                    }}
                  >

                <Image
                    src={"filter-results-button.svg"}
                    alt={"filter"}
                    width={16}
                    height={16}
                    />
                  </button>
                    </div>
              </th>
              <th >
                <div className={styles.headings}>

                Username

                  <button className={styles.filter} onClick={(e) => {
                    e.stopPropagation()
                    handleFilterClick(e, "username")
                  }}>

                <Image
                    src={"filter-results-button.svg"}
                    alt={"filter"}
                    width={16}
                    height={16}
                  />
                  </button>
                    </div>
            </th>
              <th >
                <div className={styles.headings}>

                Email
                  <button className={styles.filter} onClick={(e) => {
                    e.stopPropagation()
                    handleFilterClick(e, "email")
                  }}>

                <Image
                    src={"filter-results-button.svg"}
                    alt={"filter"}
                    width={16}
                    height={16}
                  />
                  </button>
                </div>
            </th>
              <th >
                <div className={styles.headings}>

                Phone
                  <button className={styles.filter}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleFilterClick(e, "phone")
                    }}>

                <Image
                    src={"filter-results-button.svg"}
                    alt={"filter"}
                    width={16}
                    height={16}
                    />
                  </button>
                  </div>
            </th>
              <th >
                <div className={styles.headings}>

                Date Joined
                  <button className={styles.filter} onClick={(e) => {
                    e.stopPropagation()
                    handleFilterClick(e, "date")
                  }}>

                <Image
                    src={"filter-results-button.svg"}
                    alt={"filter"}
                    width={16}
                    height={16}
                  />
                  </button>
                    </div>
            </th>
              <th >
                <div className={styles.headings}>

                Status
                  <button className={styles.filter} onClick={(e) => {
                    
                    handleFilterClick(e, "status")
                  }}>

                <Image
                    src={"filter-results-button.svg"}
                    alt={"filter"}
                    width={16}
                    height={16}
                    />
                  </button>
                    </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} variant="table-row" />
            ))
          ) : (
            paginatedUsers.map((user) => (
              <tr key={user.id}
                className={styles.row}
              onClick={()=> router.push(`/dashboard/users/${user.id}`)}
              >
                <td>{user.organization}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.dateJoined}</td>
                <td>
                  <span className={`${styles.status} ${getStatus(user.status)}`}>
                    
                  {user.status}
                  </span>
                  </td>
                 <td>
                  <EllipsisVertical
                    size={15}
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleActionMenuClick(e, user.id)
                    }}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
        </table>

        </div>
      <div className={styles.bottom}>
        <div>
          Showing {startIndex + 1}-{Math.min(endIndex,totalUsers)} of {totalUsers}
        </div>
      <div className={styles.paginationControls}>
        <button
            disabled={currentPage === 1}
          className={styles.arrow}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          <ChevronLeft size={14} color="#213f7d"/>
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={page === currentPage ? styles.activePage : ""}
            onClick={() => setCurrentPage(page)}
            
          >
            {page}
          </button>
        ))}

        <button
            disabled={currentPage === totalPages}
            className={styles.arrow}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          <ChevronRight size={14} color="#213f7d"/>
        </button>
        </div>
            {/* <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select> */}
        </div>
      
    </div>
    
  );
}
