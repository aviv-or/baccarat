
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

const ed = new Player('Edward', 10000)
console.log(ed);
ed.bankroll += 20000;
console.log(ed);

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

const edShoe = new Shoe(6)
// console.log(edShoe);
edShoe.dealADeck();
// console.log(edShoe);
edShoe.createShoe();
console.log(edShoe.shoe);

let playerHand=[];
for (let i=0; i<3; i++) {
  playerHand.push(edShoe.dealACard());
}
console.log(playerHand);


const readScore = (array) => {
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

console.log(readScore(playerHand));


const thirdCardPlayer = (playerScore, computerScore)=>{
  if (playerScore > 7 || computerScore > 7) {return false};
  if (playerScore < 5) {return true};

};

const thirdCardComputer = (computerScore, playerThirdCard)=>{
  if (!playerThirdCard && computerScore < 3) {return true};
  if (playerThirdCard < 2 && computerScore < 4) {return true};
  if (playerThirdCard < 4 && computerScore < 5) {return true};
  if (playerThirdCard < 6 && computerScore < 6) {return true};
  if (playerThirdCard < 8 && computerScore < 7) {return true};
  if (playerThirdCard < 9 && computerScore < 3) {return true};
  if (playerThirdCard < 10 && computerScore < 4) {return true};
  return false;
};

const checkforNatural = (playerHand, computerHand) => {
  return readScore(playerHand) > 7 || readScore(computerHand) > 7;
}

let testCardsArray = ['Ace of Hearts', '4 of Clubs']

console.log()

let doobie;

console.log(!doobie);


console.log(`Player Wins`.split(' ')[0].toLowerCase())


//



// side images algorhythm 


const decodingTheScore = (num)=>{
  let total = num;
  let array = [];
  [100,25,5].forEach(e=>{
    while(total-e>=0){
      array.push(e);
      total-=e;
    }
  })
  return array
};

console.log(decodingTheScore(375));