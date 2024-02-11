"use client"

import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./_component/empty-org";
import { BoardList } from "./_component/sidebar/board-list";
import { query } from "@/convex/_generated/server";

interface DashboardPageProps{
    searchParams: {
        search?: string;
        favourites?: string;
    };
};

const DashboardPage = ({
    searchParams,
}: DashboardPageProps) => {
    const { organization } = useOrganization();


    return (

        <div className="flex-1 h-[calc(100%-80px)] p-6">

            {!organization ? (
                <EmptyOrg />
            ) : (
                <BoardList 
                    orgId = {organization.id}
                    query = {searchParams}
                />
            )}
        </div>
    )
}

export default DashboardPage;