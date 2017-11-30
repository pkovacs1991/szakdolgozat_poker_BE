
import {Card} from "./Card";
import {Hand} from "./Hand";
import {User} from "./User";

export class Cards {

   cards: Card[];

    constructor() {
        this.createNewDeck();
    }


   createNewDeck(): void {

       let newCards: Card[] = [];
       newCards.push(new Card('2','Hearts'));
       newCards.push(new Card('3','Hearts'));
       newCards.push(new Card('4','Hearts'));
       newCards.push(new Card('5','Hearts'));
       newCards.push(new Card('6','Hearts'));
       newCards.push(new Card('7','Hearts'));
       newCards.push(new Card('8','Hearts'));
       newCards.push(new Card('9','Hearts'));
       newCards.push(new Card('10','Hearts'));
       newCards.push(new Card('Jack','Hearts'));
       newCards.push(new Card('Queen','Hearts'));
       newCards.push(new Card('King','Hearts'));
       newCards.push(new Card('Ace','Hearts'));
       newCards.push(new Card('2','Diamonds'));
       newCards.push(new Card('3','Diamonds'));
       newCards.push(new Card('4','Diamonds'));
       newCards.push(new Card('5','Diamonds'));
       newCards.push(new Card('6','Diamonds'));
       newCards.push(new Card('7','Diamonds'));
       newCards.push(new Card('8','Diamonds'));
       newCards.push(new Card('9','Diamonds'));
       newCards.push(new Card('10','Diamonds'));
       newCards.push(new Card('Jack','Diamonds'));
       newCards.push(new Card('Queen','Diamonds'));
       newCards.push(new Card('King','Diamonds'));
       newCards.push(new Card('Ace','Diamonds'));
       newCards.push(new Card('2','Clubs'));
       newCards.push(new Card('3','Clubs'));
       newCards.push(new Card('4','Clubs'));
       newCards.push(new Card('5','Clubs'));
       newCards.push(new Card('6','Clubs'));
       newCards.push(new Card('7','Clubs'));
       newCards.push(new Card('8','Clubs'));
       newCards.push(new Card('9','Clubs'));
       newCards.push(new Card('10','Clubs'));
       newCards.push(new Card('Jack','Clubs'));
       newCards.push(new Card('Queen','Clubs'));
       newCards.push(new Card('King','Clubs'));
       newCards.push(new Card('Ace','Clubs'));
       newCards.push(new Card('2','Spades'));
       newCards.push(new Card('3','Spades'));
       newCards.push(new Card('4','Spades'));
       newCards.push(new Card('5','Spades'));
       newCards.push(new Card('6','Spades'));
       newCards.push(new Card('7','Spades'));
       newCards.push(new Card('8','Spades'));
       newCards.push(new Card('9','Spades'));
       newCards.push(new Card('10','Spades'));
       newCards.push(new Card('Jack','Spades'));
       newCards.push(new Card('Queen','Spades'));
       newCards.push(new Card('King','Spades'));
       newCards.push(new Card('Ace','Spades'));



       this.cards =  newCards;
   }

   deal(users: User[]): Hand[] {
       let hands:Hand[] = [];

       for(let i = 0; i < users.length; i++) {
            let card1 = this.getRandomCard();
            let card2 = this.getRandomCard();
            hands.push(new Hand(users[i],[card1,card2]));
       }


       return hands;

   }

   getRandomCard(): Card{

       let rand = Math.floor(Math.random() * this.cards.length);
       let card = this.cards[rand];
       this.cards.splice(rand,1);
       return card;

   }

    flop(): Card[] {
        let card1 = this.getRandomCard();
        let card2 = this.getRandomCard();
        let card3 = this.getRandomCard();

        return [card1,card2,card3];
    }

    river(): Card {
        return this.getRandomCard();
    }

    turn(): Card {
        return this.getRandomCard();
    }
}