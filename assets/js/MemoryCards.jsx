class MemoryCards {
  constructor() {
    this.cards = [];
    this.letters = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"];
  }

  shuffle(arr) {
    let i, j, x;
    for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = arr[i];
      arr[i] = arr[j];
      arr[j] = x;
    }
    return arr;
  }

  genCards() {
    this.cards = [];
    for(let i = 0; i < this.letters.length; i++) {
      let card = {
	id: i,
	letter: this.letters[i],
	showFace: false,
	matched: false
      };
      this.cards.push(card)
    }
    this.shuffle(this.cards)
  }

  toggleCard(id, showFace) {
    this.getCard(id).showFace = showFace;
  }

  setMatched(id, matched) {
    this.getCard(id).matched = matched;
  }

  getCard(id) {
    for(let i = 0; i < this.cards.length; i++) {
      if(this.cards[i].id === id) {
	return this.cards[i];
      }
    };
  }

  matchCards(card1, card2) {
    if(card1.letter === card2.letter) {
      return true;
    } else {
      return false;
    }
  }
}

export default MemoryCards;
