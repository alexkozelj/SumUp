// //////// >>>>>> Storage Controller <<<<<<< ////////// //



// //////// >>>>>> Item Controller <<<<<< //////// //
const ItemCtrl = (function () {

  // Data Structure / State
  const data = {
    suits: ["spades", "diams", "clubs", "hearts"],

    ranks: ["a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"],

    items: [{ ID: 1, Rank: "a", Suit: "spades", Value: 1 },
    { ID: 2, Rank: "2", Suit: "spades", Value: 0 },
    { ID: 10, Rank: "10", Suit: "spades", Value: 1 }
    ],

    fullDeck: [],

    compCollectedCards: [],

    playerCollectedCards: [],

    compInHandCards: [],

    playerInHandCards: [],

    cardsOnTable: [],

    cardsToDeal: [],

    cardsInCalculation: [],

  };

  // Public methods
  return {
    isAceThere: function (array) {
      let isAceThere = array.includes(11);
      let count = 0;
      if(isAceThere === true){
        for(let i = 0; i < array.length; ++i){
            if(array[i] == 11){
              count += 1;
            }
        }
      }
      return count
    },
    calculus: function (cardId, inHandCards) {

      const cardsInCalc = this.getCardsInCalculation();
      // i get selected player card - example - [5]
      const playerCard = this.getPlayerCardRank(cardId)[0];
      // get selected stage cards num in array
      const rankedCards = this.getRank(cardsInCalc)[0];


      // 1.Checking first sum of all selected stage cards
      let sumOfCards = 0;
      // 2.Checking for same cards as selected player card, pushing them, leaving rest cards to check for sum
      let sameAsPlayerCard = [];
      // 2.1. If there is no same card and sum of rest cards is 0 (no card is selected from stage area) returning false
      let sameAsPlayerCardIsThere = false;
      // 3.Rest cards are ready for sum, if sum !== playerCard, splitting to check pairs for sum
      let restCards = [];
      let sumOfRestCards = 0;

      
      // If any condition is === playerCard, calculus is true
      let calculation = false; 

      // If Ace card is there, it will show in variables. It can be putted in same card, when player card is Ace. Other situation is in rest cards, when player is taking with other then Ace
      let aceIsThereSameCard = 0;
      let aceIsThereRestCards = 0;

      // Takeing all the cards in calc and converting to nums or array elements to fill up let variables
      for (let i = 0; i < rankedCards.length; i++) {
        
        // If player card is same as card in calculation / not same
        if (rankedCards[i] === playerCard[0]) {
          let sameCard = rankedCards[i];
          sameAsPlayerCard.push(sameCard);
          sameAsPlayerCardIsThere = true;
          aceIsThereSameCard = this.isAceThere(sameAsPlayerCard);
        } else {
          let restCard = rankedCards[i];
          sumOfRestCards += restCard;
          restCards.push(restCard);
          aceIsThereRestCards = this.isAceThere(restCards);
        }
        sumOfCards += rankedCards[i];
      }
      
      /////// Checking conditions for successful sum and calculation/////

      // 1. Checking if sum of selected cards is true
      if (sumOfCards === playerCard[0]) {
        calculation = true;
      }
      // 2. If rest cards match up player card, calculus is true 
      else if (sumOfRestCards === playerCard[0]) {
        calculation = true;
      } 
      // 3. example> playerCard = J(12), selectedCard = J & J & 4(or whatever), returning false or if there is an 8 too, then true
      else if (sameAsPlayerCardIsThere === true && (sumOfRestCards === playerCard[0] || sumOfRestCards === 0)) {
        calculation = true;
      } 
      // 4. Check if Ace is there. When is, then try sum the Ace with value of one. If there is more then one Ace, make combination of mixed values
      else if(aceIsThereRestCards !== 0 || aceIsThereSameCard !==0){
        let sumAce1 = aceIsThereSameCard + sumOfRestCards + (aceIsThereRestCards*(-10))
        if(sumAce1 === playerCard[0]){
          calculation = true;
        }
      }
      // 5. example> playerCard = 11, selectedCards are 5+6 & 3+11 || 2+4+5 etc. === 11
      else if(sumOfRestCards !== playerCard[0]) {
        let firstPair = 0;
        let secondPair = 0;
        // sum up until hits the players card, then proceeds to second pair
        for(let y = 0; y < restCards.length; y++) {
          if(firstPair !== playerCard[0]){
            firstPair += restCards[y];
          } else {
            let whereItStopped = y;
            for(let x = whereItStopped; x < restCards.length; x++){
              if(secondPair !== playerCard[0]){
                secondPair += restCards[x]

              } else {
                // check if there is no more rest cards = the last card has summed up to value of second pair
                if(x === restCards.length){
                  calculation = true;
                } else {
                  calculation = false;
                }
              }
            }
          }
        }
      } 
      
      else {
        calculation = false;
      }

      ////// if no card on stage is selected, put the player card on stage /////
      if(sameAsPlayerCardIsThere === false && sumOfCards === 0) {
        UICtrl.throwCardOnTable(cardId, inHandCards)
      }

      return [
        sumOfCards,
        sameAsPlayerCard,
        restCards,
        sumOfRestCards,
        rankedCards,
        calculation,
        aceIsThereSameCard,
        aceIsThereRestCards
      ]
    },
    createDeck: () => {
      let deck = [];
      let id = 0;

      for (let i = 0; i < data.suits.length; i++) {
        for (let x = 0; x < data.ranks.length; x++) {
          if (
            data.ranks[x] === "a" ||
            data.ranks[x] === "j" ||
            data.ranks[x] === "q" ||
            data.ranks[x] === "k"
          ) {
            value = 1;
          } else if (data.ranks[x] === "2" && data.suits[i] === "clubs") {
            value = 1;
          } else if (data.ranks[x] === "10") {
            if (data.suits[i] === "diams") {
              value = 2;
            } else {
              value = 1;
            }
          } else {
            value = 0;
          }
          id += 1;
          let card = {
            ID: id,
            Rank: data.ranks[x],
            Suit: data.suits[i],
            Value: value
          };

          deck.push(card);
        }
      }
      data.fullDeck.push(deck);
      return deck;
    },
    deckShuffle: () => {
      // for 1000 turns
      // switch the values of two random cards
      for (var i = 0; i < 1000; i++) {
        var location1 = Math.floor((Math.random() * data.fullDeck[0].length));
        var location2 = Math.floor((Math.random() * data.fullDeck[0].length));
        var tmp = data.fullDeck[0][location1];

        data.fullDeck[0][location1] = data.fullDeck[0][location2];
        data.fullDeck[0][location2] = tmp;
      }
    },
    dealCardsToPlayers: () => {
      if (data.compInHandCards.length === 0) {
        data.compInHandCards.push(data.fullDeck[0].splice(0, 6));
      };

      if (data.playerInHandCards.length === 0) {
        data.playerInHandCards.push(data.fullDeck[0].splice(0, 6));
      };
    },
    dealCardsToTable: () => {
      data.cardsOnTable.push(data.fullDeck[0].splice(0, 4));
    },
    moveRestCardsToDealingDeck: (from) => {
      data.cardsToDeal.push(from);
      data.fullDeck = [];
    },
    firstDeal: function () {
      this.createDeck();
      this.deckShuffle();
      this.dealCardsToPlayers();
      this.dealCardsToTable();
      this.moveRestCardsToDealingDeck(data.fullDeck[0]);
    },
    addStageCardInCalculation: (id) => {
      const cards = ItemCtrl.getCardsOnTable();
      const cardsInCalculation = ItemCtrl.getCardsInCalculation();

      cards.forEach(card => {
        if (`card-${card.ID}` === id) {
          cardsInCalculation.push(card);
        }
      })
    },
    removeStageCardInCalculation: (id) => {
      const cards = ItemCtrl.getCardsOnTable();
      const cardsInCalculation = ItemCtrl.getCardsInCalculation();

      cards.forEach(card => {
        if (`card-${card.ID}` === id) {
          cardsInCalculation.pop(card);
        }
      })
    },
    getRank: (arrayOfCards) => {
      let arrayOfRank = [];
      // let aceArray = [];
      let rank = "";
      // let ace1;
      arrayOfCards.forEach((card) => {
        if (card.Rank === "a") {
          rank = 11;
          // ace1 = 1;
          // aceArray.push(ace1);
        } else if (card.Rank === "j") {
          rank = 12;
        } else if (card.Rank === "q") {
          rank = 13;
        } else if (card.Rank === "k") {
          rank = 14;
        } else {
          rank = parseFloat(card.Rank);
        }

        arrayOfRank.push(rank);
      });

      return [
        arrayOfRank,
        // aceArray
      ]
    },
    getPlayerCardRank: function (id) {
      const playerCards = this.getPlayerInHandCards();
      let rank
      playerCards.forEach(card => {
        if (`card-${card.ID}` === id) {
          rank = [card];
        }
      })
      let getRank = this.getRank(rank);
      return getRank;
    },
    sumUp: function (stageCards) {
      const sum = stageCards[0];
      function getSum(total, num) {
        return total + num;
      }
      const sumedUp = sum.reduce(getSum, 0);
      return sumedUp;
    },
    stageCardsRankDoubleArray: function () {
      const cardsInCalculation = this.getCardsInCalculation();
      const stageRankCalc = this.getRank(cardsInCalculation);
      return stageRankCalc;
    },
    getPlayerInHandCards: () => {
      return data.playerInHandCards[0];
    },
    getCompInHandCards: () => {
      return data.compInHandCards[0];
    },
    getCardsOnTable: () => {
      return data.cardsOnTable[0];
    },
    getCardsToDeal: () => {
      return data.cardsToDeal[0];
    },
    getPlayerCollectedCards: () => {
      return data.playerCollectedCards[0];
    },
    getCompCollectedCards: () => {
      return data.compCollectedCards[0]
    },
    getCardsInCalculation: () => {
      return data.cardsInCalculation;
    },
    showFullDeck: () => {
      console.log(data.fullDeck[0]);
    },
    logData: function () {
      return data;
    }
  };
})();




