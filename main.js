
import Player from "./classes/Player.js";
import Shoe from "./classes/Shoe.js";
import Hand from "./classes/Hand.js";


/*
----------- MAIN GAME CONTENT
*/

const start = document.getElementById('start');
const openingScreen = document.getElementById('opening-screen');
const mainGame = document.querySelector('main');
const dealButton = document.getElementById('deal-button');
const shoeDisplay = document.getElementById('shoe');
const previousWinners = document.getElementById('previous-hands');
const outOfMoney = document.getElementById('out-of-money');
const playAgainButton = document.getElementById('retry');

const results = Array.from(document.querySelectorAll('.results > div'));
const boards = Array.from(document.querySelectorAll('.boards > div'));
const scores = Array.from(document.querySelectorAll('.scores > div'));
const playerArea = Array.from(document.querySelectorAll('.player-area > div'));
const chipsArea = Array.from(document.querySelectorAll('.chips-area > i'));
console.log(chipsArea);
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
    if (nextHand.style.display === 'block') {
      return unSelectAll();
    } else {
      unSelectAll();
      e.classList.add('selected')
    }
  })
});

boardBets.forEach(e=>{
  e.addEventListener('click', () => {
    placeChip(e.id);
  })
});

playAgainButton.addEventListener('click', ()=>{
  retryGame();
});






//


const startGame = (playerName, deckSize) => {
  openingScreen.style.display = 'none';
  mainGame.style.display = 'flex';
  player = new Player(playerName, 1000);
  console.log('hi')
  shoe = new Shoe(deckSize);
  shoe.dealADeck();
  shoe.createShoe();
  console.log(shoe);
  updatePlayerArea();
  shoeDisplay.innerHTML = `Cards left:${shoe.shoe.length}`;
  hand = new Hand();
}

const placeChip = (id) => {
  id = `${id.split('-')[0]}Bet`;
  let val = Number(chipsArea.find(e=>e.classList.contains('selected')).firstElementChild.alt);
  console.log(val)
  if (player.bankroll > 0) {
    hand[id] += val;
    player.bankroll -= val;
    showDealButton();
    updatePlayerArea();
    updateBets();
  } else {
    noMoneyAlert();
  }
}

const createHands= () => {
  let dealtToPlayer = [];
  let dealToComputer = [];
  for (let i=0;i<2;i++){
    dealtToPlayer.push(shoe.dealACard());
    dealToComputer.push(shoe.dealACard());
  }
  hand.playerHand = dealtToPlayer;
  hand.computerHand = dealToComputer;
};

const dealHand = () => {
  unSelectAll();
  hideDealButton();
  createHands();
  updateBoard();
  updateScores();
  if (hand.natural) {
    results[0].innerHTML = 'Natural'
    return handResult()
  }
  return setTimeout(dealThirdCard, 1000);
}

const unSelectAll = () => {
  chipsArea.forEach(e=>{e.classList.remove('selected')})
};

const showDealButton = () => {
  dealButton.style.display = 'block';
};

const showNextHandButton = () => {
  nextHand.style.display = 'block';
};

const hideDealButton = () => {
  dealButton.style.display = 'none';
};

const hideNextHandButton = () => {
  nextHand.style.display = 'none';
};

const updateBets =  () => {
  // boardBets[0].innerHTML = hand.playerBet;
  // boardBets[1].innerHTML = hand.bankerBet;
  // boardBets[2].innerHTML = hand.tieBet;
  boardBets[0].innerHTML = hand.playerBet + `<br>` + hand.addChipsImages(hand.playerBet);
  boardBets[1].innerHTML = hand.bankerBet + `<br>` + hand.addChipsImages(hand.bankerBet);
  boardBets[2].innerHTML = hand.tieBet + `<br>` + hand.addChipsImages(hand.tieBet);
};

const updateBoard = () => {
  boards[0].innerHTML = hand.toPictureFormatPlayer // (hand.playerHand);
  boards[1].innerHTML = hand.toPictureFormatComputer // (hand.computerHand);
  shoeDisplay.innerHTML = `Cards left:${shoe.shoe.length}`;
  previousWinners.innerHTML = shoe.winnerLog
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

const giveGoldHeartbeat = (constant) => {
  constant.classList.add('heartbeat');
  setTimeout(()=>{
  constant.classList.remove('heartbeat');
  }, 2000)
};

const giveShadowDrop = (id) => {
  document.getElementById(id).classList.add('shadow-drop-2-bottom');
  setTimeout(()=>{
    document.getElementById(id).classList.remove('shadow-drop-2-bottom');
    }, 2000)
}

const transferMoneyToWinner = () => {
  boardBets.forEach(e=>{
    let val = Number(e.innerHTML.split('<')[0]);
    if (val) {
      player.bankroll += val;
      e.innerHTML = '0';
    }
  })
  updatePlayerArea();
  giveGoldHeartbeat(playerArea[2]);
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
  console.log(hand.winner);
  let winnerArea = `${hand.winner.split(' ')[0].toLowerCase()}-bet`
  console.log(winnerArea);
  giveShadowDrop(winnerArea);
  hand.payoutBets();
  setTimeout(transferMoneyToWinner, 2000);
  updatePlayerArea();
  updateResults();
  updateBets();
  if (player.bankroll === 0) {
    return outOfMoneyScreen();
  } else {
    showNextHandButton();
    updateBoard();
  }
};

const clearBoard = () => {
  scores.forEach(e=>e.innerHTML='');
  boards.forEach(e=>e.innerHTML='');
  results.forEach(e=>e.innerHTML='');
  hideDealButton();
  hideNextHandButton();
  updatePlayerArea();
  updateBets();
  updateBoard();
};

const resetForNextHand = () => {
  let forLog = hand.winner[0];
  shoe.winnerLog += ` ${forLog[0]}`;
  hand = new Hand;
  console.log(player, hand, shoe);
  clearBoard();
};

const outOfMoneyScreen = () => {
  outOfMoney.style.display = 'flex';
  mainGame.style.display = 'none';
}

const retryGame = () => {
  outOfMoney.style.display = 'none';
  resetForNextHand();
  openingScreen.style.display = 'flex';
};