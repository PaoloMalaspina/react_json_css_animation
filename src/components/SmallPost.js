import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';

class SmallPost extends Component {

  /**
  * Reduce lenght of string
  * String @strDescription original String
  * String @sepChar character separator
  * Integer @ maxWord max number of word to shown
  */
  reduceDescription (strDescription, sepChar=" ", maxWords = 50) {
    //check if strDescription is valid
    if (typeof strDescription !=="string") {
      return "";
    }

    let ellipsis = "";
    let arrDescription = strDescription.split(sepChar,maxWords+1);

    //check if number of words greater @maxWords, and add ellipsis text if is true
    if (arrDescription.length>maxWords) {
      ellipsis=" ... ";
      //remove last element of array exceed @maxWords
      arrDescription.pop();
    };
    return arrDescription.join(sepChar) + ellipsis;
  };

  render() {
    //Call back function called when user click on bottom button
    let callBackOnClickBtn = () => this.props.onClickBtn(this.props);
    return (
      <div className= {"smallPost box_dx_" +this.props.indexView}>
        <h1>{this.props.heading}</h1>
        <h2>{this.reduceDescription(this.props.subheading, " ",15)}</h2>
        <Button title="Visualizza tutto il contenuto" onClick={callBackOnClickBtn}>Visualizza il contenuto</Button>
      </div>
    );
  }
}

export default SmallPost;
