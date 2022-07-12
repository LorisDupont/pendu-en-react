import React, {Component} from 'react'
import './App.css';
import Keyboard from './Keyboard'
import CurrentWord from './CurrentWord';
import Heart from './Heart';


class App extends Component{

  state = {
    wordCollection: ["wordpress", "gare", "train", "glace", "code", "licorne", "cheval", "ordinateur", "porte", "souris"],
    currentWord: null,
    alphabet : "abcdefghijklmnopqrstuvwxyz".toLowerCase().split(''),
    usedLetter: [],
    win:0, // 0 neutre | -1 lost | +1 win
    attempt:0,
    maxAttempt: 9,
  }

  componentDidMount() {

    window.addEventListener("keyup", (e) => {
      if(e.keyCode === 13){
        this.initGame()
      }

  })

  }

  clickLetter = (letter) => {
    console.log("=> " + letter);

    if( this.state.usedLetter.indexOf(letter) === -1) {
      let attempt = this.state.attempt
      const usedLetter = [letter, ...this.state.usedLetter]
      this.setState({usedLetter})

      if(this.state.currentWord.indexOf(letter) === -1) {
        attempt = this.state.attempt + 1
      } else {
        
        
      }
      let win = 1
      for(let i = 0; i < this.state.currentWord.length; i++){
        if( usedLetter.indexOf(this.state.currentWord[i]) == -1){
          win = 0
        }
      }

      if (attempt >= this.state.maxAttempt && win === 0) { 
				win = -1
			}

			//update state
			this.setState({ usedLetter, attempt, win })
    }


  }

  pickNewWord = () => {

    const randomIndex = Math.floor( Math.random() * this.state.wordCollection.length)
    return this.state.wordCollection[ randomIndex]
  }

  initGame = () => {

    this.setState({
      currentWord: this.pickNewWord(), 
      usedLetter: [], 
      win:0, 
      attempt:0
    })
  }


  render(){
    return(
      <div id='game'>
        <h1>Pendu</h1>
        <br />
        <br />
        {
          (this.state.currentWord !== null) &&
          
          <CurrentWord
            currentWord={this.state.currentWord}
            usedLetter={this.state.usedLetter}
            win={this.state.win}
          />

   
        
        }
<br />
        {
          (this.state.currentWord !== null) &&
          <Heart attempt={this.state.attempt} maxAttempt={this.state.maxAttempt}></Heart>
        }
<br />
        {
          this.state.win == 0 && this.state.currentWord != null &&
          <Keyboard 
          alphabet={this.state.alphabet}
          usedLetter={this.state.usedLetter}
          action={this.clickLetter}
          >

        </Keyboard>
        }
        {
          this.state.win === 1 &&

          <p className="win_msg">WIN!!</p>
        }

                {
          this.state.win === -1 &&

          <p className="lost_msg">LOST!!</p> 
          
        }
        {
          this.state.win === -1 &&

          <button className="new-game" onClick={() => this.initGame()}>Nouvelle partie</button>
          
        }
         {
          (this.state.currentWord === null || this.state.win === 1) &&
          <button id="play-new-game" onClick={() => this.initGame()}>Nouvelle partie</button>
         }
          </div>
    )
  }
}

export default App;
