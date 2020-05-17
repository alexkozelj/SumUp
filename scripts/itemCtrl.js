
// //////// >>>>>> Item Controller <<<<<< //////// //
const ItemCtrl = (function () {

   // Data Structure 
   const data = {
      suits: ["spades", "diams", "clubs", "hearts"],

      ranks: ["a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"],

      fullDeck: [],

      compCollectedCards: [],

      playerCollectedCards: [],

      compInHandCards: [],

      playerInHandCards: [],

      cardsOnTable: [],

      cardsToDeal: [],

      cardsInCalculation: [],

      // Player who takes last combination in game, takes rest of cards
      whoTookTheLast: 0

   };

   // Public methods
   return {
      // check if Ace is in combination
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
      // checks if combi passes the game rules
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


                        // If current card sum up more then Player card => -10
                        if (sumOfRanked > playerCard[0]) {
                           sumOfRanked += - 10;
                           cardsThatPassTest.push(rankedCards[i]);
                           // console.log(sumOfRanked);
                        }
                     }

                     // checking if it adds up & reset to 0
                     if (sumOfRanked === playerCard[0]) {
                        sumOfRanked = 0;
                        cardsThatPassTest.push(rankedCards[i]);
                        // console.log(sumOfRanked);
                        // console.log(rankedCards[i]);
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
                     }

                     if (sumOfRanked === playerCard[0] || sumOfRankMinus10 === playerCard[0]) {
                        sumOfRanked = 0;
                        sumOfRankMinus10 = 0;
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
                     }

                     // checking if it adds up & reset to 0
                     if (sumOfRanked === playerCard[0]) {
                        sumOfRanked = 0;
                        // console.log(sumOfRanked);
                        // console.log(rankedCards[i]);
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
            }
            else {
               calculation = false;
            }
         }

         ////// if no card on stage is selected, put the player card on stage /////
         if (sameAsPlayerCardIsThere === false && sumOfCards === 0) {
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
            aceIsThereRestCards,
         ]
      },

      lastTook: function (x) {
         if (x === 1) {
            data.whoTookTheLast = 1;
         } else {
            data.whoTookTheLast = 0;
         }
      },

      compMove: function () {
         const compCards = ItemCtrl.getCompInHandCards();
         const tableCards = ItemCtrl.getCardsOnTable();

         // Storing potential combinations that can be taken from a computer player
         let takeCombinations = [];

         // Comp in hand cards
         let compInHandCards = data.compInHandCards[0];


         // loop through COMPUTER CARDS to compare them with table cards
         for (let i = 0; i < compCards.length; i++) {
            // convert current card to a [{}]
            let arrayOfCompCard = [compCards[i]];
            // convert current card to a number
            let compCardRank = ItemCtrl.getRank(arrayOfCompCard)[0][0];

            // loop through FIRST potential table card to be taken - check if there is same cards as comp card 
            for (let x = 0; x < tableCards.length; x++) {
               let arrayOfTableCard = [tableCards[x]];
               let tableCardX = ItemCtrl.getRank(arrayOfTableCard)[0][0];
               // console.log(tableCardX);

               // SAME CARD is found and pushed
               if (compCardRank === tableCardX) {
                  let valueOfCombi = compCards[i].Value + tableCards[x].Value;
                  takeCombinations.push([valueOfCombi, compCards[i], tableCards[x]]);

                  // If there is ANOTHER SAME CARD
                  for (let same = 0; same < tableCards.length; same++) {
                     let arrayOfTableCardsSame = [tableCards[same]];
                     let tableCardXSame = ItemCtrl.getRank(arrayOfTableCardsSame)[0][0];
                     // console.log(tableCardX);
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
                     let tableCardY = ItemCtrl.getRank(arrayOfTableCardY)[0][0];
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
                           let tableCardZ = ItemCtrl.getRank(arrayOfTableCardZ)[0][0];
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
               }

               // Situation when it is not a same card and check if there is a PAIR that sums to comp card
               if (compCardRank !== tableCardX && tableCardX < compCardRank) {
                  for (let y = 0; y < tableCards.length; y++) {
                     let arrayOfTableCardY = [tableCards[y]];
                     let tableCardY = ItemCtrl.getRank(arrayOfTableCardY)[0][0];

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
                           let tableCardQ = ItemCtrl.getRank(arrayOfTableCardQ)[0][0];

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
            // console.log(compCardsRank);

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
            UICtrl.populateCompCards(compInHandCards);
            UICtrl.populateTableCards(cardsOnTable);

         }


         if (takeCombinations.length !== 0) {
            takeCombinations.sort(function (a, b) {
               return a[0] - b[0];
            });

            const playerInHandCards = ItemCtrl.getPlayerInHandCards();
            const compInHandCards = ItemCtrl.getCompInHandCards();
            // get a deal number to check if it's a end of a game
            const dealNr = UICtrl.getCurrentDealNum();
            const cardsToDeal = ItemCtrl.getCardsToDeal();


            let bestCombination = takeCombinations[takeCombinations.length - 1];
            let compCardIndex = 0;
            let compCard = bestCombination[1];
            let compCardId = `card-${bestCombination[1].ID}`;
            // take table cards from the array
            let tableCardsBestCombi = bestCombination.slice(2, bestCombination.length);


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

               ItemCtrl.timeoutPromise(450, () => {
                  // var for checking if any card left on table to score a point for empty table
                  const cardsOnTable = data.cardsOnTable[0];
                  // If table has no cards after calc, add point 
                  if (cardsOnTable.length === 0) {
                     UICtrl.addEmptyTablePoint(compParameter);
                  }
               })

               const cardsOnTable = data.cardsOnTable[0];

               // For tha last hand to determent who takes the cards from the table
               ItemCtrl.lastTook(0);

               UICtrl.populateCompCards(compInHandCards);
               UICtrl.populateTableCards(cardsOnTable);

            };

            // Chained promises
            ItemCtrl.timeoutPromise(700, compTakeCombi)
               .then(() => {
                  if (playerInHandCards.length === 0 && compInHandCards.length === 0) {
                     ItemCtrl.timeoutPromise(2000, ItemCtrl.newDeal);
                     // console.log("condition fulfilled from ITEM CTRL")
                  }
               })
               .then(() => {
                  const playerInHandCards = ItemCtrl.getPlayerInHandCards();
                  // get a deal number to check if it's a end of a game
                  const dealNr = UICtrl.getCurrentDealNum();
                  const cardsToDeal = ItemCtrl.getCardsToDeal();

                  if (playerInHandCards.length === 0 && compInHandCards.length === 0 && cardsToDeal.length === 0 && dealNr === 4) {
                     ItemCtrl.timeoutPromise(2500, () => {
                        UICtrl.endOfGame();
                     })

                     // console.log("hej game is over from APP");
                  }
               })
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

      timeoutPromise: function (time, func) {
         return new Promise(function (res, rej) {
            setTimeout(function () {
               res(func());
            }, time);
         })
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
         let rank = "";

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
         // console.log(data.fullDeck[0]);
      },

      getWhoTookLast: () => {
         return data.whoTookTheLast;
      },

      logData: function () {
         return data;
      }
   };
})();