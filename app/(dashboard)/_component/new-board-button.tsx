"use client"

import { api } from "@/convex/_generated/api"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface NewBoardButtonProps {
    orgId: string
    disabled: boolean
}

export const NewBoardButton = ({
    orgId,
    disabled
}:NewBoardButtonProps) => {

    const router = useRouter();
    const {mutate, pending} = useApiMutation(api.board.create);

    const onClick = () => {
        mutate({
            orgId,
            title: "Untitled"
        })
        .then((id)=>{
            toast.success("Board created!")
            router.push(`/board/${id}`);
        })
        .catch(()=> toast.error("Failed to create board."));
    }

    return (
        <button
            onClick={onClick}
            disabled = {pending || disabled}
            className={cn(
                "col-span-1 aspect-[100/127] bg-yellow-50 rounded-lg hover:bg-yellow-100 flex flex-col items-center justify-center py-6",
                (disabled || pending) && "opacity-75 bg-yellow-50 cursor-not-allowed"
            )}
        >
            <div />
            <Plus 
                className="h-12 w-12 stroke-1"
            />
            <p className="text-sm font-light">
                New Board
            </p>
        </button>
    )
}