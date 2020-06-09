
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
    console.log(array);
    if (!array[0]) {return null} else {
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
    return this.playerScore > this.computerScore ? 'Player Wins' :  this.computerScore > this.playerScore ? 'Computer Wins' : 'Tie';
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
const openingScreen = document.getElementById('opening-screen');
const mainGame = document.querySelector('main');
const dealButton = document.getElementById('deal-button');
const shoeDisplay = document.getElementById('shoe');

const results = Array.from(document.querySelectorAll('.results > div'));
const boards = Array.from(document.querySelectorAll('.boards > div'));
const scores = Array.from(document.querySelectorAll('.scores > div'));
const playerArea = Array.from(document.querySelectorAll('.player-area > div'));
const chipsArea = Array.from(document.querySelectorAll('.chips-area > i'));

const nextHand = document.getElementById('next-hand');

const boardBets = [
  document.getElementById('player-bet'),
  document.getElementById('banker-bet'),
  document.getElementById('tie-bet'),
]

let player;
let shoe;
let hand;

//


start.addEventListener('click', () => {
  let playerName = document.getElementById('player-name').value;
  let deckSize = Array.from(document.querySelectorAll('Form > Input')).find(e=>e.checked).value;
  startGame(playerName, deckSize);
  //some display stuff
})

dealButton.addEventListener('click', () => {
  dealHand();
  //some display stuff
})

nextHand.addEventListener('click', () => {
  resetForNextHand();
})

chipsArea.forEach(e=>{
  e.addEventListener('click', () => {
    if (e.classList.contains('selected')) {
      e.classList.remove('selected')
    } else {
      e.classList.add('selected')
    }
  })
});

boardBets.forEach(e=>{
  e.addEventListener('click', () => {
    placeChip(e.id);
  })
});
//

const startGame = (playerName, deckSize) => {
  openingScreen.style.display = 'none';
  mainGame.style.display = 'flex';
  player = new Player(playerName, 1000);
  shoe = new Shoe(deckSize);
  shoe.dealADeck();
  shoe.createShoe();
  console.log(shoe);
  updatePlayerArea();
  shoeDisplay.innerHTML = `Cards left:${shoe.shoe.length}`;
}

const placeChip = (id) => {
  console.log(id);
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
  updateBoard();
  updateScores();
  if (hand.natural) {
    results[0].innerHTML = 'Natural'
    return handResult()
  }
  return setTimeout(dealThirdCard, 1000);
}

const toPictureFormat = (array) => {
  let format = array.map(el=>el.split(' ')[0][0] + el.split(' ')[2][0]);
  return format.reduce((a,b)=>{ return a + `<img src="./imgs/poker-super-qr/${b}.svg">` }, '');
}

const updateBoard = () => {
  boards[0].innerHTML = toPictureFormat(hand.playerHand);
  boards[1].innerHTML = toPictureFormat(hand.computerHand);
  shoeDisplay.innerHTML = `Cards left:${shoe.shoe.length}`;
};

const updateScores = () => {
  scores[0].innerHTML = hand.playerScore;
  scores[1].innerHTML = hand.computerScore;
};

const updateResults = () => {
  results[1].innerHTML = hand.winner;
}

const updatePlayerArea = () => {
  playerArea[1].innerHTML = player.playerName;
  playerArea[2].innerHTML = player.bankroll;
};

const dealThirdCard = () => {
    console.log(hand.thirdCardPlayer());
    if (hand.thirdCardPlayer()){
      hand.playerHand.push(shoe.dealACard());
    }
    if (hand.thirdCardComputer()){
      hand.computerHand.push(shoe.dealACard());
    }
  console.log(hand, shoe);
  updateBoard();
  updateScores();
  handResult();
} 
const handResult = () => {
  console.log(hand.winner)
  updateResults();
  // payout bets
};


const clearBoard = () => {
  scores.forEach(e=>e.innerHTML='');
  boards.forEach(e=>e.innerHTML='');
  results.forEach(e=>e.innerHTML='');
};

const resetForNextHand = () => {
  hand = new Hand;
  console.log(player, hand, shoe);
  clearBoard();
};