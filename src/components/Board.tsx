import React, { memo, useState } from "react";
import { PlayersEnum } from "../enums/PlayersEnum";
import { BoardModel } from "../models/BoardModel";
import { CellModel } from "../models/CellModel";
import Cell from "./Cell";

interface BoardProps {
    board: BoardModel;
    curPlayer: PlayersEnum,
    swapPlayer: () => void
}

const Board = memo(({ board, curPlayer, swapPlayer }: BoardProps) => {
    const [selectedCell, setSelectedCell] = useState<CellModel | null>(null);
    const [isValidMove, setIsValidMove] = useState<boolean>(true);

    /*
      Select Cell / Can select cell
    */
    const selectCell = (cell: CellModel) => {
        if (cell.x === selectedCell?.x && cell.y === selectedCell?.y) {
            setSelectedCell(null);
            return;
        }

        if (canSelectCell(cell)) {
            setSelectedCell(cell);
        } else if (selectedCell !== null) {
            handleMove(cell);
        }
    }

    const canSelectCell = (cell: CellModel) => {
        if (!cell.checker) {
            return false;
        }

        return cell.checker.player === curPlayer;
    }

    /*
      Handle Move and change turn
    */
    const handleMove = (cell: CellModel) => {
        if (selectedCell) {
            if (!board.canMoveChecker(curPlayer, selectedCell, cell.y, cell.x)) {
                setIsValidMove(false);
                setTimeout(() => setIsValidMove(true), 1000);
                return;
            }

            let isJump = board.isJumpMove(selectedCell, cell.y);
            if (selectedCell.checker?.isKing) {
                board.moveKingChecker(selectedCell, cell.y, cell.x);
            } else {
                board.moveChecker(selectedCell, cell.y, cell.x);
            }

            const isPlayerOneCheckerOnTheEdge = (cell.checker?.player === PlayersEnum.PLAYER_ONE && cell.y === 0);
            const isPlayerTwoCheckerOnTheEdge = (cell.checker?.player === PlayersEnum.PLAYER_TWO && cell.y === 7)

            if (!board.isKing(cell) && (isPlayerOneCheckerOnTheEdge || isPlayerTwoCheckerOnTheEdge)) {
                console.log("making King....");
                board.makeKing(cell);
            }

            if (isJump && board.canKeepJumping(cell)) {
                setSelectedCell(cell);
            } else {
                setSelectedCell(null);
                swapPlayer();
            }
        }
    }

    return (
        <div className="board">
            {board.cells.map((row, index) => (
                <React.Fragment key={index}>
                    {row.map((cell, index) => (
                        <Cell
                            key={index}
                            cell={cell}
                            isSelected={selectedCell?.x === cell.x && selectedCell.y === cell.y}
                            onClick={selectCell}
                        />
                    ))}
                </React.Fragment>
            ))}

            {!isValidMove && (
                <div className="board__error">This isn't valid move!</div>
            )}
        </div>
    )
});

export default Board;