// ///////// >>>>>>> UI Controller <<<<<<< //////// //
const UICtrl = (function () {
  const UISelectors = {
    // Comp cards
    compCards: "#compCards",

    // Player cards
    playerCards: "#playerCards",


    // Stage cards
    stageCards: "#stageCards",

    // Class from selected card in stage
    selectedCard: ".selectedCard",

    // Deck of cards on the table
    deckOfCards: ".deck",

    // Result board

    // Overall Info
    compOverallScore: "#compOverallScore",
    playerOverallScore: "#playerOverallScore",
    GameNr: "#numberOfPlayedGames",
    totalGameNr: "#numberOfScheduledGames",

    // Current Game Info
    compPoints: "#compPoints",
    compTablaPoints: "#compTablaPoints",
    playerPoints: "#playerPoints",
    playerTablaPoints: "#playerTablaPoints",
    dealNr: "#dealNr",
  };


  // Public methods
  return {
    populateCompCards: comp => {
      let html = "";
      console.log(comp);
      comp.forEach(card => {

        html += `<div class="card back" id="card-${card.ID}"></div>`

      });

      // Insert list items
      document.querySelector(UISelectors.compCards).innerHTML = html;

    },

    populatePlayerCards: player => {
      let html = "";

      player.forEach(card => {
        html += `<li class=" center card rank-${card.Rank} ${card.Suit}" id="card-${card.ID}">
            <span class="rank">${card.Rank.toUpperCase()}</span>
            <span class="suit">&${card.Suit};</span>
        </li>`;

      });
      console.log(player);
      // Insert list items
      document.querySelector(UISelectors.playerCards).innerHTML = html;

    },

    populateTableCards: table => {
      let html = "";

      table.forEach(card => {
        html += `<li class=" center card rank-${card.Rank} ${card.Suit}" id="card-${card.ID}">
            <span class="rank">${card.Rank.toUpperCase()}</span>
            <span class="suit">&${card.Suit};</span>
        </li>`;

      });
      console.log(table);
      // Insert list items
      document.querySelector(UISelectors.stageCards).innerHTML = html;

    },

    populateDealDeck: deck => {
      let html = "";

      deck.forEach(card => {
        html += `<li class="card back" id="card-${card.ID}"></li>`
      });
      console.log(deck);
      // Insert list items
      document.querySelector(UISelectors.deckOfCards).innerHTML = html;
    },

    throwCardOnTable: function (cardId, inHandCards) {
      let cardsOnTable = ItemCtrl.getCardsOnTable();

      inHandCards.forEach(function(card) {
        if(`card-${card.ID}` === cardId){
          // Adding card from cardsInPlayerHand array to table cards
          cardsOnTable.push(card);
          // Finding the player card that is selected 
          let index = inHandCards.indexOf(card)
          // Removing the selected player card after the card is being pushed
          inHandCards.splice(index, 1);

        }
      })

      this.populateTableCards(cardsOnTable);
      this.populatePlayerCards(inHandCards);
      
    },

    addSelectedStageCardStyle: function (id) {
      const selectedCard = document.querySelector(`#${id}`);
      console.log(selectedCard);
      const styledCard = selectedCard.classList.add('selectedCard');
      return styledCard;
    },

    removeSelectedStageCardStyle: function (id) {
      let selectedCard = document.querySelector(`#${id}`);
      console.log(selectedCard);
      const styledCard = selectedCard.classList.remove('selectedCard');
      return styledCard;
    },

    getSelectors: () => {
      return UISelectors;
    }
  };
})();





