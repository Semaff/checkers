import { memo } from "react";
import CheckerSVG from "../assets/CheckerSVG";
import KingCheckerSVG from "../assets/KingCheckerSVG";
import { CellModel } from "../models/CellModel";

interface CellProps {
    cell: CellModel;
    isSelected: boolean;
    onClick: (cell: CellModel) => void;
}

const Cell = memo(({ cell, isSelected, onClick }: CellProps) => {
    return (
        <div className={`cell ${cell.color} ${isSelected ? "active" : ""}`} onClick={() => onClick(cell)}>
            {cell.checker && (!cell.checker.isKing
                ? (
                    <div className={`checker ${cell.checker.color}`}>
                        <CheckerSVG />
                    </div>
                )
                : (
                    <div className={`checker ${cell.checker.color}`}>
                        <KingCheckerSVG />
                    </div>
                )
            )}
        </div>
    )
});

export default Cell;