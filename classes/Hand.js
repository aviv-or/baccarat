export default class Hand {
  constructor() {
    this._playerHand = [];
    this._computerHand = [];
    this._playerBet = 0;
    this._bankerBet = 0;
    this._tieBet = 0;
  }

  get playerHand() {
    return this._playerHand;
  }

  set playerHand(playerHand) {
    this._playerHand = playerHand;
  }
  get computerHand() {
    return this._computerHand;
  }

  set computerHand(computerHand) {
    this._computerHand = computerHand;
  }

  get toPictureFormatPlayer() {
    let format = this.playerHand.map(el=>el.split(' ')[0][0] + el.split(' ')[2][0]);
    return format.reduce((a,b,i)=>{ 
      if (i<2) {
      return a + `<img src="./imgs/poker-super-qr/${b}.svg">`
    } else {
      return a + `<img style="transform: rotate(90deg)" src="./imgs/poker-super-qr/${b}.svg">`
    }
     }, '');
  }

  get toPictureFormatComputer() {
    let format = this.computerHand.map(el=>el.split(' ')[0][0] + el.split(' ')[2][0]);
    return format.reduce((a,b,i)=>{ 
      if (i<2) {
      return a + `<img src="./imgs/poker-super-qr/${b}.svg">`
    } else {
      return a + `<img style="transform: rotate(90deg)" src="./imgs/poker-super-qr/${b}.svg">`
    }
     }, '');
  }

  addChipsImages(num) {
    let total = num;
    let array = [];
    [100,25,5].forEach(e=>{
      while(total-e>=0){
        array.push(e);
        total-=e;
      }
    });
    return array.reduce((a,b)=>{return a + `<img src="./imgs/pc/${b}st.jpg">` }, '');
  }


  get playerBet() {
    return this._playerBet;
  }

  set playerBet(newSize) {
    this._playerBet = newSize;
  }

  playerBetPay(){
    return this.playerBet *= 2;

  }

  get bankerBet() {
    return this._bankerBet;
  }

  set bankerBet(newSize) {
    this._bankerBet = newSize;
  }

  bankerBetPay(){
    return this.bankerBet *= 2;
  }

  get tieBet() {
    return this._tieBet;
  }

  set tieBet(newSize) {
    this._tieBet = newSize;
  }

  tieBetPay(){
    return this.tieBet *= 11
  }

  payoutBets(){
    let winner = this.winner.split(' ')[0].toLowerCase();
    console.log(winner);

    ['player', 'banker', 'tie'].forEach(e=>{
      e === winner ? this[`${e}BetPay`]() : this[`${e}Bet`] = 0
    })

  }

  resetBet(){
    this.playerBet = 0;
    this.bankerBet = 0;
    this.tieBet = 0;
  }

  readScore(array) {
    if (!array[0]) {
      return null
    } else {
      let score = array.reduce((acc, el) => {
        if(el[0] === 'A') {
          return acc + 1;
        } else if (el[0] === '1' || !Number(el[0])) {
          return acc + 0;
         } else {
           return acc + Number(el[0]);
        }
      }, 0);
      score = String(score).split('');
      return score.length > 1 ? Number(score[1]) : Number(score);
    }
  };
  
  get playerScore() {
    return this.readScore(this.playerHand);
  }

  get computerScore() {
    return this.readScore(this.computerHand);
  }

  get natural() {
    return this.playerScore > 7 || this.computerScore > 7 ? true : false
  }

  thirdCardPlayer() {
   return this.playerScore < 5 ? true : false ;
  }

  thirdCardComputer() {
    let playerThirdCard = this.readScore([this.playerHand[2]]);
    console.log(this.playerHand[2], playerThirdCard, this.computerScore);
    if (!playerThirdCard && this.computerScore < 6) {return true};
    if (playerThirdCard < 2 && this.computerScore < 4) {return true};
    if (playerThirdCard < 4 && this.computerScore < 5) {return true};
    if (playerThirdCard < 6 && this.computerScore < 6) {return true};
    if (playerThirdCard < 8 && this.computerScore < 7) {return true};
    if (playerThirdCard < 9 && this.computerScore < 3) {return true};
    if (playerThirdCard < 10 && this.computerScore < 4) {return true};
    return false;
  }

  get winner() {
    return this.playerScore > this.computerScore ? 'Player Wins' :  this.computerScore > this.playerScore ? 'Banker Wins' : 'Tie';
  }

}
