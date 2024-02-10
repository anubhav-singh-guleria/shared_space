import { Navbar } from "./_component/navbar";
import { OrgSidebar } from "./_component/org-sidebar";
import { Sidebar } from "./_component/sidebar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({
    children,
}: DashboardLayoutProps) => {
    return (
        <main className="h-full">
            <Sidebar />
            <div className="h-full pl-[60px]">
                <div className="flex gap-x-3 h-full">
                    <OrgSidebar />
                    <div className="h-full flex-1">
                        <Navbar />
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default DashboardLayout;