// //////// >>>>>> App Controller <<<<<<< //////// //
const App = (function (ItemCtrl, UICtrl) {

  // Load event listeners
  const loadEventListeners = () => {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();


    // Stage card selecton
    document.querySelector(UISelectors.stageCards).addEventListener('click', selectDeselectStageCard);

    // Player card selection
    document.querySelector(UISelectors.playerCards).addEventListener('click', selectPlayerCard);
  }


  // Select card on Stage - function
  const selectDeselectStageCard = e => {
    const classList = e.target.classList;

    if (classList.contains('card') ||
      classList.contains('rank') ||
      classList.contains('suit')) {
      if (e.target.parentNode.id === "stageCards") {
        grabId = e.target.id;
      } else {
        grabId = e.target.parentNode.id;
      }

      if (classList.contains('selectedCard') || e.target.parentNode.classList.contains('selectedCard')) {
        UICtrl.removeSelectedStageCardStyle(grabId);
        ItemCtrl.removeStageCardInCalculation(grabId);
      } else {
        UICtrl.addSelectedStageCardStyle(grabId);
        ItemCtrl.addStageCardInCalculation(grabId);
      }

      console.log(grabId);
    }

    console.log(ItemCtrl.logData());

    e.preventDefault();
  }

  const selectPlayerCard = e => {
    const classList = e.target.classList;

    if (classList.contains('card') ||
      classList.contains('rank') ||
      classList.contains('suit')) {
      if (e.target.parentNode.id === "playerCards") {
        grabId = e.target.id;
      } else {
        grabId = e.target.parentNode.id;
      }
      
      const playerInHandCards = ItemCtrl.getPlayerInHandCards();
      const compInHandCards = ItemCtrl.getCompInHandCards();


      const playerRankCalc = ItemCtrl.getPlayerCardRank(grabId)[0];
      console.log(playerRankCalc);

      const calculate = ItemCtrl.calculus(grabId, playerInHandCards);
      console.log(calculate);

    }
    // console.log(grabId);


    console.log(ItemCtrl.logData());

    e.preventDefault();
  }

  // Public methods
  return {

    init: function () {
      // 1st Round of Game
      ItemCtrl.firstDeal();

      const playerInHandCards = ItemCtrl.getPlayerInHandCards();
      const compInHandCards = ItemCtrl.getCompInHandCards();
      const cardsOnTable = ItemCtrl.getCardsOnTable();
      const cardsToDeal = ItemCtrl.getCardsToDeal();
      // const playerCollectedCards = ItemCtrl.getPlayerCollectedCards();
      // const compCollectedCards = ItemCtrl.getCompCollectedCards();


      // Populate cards comp, player & table
      UICtrl.populateCompCards(compInHandCards);
      UICtrl.populatePlayerCards(playerInHandCards);
      UICtrl.populateTableCards(cardsOnTable);
      UICtrl.populateDealDeck(cardsToDeal);

      console.log(ItemCtrl.logData())
      // console.log(compInHandCards);

      // Load event listeners
      loadEventListeners();
    }
  };
})(ItemCtrl, UICtrl);

// Initialize App
App.init();
