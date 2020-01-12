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

    items: [{ID: 1, Rank: "a", Suit: "spades", Value: 1},
    {ID: 2, Rank: "2", Suit: "spades", Value: 0},
    {ID: 10, Rank: "10", Suit: "spades", Value: 1}
    ],

    fullDeck: [],

    compCollectedCards: [],

    playerCollectedCards: [],

    compInHandCards: [],

    playerInHandCards: [],

    cardsOnTable: [],

    cardsToDeal: [],

    currentItem: null,
    totalValue: 0
  };

  // Public methods
  return {
    createDeck: function () {
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
    deckSchuffle: function(){
      // for 1000 turns
      // switch the values of two random cards
      for (var i = 0; i < 1000; i++)
      {
        var location1 = Math.floor((Math.random() * data.fullDeck[0].length));
        var location2 = Math.floor((Math.random() * data.fullDeck[0].length));
        var tmp = data.fullDeck[0][location1];

        data.fullDeck[0][location1] = data.fullDeck[0][location2];
        data.fullDeck[0][location2] = tmp;
    	}
    },
    dealCardsToPlayers: function(){
        if(data.compInHandCards.length === 0){
        data.compInHandCards.push(data.fullDeck[0].splice(0,6));
          };
        
        if (data.playerInHandCards.length === 0){
          data.playerInHandCards.push(data.fullDeck[0].splice(0,6));
          };
        // console.log(data.fullDeck[0])
    },
    dealCardsToTable: function(){
      data.cardsOnTable.push(data.fullDeck[0].splice(0,4));
    },
    moveRestCardsToDealingDeck: function(from){
      data.cardsToDeal.push(from);
      data.fullDeck = [];
    },
    firstDeal: function(){
      this.createDeck();
      this.deckSchuffle();
      this.dealCardsToPlayers();
      this.dealCardsToTable();
      this.moveRestCardsToDealingDeck(data.fullDeck[0]);
    },
    getPlayerInHandCards: function(){
      return data.playerInHandCards[0];
    },
    getCompInHandCards: function(){
      return data.compInHandCards[0];
    },
    getCardsOnTable: function(){
      return data.cardsOnTable[0];
    },
    getCardsToDeal: function(){
      return data.cardsToDeal[0];
    },
    getPlayerCollectedCards: function(){
      return data.playerCollectedCards[0];
    },
    getCompCollectedCards: function(){
      return data.compCollectedCards[0]
    },
    showFullDeck: function(){
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
    compCard1: "#comp-card-1",
    compCard2: "#comp-card-2",
    compCard3: "#comp-card-3",
    compCard4: "#comp-card-4",
    compCard5: "#comp-card-5",
    compCard6: "#comp-card-6",

    // Player cards
    playerCard1: "#player-card-1",
    playerCard2: "#player-card-2",
    playerCard3: "#player-card-3",
    playerCard4: "#player-card-4",
    playerCard5: "#player-card-5",
    playerCard6: "#player-card-6",

    // Stage cards
    stageCard1: "#stage-card-1",
    stageCard2: "#stage-card-2",
    stageCard3: "#stage-card-3",
    stageCard4: "#stage-card-4",
    stageCard5: "#stage-card-5",
    stageCard6: "#stage-card-6",
    stageCard7: "#stage-card-7",
    stageCard8: "#stage-card-8",
    stageCard9: "#stage-card-9",
    stageCard10: "#stage-card-10",
   
    // Deck of cards on the table
    deckOfCards: ".deck",

    // Result board

    // Overall Info
    compOverallScore: "compOverallScore",
    playerOverallScore: "playerOverallScore",
    GameNr: "numberOfPlayedGames",
    totalGameNr: "numberOfScheduledGames",

    // Current Game Info
    compPoints: "compPoints",
    compTablaPoints: "compTablaPoints",
    playerPoints: "playerPoints",
    playerTablaPoints: "playerTablaPoints",
    dealNr: "dealNr",
  };


  // Public methods
  return {
    populatePlayerCards: function(player){
      player.forEach(function(cards){
        console.log(cards);
      })
    },
    populateCompCards: function(comp){
      comp.forEach(function(cards){
        console.log(cards);
      })
    },
    populateTableCards: function(table){
      table.forEach(function(cards){
        console.log(cards);
      })
    }
  };
})();





            // //////// >>>>>> App Controller <<<<<<< //////// //
const App = (function (ItemCtrl, UICtrl) {

  // Load event listeners
  const loadEventListeners = function() {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();
  }

  // Public methods
  return {
    
    init: function () {
      // 1st Round of Game
      ItemCtrl.firstDeal();

      const playerInHandCards = ItemCtrl.getPlayerInHandCards();
      const compInHandCards = ItemCtrl.getCompInHandCards();
      const cardsOnTable = ItemCtrl.getCardsOnTable();
      const playerCollectedCards = ItemCtrl.getPlayerCollectedCards();
      const compCollectedCards = ItemCtrl.getCompCollectedCards();
      const cardsToDeal = ItemCtrl.getCardsToDeal()


      // Populate card placeholders players & table
      UICtrl.populatePlayerCards(playerInHandCards);
      UICtrl.populateCompCards(compInHandCards);
      UICtrl.populateTableCards(cardsOnTable);

      console.log(ItemCtrl.logData())
    }
  };
})(ItemCtrl, UICtrl);

// Initialize App
App.init();
