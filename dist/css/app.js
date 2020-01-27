// //////// >>>>>> Storage Controller <<<<<<< ////////// //



// //////// >>>>>> Item Controller <<<<<< //////// //
const ItemCtrl = (function () {
  // Card Selection Constructor
  const SelectedCard = function (id, rank, suit, value) {
    this.id = id;
    this.rank = rank;
    this.suit = suit;
    this.value = value;
  };

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

    currentItem: null,
    totalValue: 0
  };

  // Public methods
  return {
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
      // console.log(data.fullDeck[0])
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
    addPlayerCardInCalculation: (id) => {
      const cards = ItemCtrl.getPlayerInHandCards();
      const cardsInCalculation = ItemCtrl.getCardsInCalculation();

      cards.forEach(card => {
        if (`card-${card.ID}` === id) {
          cardsInCalculation.push(card);
        }
      })
    },
    removePlayerCardInCalculation: (id) => {
      const cards = ItemCtrl.getPlayerInHandCards();
      const cardsInCalculation = ItemCtrl.getCardsInCalculation();

      cards.forEach(card => {
        if (`card-${card.ID}` === id) {
          cardsInCalculation.pop(card);
        }
      })
    },
    getRank: (arrayOfCards) => {
      let arrayOfRank = [];
      let aceArray = [];
      let rank = "";
      let ace11;
      arrayOfCards.forEach((card) => {
        if (card.Rank === "a") {
          rank = 1;
          ace11 = 11;
          aceArray.push(ace11);
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
        aceArray
      ]
    },
    getPlayerCardRank: function (id) {
      const playerCards = this.getPlayerInHandCards();
      let arr = [];
      playerCards.forEach(card => {
        if(`card-${card.ID}` === id){
          arr.push(card);
          console.log(card)
        }
      })
      return arr;
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

      // const playerCards = ItemCtrl.getPlayerInHandCards();
      const playerCardValue = ItemCtrl.getPlayerCardRank(grabId);
    
      console.log(playerCardValue);
      
      const cardsInCalculation = ItemCtrl.getCardsInCalculation();
      const rank = ItemCtrl.getRank(cardsInCalculation);

      console.log(rank);
    }
    console.log(grabId);


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
