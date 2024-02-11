import Image from "next/image";
export const EmptyFavourites = () => {
    return (
        <div className="h-full flex flex-col justify-center items-center">
            <Image 
                src="/notfound.svg"
                alt="Empty"
                height={280}
                width={280}
            />
            <h2 className="text-2xl font-semibold mt-6"> 
                No favourite boards!
            </h2>

            <p className="text-muted-foreground text-sm mt-2">
                Try favouriting a board.
            </p>
        </div>
    )
}