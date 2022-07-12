import { ColorsEnum } from "../enums/ColorsEnum";
import { PlayersEnum } from "../enums/PlayersEnum";

export class CheckerModel {
    color: ColorsEnum;
    player: PlayersEnum;
    isKing: boolean = false;

    constructor(color: ColorsEnum, player: PlayersEnum) {
        this.color = color;
        this.player = player;
    }
}