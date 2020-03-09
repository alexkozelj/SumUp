// ///////// >>>>>>> UI Controller <<<<<<< //////// //
const UICtrl = (function () {
  const UISelectors = {
    // player points parent
    playerPointsParent: "#playerPointsParent",

    // for setting playerPoints attribute
    playerPointsAttribute: "playerPoints",

    // computer points parent
    compPointsParent: "#compPointsParent",

    // for setting compPoints attribute
    compPointsAttribute: "compPoints",

    // New Game
    newGame: "#newGame",

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

    //////// Result board ///////

    // Overall Info
    compOverallScore: "#compOverallScore",
    playerOverallScore: "#playerOverallScore",
    gameNr: "#numberOfPlayedGames",
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
      // console.log(comp);
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
      // console.log(player);
      // Insert list items
      document.querySelector(UISelectors.playerCards).innerHTML = html;

    },

    showCard: function (compInHandCards, compCard, compCardIndex, tableCards) {

      let parentNode = document.querySelector(UISelectors.compCards);
      parentNode.removeChild(parentNode.childNodes[compCardIndex])

      let html = "";

      compInHandCards.forEach(card => {

        if (card === compCard) {
          html += `<li class=" center card rank-${card.Rank} ${card.Suit}"     id="card-${card.ID}">
              <span class="rank">${card.Rank.toUpperCase()}</span>
              <span class="suit">&${card.Suit};</span>
          </li>`;

        } else {
          html += `<div class="card back" id="card-${card.ID}"></div>`;
        }

      });

      document.querySelector(UISelectors.compCards).innerHTML = html;

      tableCards.forEach(function (card) {
        UICtrl.addSelectedStageCardStyle(`card-${card.ID}`);
      })
    },


    populateTableCards: table => {
      let html = "";

      table.forEach(card => {
        html += `<li class=" center card rank-${card.Rank} ${card.Suit}" id="card-${card.ID}">
            <span class="rank">${card.Rank.toUpperCase()}</span>
            <span class="suit">&${card.Suit};</span>
        </li>`;

      });
      // console.log(table);
      // Insert list items
      document.querySelector(UISelectors.stageCards).innerHTML = html;

    },

    populateDealDeck: deck => {
      let html = "";

      deck.forEach(card => {
        html += `<li class="card back" id="card-${card.ID}"></li>`
      });
      // console.log(deck);
      // Insert list items
      document.querySelector(UISelectors.deckOfCards).innerHTML = html;
    },

    defaultScoreboard: () => {
      // Default overall game scoreboard values
      document.querySelector(UISelectors.compOverallScore).innerHTML = "0";
      document.querySelector(UISelectors.playerOverallScore).innerHTML = "0";
      document.querySelector(UISelectors.gameNr).innerHTML = "1";
      document.querySelector(UISelectors.totalGameNr).innerHTML = "3";

      // Default current game scoreboard values
      document.querySelector(UISelectors.compPoints).innerHTML = "0";
      document.querySelector(UISelectors.compTablaPoints).innerHTML = "";
      document.querySelector(UISelectors.playerPoints).innerHTML = "0";
      document.querySelector(UISelectors.playerTablaPoints).innerHTML = "";
      document.querySelector(UISelectors.dealNr).innerHTML = "1";
    },

    updateOverallScoreBoard: (value, playerOrComp) => {
      if (playerOrComp === "player") {
        const overallPlayerPointsString = document.querySelector(UISelectors.playerOverallScore).innerHTML;
        const overallPlayerPointsInt = parseInt(overallPlayerPointsString);
        const updatedPlayerPointsInt = overallPlayerPointsInt + value;
        const updatedPlayerPointsString = updatedPlayerPointsInt.toString();
        document.querySelector(UISelectors.playerOverallScore).innerHTML = updatedPlayerPointsString;
      }

      if (playerOrComp === "computer") {
        const overallCompPointsString = document.querySelector(UISelectors.compOverallScore).innerHTML;
        const overallCompPointsInt = parseInt(overallCompPointsString);
        const updatedCompPointsInt = overallCompPointsInt + value;
        const updatedCompPointsString = updatedCompPointsInt.toString();
        document.querySelector(UISelectors.compOverallScore).innerHTML = updatedCompPointsString;
      }
    },

    updateCurrentScoreboard: (value, playerOrComp) => {
      if (playerOrComp === "player") {
        const currentPlayerPointsString = document.querySelector(UISelectors.playerPoints).innerHTML;
        const currentPlayerPointsInt = parseInt(currentPlayerPointsString);
        const updatedPlayerPointsInt = currentPlayerPointsInt + value;
        const updatedPlayerPointsString = updatedPlayerPointsInt.toString();
        const span = document.createElement("SPAN");
        span.setAttribute("class", "animated zoomIn faster");
        span.setAttribute("id", `${UISelectors.playerPointsAttribute}`);
        const html = updatedPlayerPointsString;
        span.innerHTML = html;
        
        UICtrl.playerPointUp(value, span);
      }

      if (playerOrComp === "computer") {
        const currentCompPointsString = document.querySelector(UISelectors.compPoints).innerHTML;
        const currentCompPointsInt = parseInt(currentCompPointsString);
        const updatedCompPointsInt = currentCompPointsInt + value;
        const updatedCompPointsString = updatedCompPointsInt.toString();
        const span = document.createElement("SPAN");
        span.setAttribute("class", "animated zoomIn faster");
        span.setAttribute("id", `${UISelectors.compPointsAttribute}`);
        const html = updatedCompPointsString;
        span.innerHTML = html;
        
        UICtrl.compPointUp(value, span);
        

      }
    },

    resetCurrentScoreboard: () => {
      document.querySelector(UISelectors.playerPoints).innerHTML = 0;
      document.querySelector(UISelectors.compPoints).innerHTML = 0;
      document.querySelector(UISelectors.playerTablaPoints).innerHTML = "";
      document.querySelector(UISelectors.compTablaPoints).innerHTML = "";
    },

    updateGameNumber: () => {
      const currentGameNum = document.querySelector(UISelectors.gameNr).innerHTML;
      const currentGameNumInt = parseInt(currentGameNum);

      if (currentGameNumInt < 4) {
        const updatedGameNumInt = currentGameNumInt + 1;
        const updatedGameNumString = updatedGameNumInt.toString();
        document.querySelector(UISelectors.gameNr).innerHTML = updatedGameNumString;
      }
    },

    getCurrentDealNum: () => {
      const currentDealNum = document.querySelector(UISelectors.dealNr).innerHTML;
      const currentDealNumInt = parseInt(currentDealNum);
      return currentDealNumInt;
    },

    updateDealNumber: () => {
      currentDealNumInt = UICtrl.getCurrentDealNum();
      if (currentDealNumInt < 4) {
        const updatedDealNumInt = currentDealNumInt + 1;
        const updatedDealNumString = updatedDealNumInt.toString();
        document.querySelector(UISelectors.dealNr).innerHTML = updatedDealNumString;
      } else {
        const setDealNumTo1 = "1";
        document.querySelector(UISelectors.dealNr).innerHTML = setDealNumTo1;

      }
    },

    endOfGame: function () {
      const cardsOnTable = ItemCtrl.getCardsOnTable();
      const playerCollectedCards = ItemCtrl.getPlayerCollectedCards();
      const compCollectedCards = ItemCtrl.getCompCollectedCards();
      // count all value cards
      const tableValueOfCards = ItemCtrl.countCardValues(cardsOnTable);
      // console.log(tableValueOfCards);
      const lastTook = ItemCtrl.getWhoTookLast();
      // console.log(lastTook); 
      if (lastTook === 1) {
        // player is needed for update current scoreboard function (comp or player update)
        const playerParameter = "player";
        // Update current scoreboard with sum of collected value cards
        UICtrl.updateCurrentScoreboard(tableValueOfCards, playerParameter);
        // remove cards that are collected from table
        ItemCtrl.removeCollectedCardsFromTable();
        // move all cards from calculation to collected cards
        ItemCtrl.moveCardFromArrayToArray(cardsOnTable, playerCollectedCards);
        // update table UI
        UICtrl.populateTableCards(cardsOnTable);
        // who won the game
        setTimeout(function(){
          UICtrl.gameWinner();

        }, 1200)
      } else {
        // player is needed for update current scoreboard function (comp or player update)
        const playerParameter = "computer";
        // Update current scoreboard with sum of collected value cards
        UICtrl.updateCurrentScoreboard(tableValueOfCards, playerParameter);
        // remove cards that are collected from table
        ItemCtrl.removeCollectedCardsFromTable();
        // move all cards from calculation to collected cards
        ItemCtrl.moveCardFromArrayToArray(cardsOnTable, compCollectedCards);
        // update table UI 
        UICtrl.populateTableCards(cardsOnTable);
        // who won the game
        setTimeout(function(){
          UICtrl.gameWinner();

        }, 1200)
      }
    },

    gameWinner: () => {
      // player current game score
      const playerGameScore = document.querySelector(UISelectors.playerPoints).innerHTML;
      const playerGameScoreInt = parseInt(playerGameScore);
      // comp current game score
      const compGameScore = document.querySelector(UISelectors.compPoints).innerHTML;
      const compGameScoreInt = parseInt(compGameScore);

      // player overall game score
      const playerOverallScore = document.querySelector(UISelectors.playerOverallScore).innerHTML;
      const playerOverallScoreInt = parseInt(playerOverallScore);
      // comp overall game score 
      const compOverallScore = document.querySelector(UISelectors.compOverallScore).innerHTML;
      const compOverallScoreInt = parseInt(compOverallScore);


      // declare a winner on a stage
      const stage = document.querySelector(UISelectors.stageCards);
      const compCards = document.querySelector(UISelectors.compCards);
      const playerCards = document.querySelector(UISelectors.playerCards);

      // get collected cards
      const compCollectedCards = ItemCtrl.getCompCollectedCards();
      const playerCollectedCards = ItemCtrl.getPlayerCollectedCards();

      const playerInHandCardsArr = ItemCtrl.getPlayerInHandCardsArr()
      const compInHandCardsArr = ItemCtrl.getCompInHandCardsArr();
      const cardsOnTableArr = ItemCtrl.getCardsOnTableArr();
      const cardsToDealArr = ItemCtrl.getCardsToDealArr();

      // when new game starts, clear all old cards for new ones to be deal
      function clearArrays() {
        compCollectedCards.splice(0, compCollectedCards.length);
        playerCollectedCards.splice(0, playerCollectedCards.length);

      };
      // by dealing, it leaves a old array that needs to be removed
      function clearEmptyArr() {
        cardsOnTableArr.shift();
        cardsToDealArr.shift();
        playerInHandCardsArr.shift();
        compInHandCardsArr.shift();
      };
      // setup for a new game
      function startGameSetup() {
        UICtrl.resetCurrentScoreboard();
        clearArrays();
        clearEmptyArr();

        ItemCtrl.firstDeal();
        stage.style.removeProperty("font-size");

        const playerInHandCards = ItemCtrl.getPlayerInHandCards();
        const compInHandCards = ItemCtrl.getCompInHandCards();
        const cardsOnTable = ItemCtrl.getCardsOnTable();
        const cardsToDeal = ItemCtrl.getCardsToDeal();

        // Populate cards comp, player & table
        UICtrl.populateCompCards(compInHandCards);
        UICtrl.populatePlayerCards(playerInHandCards);
        UICtrl.populateTableCards(cardsOnTable);
        UICtrl.populateDealDeck(cardsToDeal);
      }


      // Animation for comp wins
      function compPoint(id, animation) {
        let html = `<span><h2 class="animated infinite ${animation} center">GAME POINT - COMPUTER !</h2></span>`
        id.innerHTML = html;
      };
      function compWin(id, animation) {
        let html = `<span><h1 class="animated infinite ${animation}">COMPUTER WINS ! ! !</h1></span>`
        id.innerHTML = html;
      };

      // Animation for player wins
      function playerPoint(id, animation) {
        let html = `<span><h1 class="animated infinite ${animation}">GAME POINT - PLAYER !</h1></span>`
        id.innerHTML = html;
      };
      function playerWin(id, animation) {
        let html = `<span><h1 class="animated infinite ${animation}">PLAYER WINS ! ! !</h1></span>`
        id.innerHTML = html;
      };

      // Animation for a draw
      function draw(id, animation) {
        let html = `<span><h1 class="animated infinite ${animation}">GAME DRAW - PLAY AGAIN !</h1></span>`
        id.innerHTML = html;
      };
    
      if (playerGameScoreInt > compGameScoreInt) {
        // if player wins
        const newScore = playerOverallScoreInt + 1;
        const player = "player";
        if (newScore !== 2) {

          playerPoint(stage, "pulse");
          UICtrl.updateOverallScoreBoard(newScore, player);
          UICtrl.updateGameNumber();
          // slow down to show who wins
          setTimeout(function () {
            startGameSetup();
          }, 3600)

        } else {

          playerWin(compCards, "pulse");
          playerWin(playerCards, "pulse");
          playerWin(stage, "heartBeat slower");
          // stage.style.fontSize = "xx-large";
          UICtrl.updateOverallScoreBoard(playerOverallScoreInt, player);
        }

      }
      else if (playerGameScoreInt === compGameScoreInt) {

        draw(stage, "pulse");
        setTimeout(function () {

          startGameSetup();

        }, 3600);

      }
      else {
        // if comp wins
        const newScore = compOverallScoreInt + 1;
        const comp = "computer"
        if (newScore !== 2) {


          compPoint(stage, "pulse");
          setTimeout(function () {
            UICtrl.updateOverallScoreBoard(newScore, comp);
            UICtrl.updateGameNumber();

            startGameSetup();
            // 2800
          }, 3600);

        } else {

          compWin(compCards, "pulse");
          compWin(playerCards, "pulse");
          compWin(stage, "heartBeat slower");
          UICtrl.updateOverallScoreBoard(compOverallScoreInt, comp);
        }
      }

    },

    compPointUp: (value, newResult) => {
      const compPoints = document.querySelector(UISelectors.compPoints).innerHTML;
      const compPointsParent = document.querySelector(UISelectors.compPointsParent);
      const span = document.createElement("SPAN");
      span.setAttribute("class", "animated zoomOutLeft fast");
      // span.setAttribute("id", "pointUp");
      const html = compPoints + "+" + value;
      span.innerHTML = html;
      compPointsParent.removeChild(compPointsParent.childNodes[1]);
      compPointsParent.appendChild(span);
      setTimeout(function(){
        compPointsParent.removeChild(compPointsParent.childNodes[1]);
        compPointsParent.appendChild(newResult);
      },350);
    },

    playerPointUp: (value, newResult) => {
      const playerPoints = document.querySelector(UISelectors.playerPoints).innerHTML;
      const playerPointsParent = document.querySelector(UISelectors.playerPointsParent);
      const span = document.createElement("SPAN");
      span.setAttribute("class", "animated zoomOutLeft fast");
      // span.setAttribute("id", "pointUp");
      const html = playerPoints + "+" + value;
      span.innerHTML = html;
      playerPointsParent.removeChild(playerPointsParent.childNodes[1]);
      playerPointsParent.appendChild(span);
      setTimeout(function(){
        playerPointsParent.removeChild(playerPointsParent.childNodes[1]);
        playerPointsParent.appendChild(newResult);
      },350);
    },

    addEmptyTablePoint: (playerOrComp) => {
      if (playerOrComp === "player") {
        const currentPlayerPointsString = document.querySelector(UISelectors.playerPoints).innerHTML;
        const currentPlayerPointsInt = parseInt(currentPlayerPointsString);
        // It's always 1
        const value = 1;
        const updatedPlayerPointsInt = currentPlayerPointsInt + value;
        const updatedPlayerPointsString = updatedPlayerPointsInt.toString();
        const span = document.createElement("SPAN");
        span.setAttribute("class", "animated zoomIn faster");
        span.setAttribute("id", `${UISelectors.playerPointsAttribute}`);
        const html = updatedPlayerPointsString;
        span.innerHTML = html;

        const currentPlayerTablaPointsString = document.querySelector(UISelectors.playerTablaPoints).innerHTML;
        document.querySelector(UISelectors.playerTablaPoints).innerHTML = currentPlayerTablaPointsString + "|";

        UICtrl.playerPointUp(value, span);
      }
      if (playerOrComp === "computer") {
        const currentCompPointsString = document.querySelector(UISelectors.compPoints).innerHTML;
        const currentCompPointsInt = parseInt(currentCompPointsString);
        const value = 1;
        const updatedCompPointsInt = currentCompPointsInt + value;
        const updatedCompPointsString = updatedCompPointsInt.toString();
        const span = document.createElement("SPAN");
        span.setAttribute("class", "animated zoomIn faster");
        span.setAttribute("id", `${UISelectors.compPointsAttribute}`);
        const html = updatedCompPointsString;
        span.innerHTML = html;
        
        const currentCompTablaPointsString = document.querySelector(UISelectors.compTablaPoints).innerHTML;
        document.querySelector(UISelectors.compTablaPoints).innerHTML = currentCompTablaPointsString + "|";

        UICtrl.compPointUp(value, span);
      }
    },

    throwCardOnTable: function (cardId, inHandCards) {
      // Grab cards from the table
      let cardsOnTable = ItemCtrl.getCardsOnTable();
      // Add selected player card to table cards, and remove it from inHand
      ItemCtrl.moveCardFromArrayToArray(inHandCards, cardsOnTable, cardId);
      // UI populate array table cards
      this.populateTableCards(cardsOnTable);

    },



    addSelectedStageCardStyle: function (id) {
      const selectedCard = document.querySelector(`#${id}`);
      // console.log(selectedCard);
      const styledCard = selectedCard.classList.add('selectedCard');
      return styledCard;
    },

    removeSelectedStageCardStyle: function (id) {
      let selectedCard = document.querySelector(`#${id}`);
      // console.log(selectedCard);
      const styledCard = selectedCard.classList.remove('selectedCard');
      return styledCard;
    },

    getSelectors: () => {
      return UISelectors;
    }
  };
})();