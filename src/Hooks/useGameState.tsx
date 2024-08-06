import { useCallback, useReducer, useState } from "react";

export enum SquareState {
    X = "X",
    O = "O",
    Empty = ""
}

export interface GameState {
    player: SquareState;
    board: SquareState[];
    winner: boolean;
}

export enum ActionType {
    UPDATE,
    RESET,
    UNDO
}

interface Action {
    type: ActionType;
    index?: number;
}

const InitialBoardState: SquareState[] = Array(9).fill(SquareState.Empty);
const InitialPlayer: SquareState = SquareState.X;
const InitialWinner: boolean = false;

const InitialGameState: GameState = {
    player: InitialPlayer,
    board: InitialBoardState,
    winner: InitialWinner
};

const useGameState = () => {
    const [history, setHistory] = useState<GameState[]>([InitialGameState]);

    const checkWinner = useCallback((board: SquareState[]) => {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        winningCombos.forEach(([a, b, c]) => {
            if (board[a] !== SquareState.Empty && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        })

        return false;
    }, []);

    const reducer = useCallback((state: GameState, action: Action): GameState => {
        switch (action.type) {
            case ActionType.UPDATE:
                if (state.winner || state.board[action.index!] !== SquareState.Empty) return state;

                const newBoard = state.board.slice();
                newBoard[action.index!] = state.player;
                const newWinner = checkWinner(newBoard);

                setHistory(prevHistory => [...prevHistory, { player: state.player === SquareState.X ? SquareState.O : SquareState.X, board: newBoard, winner: newWinner }]);

                return {
                    player: state.player === SquareState.X ? SquareState.O : SquareState.X,
                    board: newBoard,
                    winner: newWinner
                };
            case ActionType.RESET:
                setHistory([InitialGameState]);
                return InitialGameState;
            case ActionType.UNDO:
                setHistory(prevHistory => prevHistory.slice(0, action.index! + 1));
                return history[action.index!] || state;
            default:
                return state;
        }
    }, [checkWinner, history]);

    const [gameState, dispatch] = useReducer(reducer, InitialGameState);

    return { gameState, dispatch, history };
};

export default useGameState;