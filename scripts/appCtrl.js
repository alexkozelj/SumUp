// //////// >>>>>> App Controller <<<<<<< //////// //
const App = (function (ItemCtrl, UICtrl) {

   // Load event listeners
   const loadEventListeners = () => {
      // Get UI Selectors
      const UISelectors = UICtrl.getSelectors();


      // Stage card selection
      document.querySelector(UISelectors.stageCards).addEventListener('click', selectDeselectStageCard);

      // Player card selection
      document.querySelector(UISelectors.playerCards).addEventListener('click', selectPlayerCard);

      // New Game button
      document.querySelector(UISelectors.newGame).addEventListener('click', startNewGame)
   }

   // Start a new game
   const startNewGame = () => {

      const playerInHandCards = ItemCtrl.getPlayerInHandCards();
      const compInHandCards = ItemCtrl.getCompInHandCards();
      const cardsOnTable = ItemCtrl.getCardsOnTable();
      const cardsToDeal = ItemCtrl.getCardsToDeal();
      const playerCollectedCards = ItemCtrl.getPlayerCollectedCards();
      const compCollectedCards = ItemCtrl.getCompCollectedCards();

      playerInHandCards.splice(0, playerInHandCards.length);
      compInHandCards.splice(0, compInHandCards.length);
      cardsOnTable.splice(0, cardsOnTable.length);
      cardsToDeal.splice(0, cardsToDeal.length);
      compCollectedCards.splice(0, compCollectedCards.length);
      playerCollectedCards.splice(0, playerCollectedCards.length);

      const playerInHandCardsArr = ItemCtrl.getPlayerInHandCardsArr()
      const compInHandCardsArr = ItemCtrl.getCompInHandCardsArr();
      const cardsOnTableArr = ItemCtrl.getCardsOnTableArr();
      const cardsToDealArr = ItemCtrl.getCardsToDealArr();


      playerInHandCardsArr.shift();
      compInHandCardsArr.shift();
      cardsOnTableArr.shift();
      cardsToDealArr.shift();
      compCollectedCards.shift();
      playerCollectedCards.shift();

      ItemCtrl.firstDeal();
      UICtrl.defaultScoreboard();

      const playerInHandCardsNew = ItemCtrl.getPlayerInHandCards();
      const compInHandCardsNew = ItemCtrl.getCompInHandCards();
      const cardsOnTableNew = ItemCtrl.getCardsOnTable();
      const cardsToDealNew = ItemCtrl.getCardsToDeal();

      // Populate cards comp, player & table
      UICtrl.populateCompCards(compInHandCardsNew);
      UICtrl.populatePlayerCards(playerInHandCardsNew);
      UICtrl.populateTableCards(cardsOnTableNew);
      UICtrl.populateDealDeck(cardsToDealNew);

      // preventDefault();
   }

   // Select card on Stage - function
   const selectDeselectStageCard = e => {

      const compInHandCards = ItemCtrl.getCompInHandCards();
      const playerInHandCards = ItemCtrl.getPlayerInHandCards();
      // avoid selecting a card before a computer move
      if (playerInHandCards.length === compInHandCards.length) {
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
            // console.log(grabId);
         }

      }

      e.preventDefault();
   }

   const selectPlayerCard = e => {

      const playerInHandCards = ItemCtrl.getPlayerInHandCards();
      const compInHandCards = ItemCtrl.getCompInHandCards();
      const playerCollectedCards = ItemCtrl.getPlayerCollectedCards();
      const cardsInCalculation = ItemCtrl.getCardsInCalculation();
      const cardsOnTable = ItemCtrl.getCardsOnTable();

      if (playerInHandCards.length === compInHandCards.length) {

         const classList = e.target.classList;

         if (classList.contains('card') ||
            classList.contains('rank') ||
            classList.contains('suit')) {
            if (e.target.parentNode.id === "playerCards") {
               grabId = e.target.id;
            } else {
               grabId = e.target.parentNode.id;
            }
            // determine who took the cards last
            let numOfCollected = playerCollectedCards.length;

            const calculate = ItemCtrl.calculus(grabId, cardsInCalculation, playerInHandCards);
            // console.log(calculate);

            if (calculate[0] === true) {

               // move player card to calculation array
               ItemCtrl.moveCardFromArrayToArray(playerInHandCards, cardsInCalculation, grabId);
               // count all value cards
               const playerValueOfCollected = ItemCtrl.countCardValues(cardsInCalculation);

             
               // get a deal number to check if it's a end of a game
               const dealNr = UICtrl.getCurrentDealNum();
               const cardsToDeal = ItemCtrl.getCardsToDeal();
               // player is needed for update current scoreboard function (comp or player update)
               const playerParameter = "player";
               // remove cards that are collected from table
               ItemCtrl.removeCollectedCardsFromTable();
               // move all cards from calculation to collected cards
               ItemCtrl.moveCardFromArrayToArray(cardsInCalculation, playerCollectedCards);
               
               // determine who took the cards last
               if (numOfCollected !== playerCollectedCards.length) {
                  ItemCtrl.lastTook(1);
                  
                  // Update current scoreboard with sum of collected value cards
                  UICtrl.updateCurrentScoreboard(playerValueOfCollected, playerParameter);
                  setTimeout(() => {
                     
                     // If table has no cards after calc, add point 
                     if (cardsOnTable.length === 0) {
                        UICtrl.addEmptyTablePoint(playerParameter);
                     }
                  }, 350);

               }

               UICtrl.populatePlayerCards(playerInHandCards);
               UICtrl.populateTableCards(cardsOnTable);

               // to slow down compMove, imitates computer Thinking
               setTimeout(function () {
                  ItemCtrl.compMove();
                  // 920
               }, 750);

               // if there are no more cards and it's end of game
               setTimeout(function () {
                  if (playerInHandCards.length === 0 && compInHandCards.length === 0 && cardsToDeal.length === 0 && dealNr === 4) {
                     // UICtrl.updateDealNumber();
                     UICtrl.endOfGame();
                     // computer move
                  };
                  // 1100
               }, 2000);

               // if players have no more cards and it's not end of a game
               // new Deal after the comp complete its move, waits all timeouts to finish
               if (dealNr !== 4) {

                  setTimeout(function () {
                     ItemCtrl.newDeal();
                     console.log("deljenje")
                     // 2450
                  }, 1850);
               }


            }

         }
      }
      e.preventDefault();
   }


   // Public methods
   return {

      init: function () {
         // 1st Round of Game
         ItemCtrl.firstDeal();
         UICtrl.defaultScoreboard();

         const playerInHandCards = ItemCtrl.getPlayerInHandCards();
         const compInHandCards = ItemCtrl.getCompInHandCards();
         const cardsOnTable = ItemCtrl.getCardsOnTable();
         const cardsToDeal = ItemCtrl.getCardsToDeal();

         // Populate cards comp, player & table
         UICtrl.populateCompCards(compInHandCards);
         UICtrl.populatePlayerCards(playerInHandCards);
         UICtrl.populateTableCards(cardsOnTable);
         UICtrl.populateDealDeck(cardsToDeal);

         // console.log(ItemCtrl.logData())

         // Load event listeners
         loadEventListeners();
      }
   };
})(ItemCtrl, UICtrl);

// Initialize App
App.init();
