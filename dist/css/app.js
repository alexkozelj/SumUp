// //////// Storage Controller ////////// //



// //////// Item Controller //////// //
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
      // data.items.push(deck);
      return deck;
    },

    logData: function () {
      return data;
    }
  };
})();




// ///////// UI Controller //////// //
const UICtrl = (function () {

  // Public methods
  return {};
})();





// //////// App Controller //////// //
const App = (function (ItemCtrl, UICtrl) {

  // Public methods
  return {
    
    init: function () {
      console.log(ItemCtrl.createDeck());

      // Fetch items from data structure... i need items for stage, comp and player cards
      const items = ItemCtrl.getItems();

      console.log(items);
    }
  };
})(ItemCtrl, UICtrl);

// Initialize App
App.init();
