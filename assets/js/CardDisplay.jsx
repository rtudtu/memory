import React from "react";

class CardDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.clicked = this.clicked.bind(this);
  }

  clicked() {
    if (!this.props.matched && !this.props.showFace) {
      this.props.clicked(this.props.id);      
    }
  }

  render() {
    if (this.props.showFace) {
      return (
        <span className="Card-Face">[{this.props.letter}]</span>
      );      
    } else {
      return (
	<div className="Card-Back">
	  <img src="cardback.png" alt="[-]" onClick={this.clicked}/>
	</div>
      );
    }
  };
};

export default CardDisplay;
