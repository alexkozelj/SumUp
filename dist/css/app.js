// //////// Storage Controller ////////// //

// //////// Item Controller //////// //
const ItemCtrl = (function() {

  // Card Selection Constructor
  const SelectedCard = function(id, rank, suit, value) {
    this.id = id;
    this.rank = rank;
    this.suit = suit;
    this.value = value;
  };

  
  // Data Structure / State
  const data = {

    suits: ["spades", "diams", "clubs", "hearts"],

    ranks: ["a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"],

    items: [
      {id: 0, rank: '7', suit: 'hearts', value: 0},
      {id: 5, rank: '10', suit: 'diams', value: 2},
      {id: 8, rank: 'J', suit: 'spades', value: 1}
    ],
    currentItem: null,
    totalValue: 0
  }

  // Public methods
  return {

    getDeck: function() {
      let deck = [];

      for(let i = 0; i < data.suits.length; i++)
      {
        for(let x = 0; x < data.ranks.length; x++)
        {
          let card = {Rank: data.ranks[x], Suit: data.suits[i]};
          deck.push(card);
        }
      }

      return deck;
    },

    logData: function(){
      return data;
    }
  }

})();

// ///////// UI Controller //////// //
const UICtrl = (function() {

  // Public methods
  return {

  }

})();

// //////// App Controller //////// //
const App = (function(ItemCtrl, UICtrl) {
  
  // Public methods
  return {
    init: function() {
      console.log(ItemCtrl.getDeck());
      
      
    }
  }
  
})(ItemCtrl, UICtrl);


// Initialize App
App.init();