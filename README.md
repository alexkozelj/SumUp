<h1> SumUp! </h1>
SumUp! a.k.a. Tablic is a fishing card game that is played against the computer. <br>
<b>Vanilla JavaScript (Module Pattern), HTML, CSS, Sass, Bootstrap</b>



<h2>Introduction to the Game</h2>

Tablić is a fishing game played in Serbia and other countries of the former Yugoslavia. 

As in most games of this type, the aim is to capture cards from a layout on the table by playing matching a card from hand. Captured cards cards are accumulated in a pile to be counted at the end of the round to determine the score.

<h2>Players and Cards</h2>
Tablić is played with a standard 52-card deck without jokers. For the purpose of capture the cards have values: king=14, queen=13, jack=12, ace=1 or 11 at the choice of the player, other cards face value. The suits have no significance in this game, except that the diamond10 and club2 are worth extra points in the scoring.



<h1> How To Play </h1>

At your turn you play one card face up on the table. If its value is equal to a card or a set of cards in the layout, you may capture any such cards or sets. No card can belong to more than one captured set at the same time. For example with 2, 3, 4, 7 on the table, a 9 can capture 2+3+4 or 2+7 and both these sets at once. You take the captured cards, along with the card you played.


Example: the cards on the table are A, 3, 6, 7, 8, Q.

If you play a 6, you can only capture the 6.
If you play a 9 you can capture (A+8) + (3+6).
If you play a 10 you can capture 7+3.
If you play a King (14) you could capture A+6+7, or (A+Q) + (6+8), or (A+3) + (6+8) (counting the Ace as 11).
If you play a 5 it captures nothing and remains face up on the table.
When playing a card, you are not obliged to capture everything that you can. You may capture just some of the matching cards or sets, or nothing at all.

Capturing all the cards on the table, leaving it empty, is called a 'tabla' and is worth an extra point in the final scoring.


<h2>Scoring</h2>
At the end of the play, each player for captured cards as follows:

Each Ace, King, Queen or Jack: 1 point
10 of diamonds: 2 points
Other tens: 1 point
2 of clubs: 1 point
The player or team with most cards: 3 points
That makes a total of 25 points.
In addition, 1 point is added for each tabla. 


Ending the Game
The object of the game is to achieve a score of more points than computer.

>Claiming Victory
First who wins 2 games is a winner. That means that there are 3 game to play at highest for a winner to be known.
