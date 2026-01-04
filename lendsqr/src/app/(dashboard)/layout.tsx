"use client";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
    }) {
    return (
        <ProtectedRoute>   
            <Navbar />
            <div style={{display: 'flex', alignItems:"flex-start", justifyContent: "flex-start"}}>
            <Sidebar/>
            <main>{children}</main>
            </div>
        </ProtectedRoute>
    )
}