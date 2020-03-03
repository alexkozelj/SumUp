// //////// >>>>>> Storage Controller <<<<<<< ////////// //



// //////// >>>>>> Item Controller <<<<<< //////// //
const ItemCtrl = (function () {

  // Data Structure / State
  const data = {
    suits: ["spades", "diams", "clubs", "hearts"],

    ranks: ["a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"],

    // items: [{ ID: 1, Rank: "a", Suit: "spades", Value: 1 },
    // { ID: 2, Rank: "2", Suit: "spades", Value: 0 },
    // { ID: 10, Rank: "10", Suit: "spades", Value: 1 }
    // ],


    fullDeck: [],

    compCollectedCards: [],

    playerCollectedCards: [],

    compInHandCards: [],

    playerInHandCards: [],

    cardsOnTable: [],

    cardsToDeal: [],

    cardsInCalculation: [],

    whoTookTheLast: 0

  };

  // Public methods
  return {
    isAceThere: function (array) {
      let isAceThere = array.includes(11);
      let count = 0;
      if (isAceThere === true) {
        for (let i = 0; i < array.length; ++i) {
          if (array[i] == 11) {
            count += 1;
          }
        }
      }
      return count
    },
    calculus: function (cardId, cardsForCalc, inHandCards) {

      // const cardsInCalc = this.getCardsInCalculation();
      // i get selected player card - example - [5]
      const playerCard = this.getPlayerCardRank(cardId)[0];
      // get selected stage cards num in array
      const rankedCards = this.getRank(cardsForCalc)[0];


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

        // If player card is same as card in calculation / else part is for not a same card
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
        // >>>>>>>>>>>>> If there is ACE calculation <<<<<<<<<<<<<<<<<< //
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
                // cardsThatPassTest.push(rankedCards[i]);
                console.log(rankedCards[i]);
                console.log(sumOfRanked);

                // If current card sum up more then Player card => -10
                if (sumOfRanked > playerCard[0]) {
                  sumOfRanked += - 10;
                  cardsThatPassTest.push(rankedCards[i]);
                  console.log(sumOfRanked);
                }
              }

              // checking if it adds up & reset to 0
              if (sumOfRanked === playerCard[0]) {
                sumOfRanked = 0;
                cardsThatPassTest.push(rankedCards[i]);
                console.log(sumOfRanked);
                console.log(rankedCards[i]);
              }
            }

            // it proceeds to next part of code down, while even with -10, it doesn't add up to sumOfRanked
            // Case when first Card in Calc is example> 5, then comes Ace=11 and player card is 8; 
            // 11+5 > 8, and passes first IF; 
            // 11 is being converted to 1 and added to sumOfRanked;
            // when it hits the player card, then calculus is true
            // if not, then proceeds to down part of code
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
            cardsNotPassTest.push(rankedCards[i]);
          }
        }


        // 2.2
        //// >>>>>> For other cards calculation <<<<<< ////
        else {
          for (let i = 0; i < rankedCards.length; i++) {


            if (rankedCards[i] <= playerCard[0] && sumOfRanked <= playerCard[0]) {

              // Unit test for sum and check if sum of cards equals the player card////////
              if (sumOfRanked !== playerCard[0]) {
                sumOfRanked += rankedCards[i];

                cardsThatPassTest.push(rankedCards[i]);
                console.log(rankedCards[i]);
                console.log(sumOfRanked);

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
              cardsNotPassTest.push(rankedCards[i]);
            }
          }
        }


        // CONDITION CONTROLLER
        if (sumOfRanked === 0) {
          calculation = true;

          console.log('joj joj');
          console.log(cardsThatPassTest);
          console.log(cardsNotPassTest);
          console.log(sumOfRanked);
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
      if (sameAsPlayerCardIsThere === false && sumOfCards === 0) {
        UICtrl.throwCardOnTable(cardId, inHandCards)
        UICtrl.populatePlayerCards(inHandCards);

        // here I need to put computer move
      }

      return [
        calculation,
        sumOfCards,
        sameAsPlayerCard,
        restCards,
        sumOfRestCards,
        rankedCards,
        aceIsThereSameCard,
        aceIsThereRestCards,
      ]
    },

    lastTook: function (x) {
      if (x === 1) {
        data.whoTookTheLast = 1;
        console.log('trla baba lan')
      } else {
        data.whoTookTheLast = 0;
      }
    },

    compMove: function () {
      const compCards = this.getCompInHandCards();
      const tableCards = this.getCardsOnTable();
      // const playerCards = this.getPlayerInHandCards();

      // if(compCards.length === 0 && playerInHandCards.length === 0){
      //   this.
      // }

      // Storing potential combinations that can be taken from a computer player
      let takeCombinations = [];

      // Comp in hand cards
      let compInHandCards = data.compInHandCards[0];

      // Player in hand cards
      // let playerInHandCards = data.playerInHandCards[0];


      // loop through COMPUTER CARDS to compare them with table cards
      for (let i = 0; i < compCards.length; i++) {
        // convert current card to a [{}]
        let arrayOfCompCard = [compCards[i]];
        // convert current card to a number
        let compCardRank = this.getRank(arrayOfCompCard)[0][0];
        console.log(compCardRank);

        // loop through FIRST potential table card to be taken - check if there is same cards as comp card 
        for (let x = 0; x < tableCards.length; x++) {
          let arrayOfTableCard = [tableCards[x]];
          let tableCardX = this.getRank(arrayOfTableCard)[0][0];
          console.log(tableCardX);

          // SAME CARD is found and pushed
          if (compCardRank === tableCardX) {
            let valueOfCombi = compCards[i].Value + tableCards[x].Value;
            takeCombinations.push([valueOfCombi, compCards[i], tableCards[x]]);

            // If there is ANOTHER SAME CARD
            for (let same = 0; same < tableCards.length; same++) {
              let arrayOfTableCardsSame = [tableCards[same]];
              let tableCardXSame = this.getRank(arrayOfTableCardsSame)[0][0];
              console.log(tableCardX);
              if (tableCards[x] === tableCards[same]) {
                continue;
              }
              if (compCardRank === tableCardXSame) {
                let valueOfCombi = compCards[i].Value + tableCards[x].Value + tableCards[same].Value;
                takeCombinations.push([valueOfCombi, compCards[i], tableCards[x], tableCards[same]]);
              }
            }


            // checking if there is situation: i = x & y + z
            for (let y = 0; y < tableCards.length; y++) {
              let arrayOfTableCardY = [tableCards[y]];
              let tableCardY = this.getRank(arrayOfTableCardY)[0][0];
              // avoiding takeing same card in a loop
              if (tableCards[x] === tableCards[y]) {
                continue;
              }
              // if there is a ACE
              if (compCardRank < tableCardY && tableCardY === 11) {
                tableCardY = 1;
              }
              // if current comp card (that has a rank sibling on a table) is greater then 2nd card i = x & Y + z
              if (compCardRank > tableCardY) {
                // when comp card is greater, look for next one 
                for (let z = 0; z < tableCards.length; z++) {
                  let arrayOfTableCardZ = [tableCards[z]];
                  let tableCardZ = this.getRank(arrayOfTableCardZ)[0][0];
                  // avoiding takeing same card in a loop
                  if (tableCards[x] === tableCards[z] || tableCards[y] === tableCards[z]) {
                    continue;
                  }
                  // if there is a ACE
                  if (compCardRank - tableCardY !== tableCardZ && tableCardZ === 11) {
                    tableCardZ = 1;
                  }
                  // check if THIRD card passes
                  if (compCardRank - tableCardY === tableCardZ) {

                    let valueOfCombi = compCards[i].Value + tableCards[x].Value + tableCards[y].Value + tableCards[z].Value;
                    let allThreeCards = [valueOfCombi, compCards[i], tableCards[x], tableCards[y], tableCards[z]];

                    takeCombinations.push(allThreeCards);
                  }
                }
              }
            }
            console.log("sta cuva deda Raca");
          }

          // Situation when it is not a same card and check if there is a PAIR that sums to comp card
          if (compCardRank !== tableCardX && tableCardX < compCardRank) {
            for (let y = 0; y < tableCards.length; y++) {
              let arrayOfTableCardY = [tableCards[y]];
              let tableCardY = this.getRank(arrayOfTableCardY)[0][0];

              // avoiding takeing same card in a loop
              if (tableCards[x] === tableCards[y]) {
                continue;
              }

              // if there is ACE
              if (compCardRank - tableCardX !== tableCardY && tableCardY === 11) {
                tableCardY = 1;
              }

              // found a PAIR and pushed
              if (compCardRank - tableCardX === tableCardY) {

                let valueOfCombi = compCards[i].Value + tableCards[x].Value + tableCards[y].Value;
                let allTwoCards = [valueOfCombi, compCards[i], tableCards[x], tableCards[y]];
                takeCombinations.push(allTwoCards);

              }

              // check if a + b + c = compCard
              if (compCardRank - tableCardX !== tableCardY && tableCardX + tableCardY < compCardRank) {
                for (let q = 0; q < tableCards.length; q++) {
                  let arrayOfTableCardQ = [tableCards[q]];
                  let tableCardQ = this.getRank(arrayOfTableCardQ)[0][0];

                  //  avoiding takeing same card in a loop
                  if (tableCards[x] === tableCards[q] || tableCards[y] === tableCards[q]) {
                    continue;
                  }

                  // if there is ACE
                  if (compCardRank - tableCardX - tableCardY !== tableCardQ && tableCardQ === 11) {
                    tableCardQ = 1;
                  }

                  // if there are 2 of ACE
                  if (compCardRank - tableCardX - tableCardY !== tableCardQ && tableCardQ === 11 && tableCardY === 11) {
                    tableCardQ = 1;
                    tableCardY = 1;
                  }

                  // if a + b + c = compCard is found
                  if (compCardRank - tableCardX - tableCardY === tableCardQ) {

                    let valueOfCombi = compCards[i].Value + tableCards[x].Value + tableCards[y].Value + tableCards[q].Value;
                    let allThreeSumCards = [valueOfCombi, compCards[i], tableCards[x], tableCards[y], tableCards[q]];
                    takeCombinations.push(allThreeSumCards);

                  }
                }

              }


            }
          }

        }
      }

      // THROW A CARD
      // if there are no combinations to take, THROW a smallest CARD
      if (takeCombinations.length === 0) {

        let compCardsRank = ItemCtrl.getRank(compInHandCards)[0];
        console.log(compCardsRank);

        // function to return the index of a smallest comp in hand card
        function indexOfSmallest(a) {
          let lowest = 0;
          for (let i = 1; i < a.length; i++) {
            if (a[i] < a[lowest]) {
              lowest = i;
            }
          }
          return lowest;
        }

        indexSmall = indexOfSmallest(compCardsRank);

        let smallestCardId = `card-${compInHandCards[indexSmall].ID}`
        let cardsOnTable = data.cardsOnTable[0];

        UICtrl.throwCardOnTable(smallestCardId, compInHandCards);

        const playerInHandCardsArray = ItemCtrl.getPlayerInHandCards();
        console.log(playerInHandCardsArray);
        const compInHandCardsArray = ItemCtrl.getCompInHandCards();
        console.log(compInHandCardsArray);
        console.log(data.compInHandCards);
        console.log(data.cardsToDeal[0]);


        // if (playerInHandCardsArray.length === 0 && compInHandCardsArray.length === 0) {
        //   console.log(data.compInHandCards);
        //   compInHandCardsArray.push(data.cardsToDeal[0].splice(0, 6));
        //   playerInHandCardsArray.push(data.cardsToDeal[0].splice(0, 6));
        //   // UICtrl.populateCompCards(compCards);
        //   // UICtrl.populatePlayerCards(playerCards);
        // };
        UICtrl.populateCompCards(compInHandCards);
        UICtrl.populateTableCards(cardsOnTable);
        // UICtrl.populatePlayerCards(playerInHandCards);

      }


      if (takeCombinations.length !== 0) {
        takeCombinations.sort(function (a, b) {
          return a[0] - b[0];
        });


        let bestCombination = takeCombinations[takeCombinations.length - 1];
        let compCardIndex = 0;
        let compCard = bestCombination[1];
        let compCardId = `card-${bestCombination[1].ID}`;
        // take table cards from the array
        let tableCardsBestCombi = bestCombination.slice(2, bestCombination.length);
        console.log(bestCombination);
        console.log(compCardId);
        console.log(tableCardsBestCombi);

        for (let k = 0; k < compInHandCards.length; k++) {
          if (compInHandCards[k] === compCard) {
            compCardIndex = k;
          }
        }

        // shows compCard that takes a combination on the table
        UICtrl.showCard(compInHandCards, compCard, compCardIndex, tableCardsBestCombi);



        // function to be passed on to setTimeout, comp takes combination of cards
        function compTakeCombi() {
          // moves compCard that takes combi to collected cards array
          ItemCtrl.moveCardFromArrayToArray(data.compInHandCards[0], data.compCollectedCards, compCardId);
          // moves best combination cards from table to collected cards
          tableCardsBestCombi.forEach(function (card) {
            ItemCtrl.moveCardFromArrayToArray(data.cardsOnTable[0], data.compCollectedCards, `card-${card.ID}`);
          })
          // sum of values of taken comp and table cards
          let compValueOfCollected = bestCombination[0];

          // player is needed for update current scoreboard function (comp or player update)
          const compParameter = "computer";
          // Update current scoreboard with sum of collected value cards
          UICtrl.updateCurrentScoreboard(compValueOfCollected, compParameter);
          setTimeout(function(){
            // var for checking if any card left on table to score a point for empty table
            const cardsOnTable = data.cardsOnTable[0];
            // If table has no cards after calc, add point 
            if (cardsOnTable.length === 0) {
              UICtrl.addEmptyTablePoint(compParameter);
            }

          },450)

          const cardsOnTable = data.cardsOnTable[0];

          // For tha last hand to determent who takes the cards from the table
          ItemCtrl.lastTook(0);

          UICtrl.populateCompCards(compInHandCards);
          UICtrl.populateTableCards(cardsOnTable);

        };

        // slow down of takeing cards, showing which card comp takes
        setTimeout(function () {
          compTakeCombi()
          // 1150
        }, 450);

      }

    },

    newDeal: function () {

      let playerInHandCards = ItemCtrl.getPlayerInHandCards();
      let compInHandCards = ItemCtrl.getCompInHandCards();
      let dealCards = ItemCtrl.getCardsToDeal();


      // if no player has cards in hand => deal new hand
      if (playerInHandCards.length === 0 && compInHandCards.length === 0) {
        // push 6 cards from dealing deck
        compInHandCards.push(dealCards.splice(0, 6));
        playerInHandCards.push(dealCards.splice(0, 6));

        // because its [[0]] situation, move content from inside array to outside
        ItemCtrl.moveCardFromArrayToArray(playerInHandCards[0], playerInHandCards)
        ItemCtrl.moveCardFromArrayToArray(compInHandCards[0], compInHandCards)

        // array remain on index 0, and it needs to be removed
        compInHandCards.shift();
        playerInHandCards.shift();

        // populate comp, player and dealing deck cards 
        UICtrl.populateCompCards(compInHandCards);
        UICtrl.populatePlayerCards(playerInHandCards);
        UICtrl.populateDealDeck(dealCards);


        // update deal hand number on score board
        UICtrl.updateDealNumber();
      };
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
      data.compInHandCards.push(data.fullDeck[0].splice(0, 6));
      data.playerInHandCards.push(data.fullDeck[0].splice(0, 6));
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
          if (index > -1) {
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
    removeCollectedCardsFromTable: function () {
      const cardsInCalc = this.getCardsInCalculation();
      const cardsOnTable = this.getCardsOnTable();

      cardsInCalc.forEach(function (cardCalc) {
        cardsOnTable.forEach(function (cardTable) {
          if (cardTable === cardCalc) {
            let index = cardsOnTable.indexOf(cardTable);
            cardsOnTable.splice(index, 1);
          }
        })
      })
    },
    moveCardFromArrayToArray: (fromArray, toArray, cardId) => {

      // if there is no cardId, move all elements fromArray to toArray
      if (cardId === undefined) {
        const numOfItems = fromArray.length;
        fromArray.forEach(card => {
          toArray.push(card);
        });
        fromArray.splice(0, numOfItems);
      }

      // if there is cardId
      fromArray.forEach(card => {
        if (`card-${card.ID}` === cardId || card.ID === cardId) {
          // Adding card from cardsInPlayerHand array to table cards
          toArray.push(card);
          // Finding the player card that is selected 
          let index = fromArray.indexOf(card)
          // Removing the selected player card after the card is being pushed
          fromArray.splice(index, 1);
        }
      })
    },
    countCardValues: (array) => {
      let valueCount = 0;
      array.forEach(card => {
        valueCount += card.Value;
      })
      return valueCount;
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
    getPlayerInHandCardsArr: () => {
      return data.playerInHandCards;
    },
    getCompInHandCardsArr: () => {
      return data.compInHandCards;
    },
    getCardsOnTableArr: () => {
      return data.cardsOnTable;
    },
    getCardsToDealArr: () => {
      return data.cardsToDeal;
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
    getWhoTookLast: () => {
      return data.whoTookTheLast;
    },
    logData: function () {
      return data;
    }
  };
})();




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

    // for setting playerPoints attribute
    playerPointsAttribute: "playerPoints",

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
        // ItemCtrl.moveCardFromArrayToArray(data.cardsOnTable[0], data.compCollectedCards, `card-${card.ID}`);
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
        // document.querySelector(UISelectors.playerPoints).innerHTML = updatedPlayerPointsString;
<<<<<<< HEAD

=======
>>>>>>> added animation for player takeing points, need to add tabla points animation
        const span = document.createElement("SPAN");
        span.setAttribute("class", "animated zoomIn faster");
        span.setAttribute("id", `${UISelectors.playerPointsAttribute}`);
        const html = updatedPlayerPointsString;
        span.innerHTML = html;
        
<<<<<<< HEAD
        UICtrl.pointUp(value, span);
=======
        UICtrl.playerPointUp(value, span);
>>>>>>> added animation for player takeing points, need to add tabla points animation
      }

      if (playerOrComp === "computer") {
        const currentCompPointsString = document.querySelector(UISelectors.compPoints).innerHTML;
        const currentCompPointsInt = parseInt(currentCompPointsString);
        const updatedCompPointsInt = currentCompPointsInt + value;
        const updatedCompPointsString = updatedCompPointsInt.toString();
        // document.querySelector(UISelectors.compPoints).innerHTML = updatedCompPointsString;
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
      console.log(tableValueOfCards);
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
        UICtrl.gameWinner();
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

        },1000)
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
        let html = `<span><h1 class="animated ${animation}">GAME POINT - PLAYER !</h1></span>`
        id.innerHTML = html;
      };
      function playerWin(id, animation) {
        let html = `<span><h1 class="animated ${animation}">PLAYER WINS ! ! !</h1></span>`
        id.innerHTML = html;
      };

      // Animation for a draw
      function draw(id, animation) {
        let html = `<span><h1 class="animated ${animation}">GAME DRAW - PLAY AGAIN !</h1></span>`
        id.innerHTML = html;
      };
      // function unpackArray() {
      // because its [[0]] situation, move content from inside array to outside
      //  ItemCtrl.moveCardFromArrayToArray(playerInHandCards[0], playerInHandCards);
      //  ItemCtrl.moveCardFromArrayToArray(compInHandCards[0], compInHandCards);
      //  ItemCtrl.moveCardFromArrayToArray(cardsOnTable[0], cardsOnTable);
      //  ItemCtrl.moveCardFromArrayToArray(cardsToDeal[0], cardsToDeal);

      //  // array remain on index 0, and it needs to be removed
      //  compInHandCards.shift();
      //  playerInHandCards.shift();
      //  cardsOnTable.shift();
      //  cardsToDeal.shift();
      // };


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
          }, 2800);

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
        const updatedPlayerPointsInt = currentPlayerPointsInt + 1;
        const updatedPlayerPointsString = updatedPlayerPointsInt.toString();
        // document.querySelector(UISelectors.playerPoints).innerHTML = updatedPlayerPointsString;
        const span = document.createElement("SPAN");
        span.setAttribute("class", "animated zoomIn faster");
        span.setAttribute("id", `${UISelectors.playerPointsAttribute}`);
        const html = updatedPlayerPointsString;
        span.innerHTML = html;

        const currentPlayerTablaPointsString = document.querySelector(UISelectors.playerTablaPoints).innerHTML;
        document.querySelector(UISelectors.playerTablaPoints).innerHTML = currentPlayerTablaPointsString + "|";
        UICtrl.pointUp(value, span);
      }
      if (playerOrComp === "computer") {
        const currentCompPointsString = document.querySelector(UISelectors.compPoints).innerHTML;
        const currentCompPointsInt = parseInt(currentCompPointsString);
        const value = 1;
        const updatedCompPointsInt = currentCompPointsInt + value;
        const updatedCompPointsString = updatedCompPointsInt.toString();
        // document.querySelector(UISelectors.compPoints).innerHTML = updatedCompPointsString;
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
    // const playerCollectedCards = ItemCtrl.getPlayerCollectedCards();
    // const compCollectedCards = ItemCtrl.getCompCollectedCards();

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

        console.log(grabId);
      }

    }

    console.log(ItemCtrl.logData());

    e.preventDefault();
  }

  const selectPlayerCard = e => {

    const playerInHandCards = ItemCtrl.getPlayerInHandCards();
    const compInHandCards = ItemCtrl.getCompInHandCards();
    // const dealingDeck = ItemCtrl.getCardsToDeal();
    const playerCollectedCards = ItemCtrl.getPlayerCollectedCards();
    // const compCollectedCards = ItemCtrl.getCompCollectedCards();
    const cardsInCalculation = ItemCtrl.getCardsInCalculation();
    const cardsOnTable = ItemCtrl.getCardsOnTable();
    // const populatePlayerCards = UICtrl.populatePlayerCards(playerInHandCards);

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

        let numOfCollected = playerCollectedCards.length;

        const playerRankCalc = ItemCtrl.getPlayerCardRank(grabId)[0];
        console.log(playerRankCalc);
        console.log(grabId);
        console.log(playerInHandCards);
        console.log(playerCollectedCards);

        const calculate = ItemCtrl.calculus(grabId, cardsInCalculation, playerInHandCards);
        console.log(calculate);
        if (calculate[0] === true) {

          // move player card to calculation array
          ItemCtrl.moveCardFromArrayToArray(playerInHandCards, cardsInCalculation, grabId);
          // count all value cards
          const playerValueOfCollected = ItemCtrl.countCardValues(cardsInCalculation);

          // if(cardsInCalculation !== 0){
          //   // for last deal to determent who took the last to take the rest cards from the table
          // }
          console.log(playerValueOfCollected);
          // get a deal number to check if it's a end of a game
          const dealNr = UICtrl.getCurrentDealNum();
          const cardsToDeal = ItemCtrl.getCardsToDeal();
          // player is needed for update current scoreboard function (comp or player update)
          const playerParameter = "player";
          // remove cards that are collected from table
          ItemCtrl.removeCollectedCardsFromTable();
          // move all cards from calculation to collected cards
          ItemCtrl.moveCardFromArrayToArray(cardsInCalculation, playerCollectedCards);
          // If table has no cards after calc, add point 
          console.log(cardsOnTable);

          if (numOfCollected !== playerCollectedCards.length) {
            ItemCtrl.lastTook(1);
            
            // Update current scoreboard with sum of collected value cards
            UICtrl.updateCurrentScoreboard(playerValueOfCollected, playerParameter);
            
            if (cardsOnTable.length === 0) {
              UICtrl.addEmptyTablePoint(playerParameter);
            }

          }
          // UICtrl.moveCardFromArrayToArray(cardsOnTable, playerCollectedCards);
          UICtrl.populatePlayerCards(playerInHandCards);
          UICtrl.populateTableCards(cardsOnTable);

          setTimeout(function () {
            ItemCtrl.compMove();
            // 920
          }, 750);
          // to slow down compMove, imitates computer Thinking
          // if there are no more cards and it's end of game
          setTimeout(function () {
            if (playerInHandCards.length === 0 && compInHandCards.length === 0 && cardsToDeal.length === 0 && dealNr === 4) {
              UICtrl.updateDealNumber();
              UICtrl.endOfGame();
              // computer move
            };
            // 1100
          }, 1700);

          // if players have no more cards and it's not end of a game
          // new Deal after the comp complete its move, waits all timeouts to finish
          if (dealNr !== 4) {

            setTimeout(function () {
              ItemCtrl.newDeal();
              // 2450
            }, 1650);
          }


        }

      }
    }

    console.log(ItemCtrl.logData());

    e.preventDefault();
  }


  // Public methods
  return {

    init: function () {
      // 1st Round of Game
      ItemCtrl.firstDeal();
      UICtrl.defaultScoreboard();

      // $('#myModal').on('shown.bs.modal', function () {
      //   $('#myInput').trigger('focus')
      // })

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
