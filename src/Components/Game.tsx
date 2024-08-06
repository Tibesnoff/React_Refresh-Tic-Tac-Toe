import { useCallback } from "react";
import Board from "./Board";
import useGameState, { ActionType } from "../Hooks/useGameState";

const Game: React.FC = () => {
    const { gameState, dispatch, history } = useGameState();

    const StatusHeader = useCallback(() => {
        const { player, winner } = gameState;
        return <h2>{winner ? `Winner: ${player}` : `Next player: ${player}`}</h2>;
    }, [gameState]);

    const HistoryComponent = useCallback(() => {
        return (
            <div>
                <button onClick={() => dispatch({ type: ActionType.RESET })}>Reset Game</button>
                <ol>
                    {history.length > 1 && history.map((_, index) => (
                        <li key={index}>
                            <button onClick={() => dispatch({ type: ActionType.UNDO, index })}>
                                Go to {index === 0 ? "start" : `move #${index}`}
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        );
    }, [dispatch, history]);

    return (
        <>
            <StatusHeader />
            <div className="game">
                <Board boardState={gameState.board} updateBoard={(index: number) => dispatch({ type: ActionType.UPDATE, index })} />
                <div className="game-info">
                    <HistoryComponent />
                </div>
            </div>
        </>
    );
};

export default Game;