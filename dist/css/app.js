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
    getItems: function(){
      return data.items;
    },
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
        // this.createDeck();
        // this.deckSchuffle();
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

  // Public methods
  return {};
})();





            // //////// >>>>>> App Controller <<<<<<< //////// //
const App = (function (ItemCtrl, UICtrl) {

  // Public methods
  return {
    
    init: function () {
      // console.log(ItemCtrl.createDeck());

      // Fetch items from data structure... i need items for stage, comp and player cards
      // const items = ItemCtrl.getItems();
      ItemCtrl.createDeck();
      ItemCtrl.deckSchuffle();
      // ItemCtrl.showFullDeck();
      ItemCtrl.dealCardsToPlayers();
      ItemCtrl.dealCardsToTable();
      console.log(ItemCtrl.logData())
    }
  };
})(ItemCtrl, UICtrl);

// Initialize App
App.init();
