
/*
What I need:

Shoe class                              ------------------    yes
Player class                              ------------------    yes

player choose bet size 

.shift() card to player and computer boards, twice

scoring:                                        ------------------    yes
1) 2-9 cards - the score equals Number(card.split('')[0])
2) card[0] === - a the score equals 1
3) else - the score equals 0
add cards up, turn to string and chop of first digit, and turn back to number

[third card rule] --- store on player object??      ------------------    yes



------

the game flow itself 

start
creates and shuffles the shoe - animation

player chooses bet size and go.

deals cards.

wait.

deals third card.

wait.

pays bets.


*/

// classes

class Player {
  constructor(playerName, bankroll) {
    this.playerName = playerName;
    this._bankroll = bankroll
  }

  get bankroll() {
    return this._bankroll;
  }

  set bankroll(bankroll) {
    this._bankroll = bankroll;
  }
}

class Hand {
  constructor(playerHand, computerHand) {
    this._playerHand = playerHand;
    this._computerHand = computerHand;
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

  readScore(array) {
    let score = 0;
    array.forEach((card) => {
      if (card[0] === 'A') {
        score += 1;
      } else if (card[0] === '1' || !Number(card[0])) {
        score += 0;
      } else {
        score += Number(card[0]);
      }
    })
    score = String(score).split('');
    return score.length > 1 ? Number(score[1]) : Number(score);
  };

  playerScore() {
    return this.readScore(this.playerHand);
  }

  computerScore() {
    return this.readScore(this.computerHand);
  }


}

class Shoe {
  constructor(shoeSize){
    this._shoe = [];
    this.shoeSize = shoeSize;
    this.deck = [];
    this.suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
    this.cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
  }

  dealADeck() {
    this.suits.forEach(suit=>{
      this.cards.forEach(card=>{
        this.deck.push(`${card} of ${suit}`)
      })
    })
  }

  shuffle(array) {
    let k = array.length - 1
    for (let i = k; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
  }

  createShoe(){
    for (let i=0; i<=this.shoeSize; i++){
      this.deck = this.shuffle(this.deck)
      this._shoe.push(...this.deck);
    }
  }

  get shoe() {
    return this._shoe;
  }

  set shoe(array) {
    this._shoe = array;
  }

  dealACard() {
    return this.shoe.shift()
  }

}


//

const start = document.getElementById('start');
const dealButton = document.getElementById('deal-button');

const boards = Array.from(document.querySelectorAll('.boards > div'));
const scores = Array.from(document.querySelectorAll('.scores > div'));



let player;
let shoe;
let hand;

//


start.addEventListener('click', () => {
  startGame();
  //some display stuff
})

dealButton.addEventListener('click', () => {
  dealHand();
  //some display stuff
})


//

const startGame = (playerName) => {
  player = new Player(playerName, 10000);
  shoe = new Shoe(6);
  shoe.dealADeck();
  shoe.createShoe();
  console.log(shoe);
}

const dealHand = () => {
  let dealtToPlayer = [];
  let dealToComputer = [];
  for (let i=0;i<2;i++){
    dealtToPlayer.push(shoe.dealACard());
    dealToComputer.push(shoe.dealACard());
  }
  hand = new Hand(dealtToPlayer, dealToComputer);
  console.log(hand);
  console.log(boards);
  boards[0].innerHTML = toPictureFormat(hand.playerHand);
  boards[1].innerHTML = toPictureFormat(hand.computerHand);
  updateScores();
}

const updateScores = () => {
  scores[0].innerHTML = hand.playerScore();
  scores[1].innerHTML = hand.computerScore();
};

const toPictureFormat = (array) => {
  let format = array.map(el=>el.split(' ')[0][0] + el.split(' ')[2][0]);
  return format.reduce((a,b)=>{
    return a + `<img src="./imgs/poker-super-qr/${b}.svg">`
  }, '');
}