export default class Game {
  private matches: number;
  private winner: string | null;
  private playerTurn: boolean;
  private isGameOver: boolean = false;
  private playerScore: number = 0;
  private botScore: number = 0;
  private botStarts: boolean;
  private maxNumMatchesPerMove: number;

  constructor(
    numMatches: number,
    firstMove: string,
    maxNumMatchesPerMove: number
  ) {
    this.matches = 2 * numMatches + 1;
    this.playerTurn = firstMove === "player" ? true : false;
    this.botStarts = firstMove === "player" ? false : true;
    this.maxNumMatchesPerMove = maxNumMatchesPerMove;
    this.winner = null;

    if (!this.playerTurn && this.botStarts) {
      this.botTurn();
    }
  }

  public makeMove(matchesNumber: number): void {
    if (this.playerTurn === true && this.matches >= 0) { 
      this.matches -= matchesNumber;
      this.playerScore += matchesNumber;
      this.playerTurn = !this.playerTurn;
      this.checkgameOver();
      if (!this.isGameOver && !this.playerTurn) {
        this.botTurn();
      }
    }
  }

  private checkgameOver(): void {
    if (this.matches <= 0) {
      this.isGameOver = true;

      if (this.botScore > this.playerScore && this.botScore % 2 === 0) {
        this.winner = "AI won";
        return;
      } else if (
        this.playerScore > this.botScore &&
        this.playerScore % 2 === 0
      ) {
        this.winner = "You won";
      } else if (this.playerScore % 2 === 0 && this.botScore % 2 !== 0) {
        this.winner = "You won";
      } else if (this.botScore % 2 === 0 && this.playerScore % 2 !== 0) {
        this.winner = "AI won";
      } else {
        this.winner = "Draw";
      }
    }
  }

  //TODO: improve algorithm to take num of matches
  private botTurn(): void {
    let optimalStrategy: number;
    if(this.matches > this.maxNumMatchesPerMove * 2) {
      optimalStrategy = this.maxNumMatchesPerMove;
    }
    else {
      optimalStrategy = (this.matches - 1) % 4;
    }
    
    const numMatches: number = optimalStrategy === 0 ? 1 : optimalStrategy;
    this.matches -= numMatches;
    this.botScore += numMatches;
    this.checkgameOver();
    this.playerTurn = true;
  }

  public getMatchesNumber(): number {
    return this.matches;
  }

  public getIsGameOver(): boolean {
    return this.isGameOver;
  }

  public isPlayerTurn(): boolean {
    return this.playerTurn;
  }

  public getPlayerScore(): number {
    return this.playerScore;
  }

  public getBotScore(): number {
    return this.botScore;
  }

  public getWinner(): string | null {
    return this.winner;
  }
}
