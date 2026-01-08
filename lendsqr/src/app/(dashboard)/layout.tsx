"use client";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { SearchProvider } from "@/lib/SearchContext";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
    }) {
    return (
        <ProtectedRoute>
            <SearchProvider>
                <Navbar />
                <div style={{display: 'flex', alignItems:"flex-start", gap:"30px"}}>
                <Sidebar/>
                <main style={{overflowX: 'auto', width: 'fit-content', }}>{children}</main>
                </div>
            </SearchProvider>
        </ProtectedRoute>
    )
}