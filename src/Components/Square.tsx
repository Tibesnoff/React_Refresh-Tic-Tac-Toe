import { PropsWithChildren } from "react";
import { SquareState } from "../Hooks/useGameState";

interface SquareProps {
    squareState: SquareState;
    onClick: () => void;
}

const Square: React.FC<PropsWithChildren<SquareProps>> = ({ squareState, onClick }) => {
    return (
        <button className="square" onClick={onClick}>
            {squareState}
        </button>
    );
};

export default Square;