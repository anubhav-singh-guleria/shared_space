"use client"

import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";

import { EmptySearch } from "../empty-search";
import { EmptyFavourites } from "../empty-favourites";
import { EmptyBoards } from "../empty-boards";

interface BoardListProps  {
    orgId: string;
    query: {
        search?: string
        favourites?: string
    }
}

export const BoardList = ({
    orgId,
    query,
}: BoardListProps) => {
    const data = useQuery(api.boards.get, {orgId})

    if(data === undefined ){
        return (
            <div>
                Loading...
            </div>
        )
    }
    if(!data?.length && query?.search){
        return (
            <EmptySearch />
        )
    }

    if(!data?.length && query?.favourites){
        return (
            <EmptyFavourites />
        )
    }

    if(!data?.length){
        return (
            <EmptyBoards />
        )
    }

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    )
}