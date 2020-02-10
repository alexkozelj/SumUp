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

      /////// >>>>>>>> Checking conditions for successful sum and calculation <<<<<<<<< /////

      // 1. Checking if sum of selected cards is true
      if (sumOfCards === playerCard[0]) {
        calculation = true;
      }

      // 2. If sum doesn't sum up
      else if (sumOfCards !== playerCard[0]) {

        // Variables for calculus with ACE
        let cardsThatPassTest = [];
        let cardsNotPassTest = [];
        let sumOfRanked = 0;

        // 2.1.
        // >>>>>>>>>>>>> If there is ACE in calculation <<<<<<<<<<<<<<<<<< //
        if (aceIsThereSameCard !== 0 || aceIsThereRestCards !== 0) {
          for (let i = 0; i < rankedCards.length; i++) {

            // using -10 because of Ace, if with 11 goes over player card => -10
            let sumOfRankMinus10 = 0;
            sumOfRankMinus10 += sumOfRanked - 10;


            // Case when Ace is 11 and under playerCard and sumOfRanked
            if (rankedCards[i] <= playerCard[0] && sumOfRanked <= playerCard[0]) {

              // Unit test for sum and check if sum of cards equals the player card////////
              if (sumOfRanked !== playerCard[0]) {
                sumOfRanked += rankedCards[i];
                cardsThatPassTest.push(rankedCards[i]);
                console.log(rankedCards[i]);
                console.log(sumOfRanked);

                // If current card sum up more then Player card => -10
                if (sumOfRanked > playerCard[0]) {
                  sumOfRanked += - 10;
                  console.log(sumOfRanked);
                }
              }

              // checking if it adds up & reset to 0
              if (sumOfRanked === playerCard[0]) {
                sumOfRanked = 0;
                console.log(sumOfRanked);
                console.log(rankedCards[i]);
              }
            }


            // Case when first Card in Calc is example> 5, then comes Ace=11 and player card is 8; 
            // 11 > 8, and passes first IF; 
            // 11 is being converted to 1 and added to sumOfRanked;
            // when it hits the player card, then calculus is true
            else {
              let indexOfAce = rankedCards.indexOf(11);
              if (indexOfAce !== -1) {
                rankedCards[indexOfAce] = 1;
              }

              if (sumOfRanked !== playerCard[0]) {
                sumOfRanked += rankedCards[i];
                cardsThatPassTest.push(rankedCards[i]);

                console.log(rankedCards[i]);
                console.log(sumOfRanked);
                console.log(sumOfRankMinus10);

              }
              if (sumOfRanked === playerCard[0] || sumOfRankMinus10 === playerCard[0]) {
                sumOfRanked = 0;
                sumOfRankMinus10 = 0;

                console.log(sumOfRankMinus10);
                console.log(rankedCards[i]);
                console.log(sumOfRanked);
              }
            }
          }
        }


        // 2.2
        // >>>>>> Other calculation <<<<<<
        else {
          for (let i = 0; i < rankedCards.length; i++) {

            // using -10 because of Ace, if with 11 goes over player card => -10
            // let sumOfRankMinus10 = 0;
            // sumOfRankMinus10 += sumOfRanked - 10;


            if (rankedCards[i] <= playerCard[0] && sumOfRanked <= playerCard[0]) {

              // Unit test for sum and check if sum of cards equals the player card////////
              if (sumOfRanked !== playerCard[0]) {
                sumOfRanked += rankedCards[i];

                cardsThatPassTest.push(rankedCards[i]);
                console.log(rankedCards[i]);
                console.log(sumOfRanked);

                // If current card sum up more then Player card => -10
                // if (sumOfRanked > playerCard[0]) {
                //   sumOfRanked += - 10;
                //   console.log(sumOfRanked);
                // }
              } 

              // checking if it adds up & reset to 0
              if (sumOfRanked === playerCard[0]) {
                sumOfRanked = 0;
                console.log(sumOfRanked);
                console.log(rankedCards[i]);
              }
            } else {
              // if rankedCard[i] > playerCard, there's no need to calculate, it will always be false  
              sumOfRanked += rankedCards[i];
            }
          }
        }


        // CONDITION CONTROLLER
        if (sumOfRanked === 0) {
          calculation = true;
        }
        else {

          console.log('joj joj');
          console.log(cardsThatPassTest);
          console.log(cardsNotPassTest);
          console.log(sumOfRanked);
          calculation = false;

        }
      }

      ////// if no card on stage is selected, put the player card on stage /////
      if(sameAsPlayerCardIsThere === false && sumOfCards === 0) {
        UICtrl.throwCardOnTable(cardId, inHandCards)
        UICtrl.populatePlayerCards(inHandCards);
      }

      return [
        calculation,
        sumOfCards,
        sameAsPlayerCard,
        restCards,
        sumOfRestCards,
        rankedCards,
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
      const cardsInCalculation = ItemCtrl.getCardsInCalculation();

      cardsInCalculation.forEach(card => {
        if (`card-${card.ID}` === id) {
          const index = cardsInCalculation.indexOf(card);
          if(index > -1) {
            cardsInCalculation.splice(index, 1);
          }
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
    // stageCardsRankDoubleArray: function () {
    //   const cardsInCalculation = this.getCardsInCalculation();
    //   const stageRankCalc = this.getRank(cardsInCalculation);
    //   return stageRankCalc;
    // },
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
      return data.playerCollectedCards;
    },
    getCompCollectedCards: () => {
      return data.compCollectedCards;
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
      // Grab cards from the table
      let cardsOnTable = ItemCtrl.getCardsOnTable();
      // Add selected player card to table cards, and remove it from inHand
      this.moveCardFromArrayToArray(cardId, inHandCards, cardsOnTable);
      // UI populate array table cards
      this.populateTableCards(cardsOnTable);
      
    },

    moveCardFromArrayToArray: function (cardId, fromArray, toArray) {
      fromArray.forEach(function(card) {
        if(`card-${card.ID}` === cardId){
          // Adding card from cardsInPlayerHand array to table cards
          toArray.push(card);
          // Finding the player card that is selected 
          let index = fromArray.indexOf(card)
          // Removing the selected player card after the card is being pushed
          fromArray.splice(index, 1);
        }
      })
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
      const playerCollectedCards = ItemCtrl.getPlayerCollectedCards();
      const compCollectedCards = ItemCtrl.getCompCollectedCards();
      // const populatePlayerCards = UICtrl.populatePlayerCards(playerInHandCards);


      const playerRankCalc = ItemCtrl.getPlayerCardRank(grabId)[0];
      console.log(playerRankCalc);
      console.log(grabId);
      console.log(playerInHandCards);
      console.log(playerCollectedCards);

      const calculate = ItemCtrl.calculus(grabId, playerInHandCards);
      console.log(calculate);
      if(calculate[0] === true){
        UICtrl.moveCardFromArrayToArray(grabId, playerInHandCards, playerCollectedCards);
      }

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
