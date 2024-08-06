import { PropsWithChildren, useCallback } from "react";
import Square from "./Square";
import { SquareState } from "../Hooks/useGameState";

interface BoardProps {
    boardState: SquareState[];
    updateBoard: (index: number) => void;
}

const Board: React.FC<PropsWithChildren<BoardProps>> = ({ boardState, updateBoard }) => {
    const RenderRow: React.FC<{ row: number }> = useCallback(({ row }) => {
        const startIndex = row * 3;

        return (
            <div className="board-row">
                <Square squareState={boardState[startIndex]} onClick={() => updateBoard(startIndex)} />
                <Square squareState={boardState[startIndex + 1]} onClick={() => updateBoard(startIndex + 1)} />
                <Square squareState={boardState[startIndex + 2]} onClick={() => updateBoard(startIndex + 2)} />
            </div>
        );
    }, [boardState, updateBoard]);

    return (
        <div>
            <RenderRow row={0} />
            <RenderRow row={1} />
            <RenderRow row={2} />
        </div>
    );
};

export default Board;