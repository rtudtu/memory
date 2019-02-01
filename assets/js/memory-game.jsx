import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import CardDisplay from "./CardDisplay";
import MemoryCards from "./MemoryCards";

export default function game_init(root) {
  ReactDOM.render(<MemoryGame />, root);
}

class MemoryGame extends React.Component {
  constructor(props) {
    super(props);
    this.memoryCards = new MemoryCards();
    this.memoryCards.genCards();
    this.cardClicked = this.cardClicked.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {
      win: false,
      clicks: 0,
      score: 0,
      selected: [],
      correct: []
    };
  }
  
  // Reset the game (and shuffle cards)
  reset() {
    this.memoryCards = new MemoryCards();
    this.memoryCards.genCards();
    this.setState({
      win: false,
      clicks: 0,
      score: 0,
      selected: [],
      correct: []
    });
  }

  // Returns all the cards' html representation
  getCards() {
    let cards = [];
    let clicked = this.cardClicked;
    this.memoryCards.cards.forEach(card => {
      let memoryCard = <CardDisplay 
	key={card.id}
	id = {card.id}
	letter = {card.letter}
	showFace = {card.showFace}
	matched = {card.matched}
	clicked = {clicked}/>;
	cards.push(memoryCard);
    });
    return cards;
  }

  // Runs when the card ids' letters do not match
  clearCards(id1, id2) {
    this.memoryCards.toggleCard(id1, false);
    this.memoryCards.toggleCard(id2, false);
    this.state.selected = [];
    this.setState({});
    //this.setState({
      //selected: []
    //});
  }

  // When a card is clicked, check how many have been already clicked and update state appropriately
  cardClicked(id) {
    if (this.state.selected.length % 2 === 0) {
      if (this.state.selected.length === 2) {
	clearTimeout(this.timeout);
        this.clearCards(this.state.selected[0], this.state.selected[1]);
      }
      this.memoryCards.toggleCard(id, true);
      this.state.selected.push(id);
      this.state.clicks++
      this.state.score--
      this.setState({});
      //this.setState({
        //selected: _.concat(this.state.selected, id),
	//clicks: this.state.clicks + 1,
	//score: this.state.score - 1
      //});
    } else {
      this.memoryCards.toggleCard(id, true);
      this.state.selected.push(id);
      this.state.clicks++
      this.state.score--
      this.setState({});
      //this.setState({
        //selected: _.concat(this.state.selected, id),
	//clicks: this.state.clicks + 1,
	//score: this.state.score - 1
      //});
      if (this.memoryCards.matchCards(this.memoryCards.getCard(this.state.selected[0]), 
	                                this.memoryCards.getCard(this.state.selected[1]))) {
	this.memoryCards.setMatched(id, true);
	this.memoryCards.setMatched(id, true);
	this.state.correct.push(this.state.selected[0]);
	this.state.correct.push(this.state.selected[1]);
	this.state.selected = [];
        this.state.score += 15;
	//this.setState({
	  //selected: [],
          ////correct: this.state.correct.concat(this.state.selected[0]).concat(this.state.selected[1]),
          //correct: _.concat(_.concat(this.state.correct, this.state.selected[0]), this.state.selected[1]),
          //score: this.state.score + 15
	//});
	if(this.state.correct.length === 16) {
	  this.setState({
	    win: true
	  });
	}
      } else {
        this.timeout = setTimeout(() => { this.clearCards(this.state.selected[0], this.state.selected[1]); }, 1000);
      }
    }
  }
  
  render() {
    let cards = this.getCards();
    let scoreMessage = "Clicks: " + this.state.clicks + "      Score: " + this.state.score;
    if (this.state.win) {
      scoreMessage = "You win! Number of Clicks: [" + this.state.clicks + "]     Score: [" + this.state.score + "]";
    }
    return(
	<div className="MemoryGame">
	  <h2>Memory Game</h2>
	  <p>{scoreMessage}</p>
	  <button onClick={this.reset}>Reset Game</button>
	  <div className="row">
	    {cards.slice(0, 4)}
	  </div>
	  <div className="row">
	    {cards.slice(4, 8)}
	  </div>
	  <div className="row">
	    {cards.slice(8, 12)}
	  </div>
	  <div className="row">
	    {cards.slice(12, 16)}
	  </div>
	</div>
    );
  }
}

