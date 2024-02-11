"use clients"

import { Button } from "@/components/ui/button";

import Image from "next/image";

import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";


export const EmptyBoards = () => {

    const { mutate, pending } = useApiMutation(api.board.create);
    const { organization } = useOrganization();
    const onClick = () => {
        if(!organization) return;
        
        mutate({
            orgId: organization.id,
            title: "Untitled"
        })
        .then( (id) => {
            toast.success("Board Created");
        }).catch((error) => {
            throw error;
        })
    }

    return (
        <div className="h-full flex flex-col justify-center items-center">
            <Image 
                src="/note.svg"
                alt="Empty"
                height={280}
                width={280}
            />
            <h2 className="text-2xl font-semibold mt-6"> 
                Create your first board!
            </h2>

            <p className="text-muted-foreground text-sm mt-2">
                Start by creating a board for your organization!
            </p>

            <Button disabled = {pending} onClick = {onClick} size="lg" className="mt-2">
                Creat Board
            </Button>
        </div>
    )
}