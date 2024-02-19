import { Canvas } from "./_componenets/canvas";
import { Room } from "@/components/room";
import { Loading } from "./_componenets/canvas-loading";


interface BoardIdPageProps {
    params: {
        boardId: string,
    }
}

const BoardIdPage = ({
    params
}: BoardIdPageProps) => {
    return (
        <Room roomId={params.boardId} fallback={<Loading />}>
            <Canvas boardId = {params.boardId}/>
        </Room>
    )
}

export default BoardIdPage;