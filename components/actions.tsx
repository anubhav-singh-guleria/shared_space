"use client"

import { DropdownMenuArrowProps } from "@radix-ui/react-dropdown-menu"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { Link2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";

interface ActionsProps {
    children: React.ReactNode;
    side?: DropdownMenuArrowProps["side"];
    sideOffset?: DropdownMenuArrowProps["sideOffset"];
    id: string;
    title: string;
};

export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title
}: ActionsProps) => {

    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`
        )
        .then(()=> toast.success("Link copied"))
        .catch(() => toast.error("Failed to copy link"))
    }

    const {mutate, pending} = useApiMutation(api.board.remove);

    const onDelete = () => {
        mutate({ id })
            .then(()=> toast.success("Board deleted"))
            .catch(()=>toast.error("Failed to delete board"))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side={side}
                sideOffset={sideOffset}
                onClick={(e)=> e.stopPropagation()}
                className="w-60"
            >
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
                    <Link2 className="h-4 w-4 mr-2" />
                        Copy board link
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={onDelete}>
                    <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}