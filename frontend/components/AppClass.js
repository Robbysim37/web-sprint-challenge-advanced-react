import React from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const rowLength = 3

export default class AppClass extends React.Component {
  constructor() {
    super()
    this.state = {
      currIndex: initialIndex,
      moveCounter: initialSteps,
      moveErrMsg: initialMessage,
      userEmail: initialEmail
    }
  }
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.

    let cords = [2,2]
    if(this.state.currIndex % rowLength === 0){
      cords[0] = 1
    }else if(this.state.currIndex % rowLength === 1){
      cords[0] = 2
    }else{
      cords[0] = 3
    }

    if(this.state.currIndex < rowLength){
      cords[1] = 1
    }else if(this.state.currIndex >= (rowLength * 2)){
      cords[1] = 3
    }else{
      cords[1] = 2
    }
    return cords
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({
      currIndex: initialIndex,
      moveCounter: initialSteps,
      moveErrMsg: initialMessage,
      userEmail: initialEmail})
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.

    if(evt.target.id === "up" && this.state.currIndex > 2){
      this.setState({
        currIndex: this.state.currIndex - 3,
        moveCounter: this.state.moveCounter + 1,
        moveErrMsg: initialMessage
      })
    }
    else if(evt.target.id === "down" && this.state.currIndex < 6){
      this.setState({
        currIndex: this.state.currIndex + 3,
        moveCounter: this.state.moveCounter + 1,
        moveErrMsg: initialMessage
      })
    }
    else if(evt.target.id === "left" && this.state.currIndex % rowLength !== 0){
      this.setState({
        currIndex: this.state.currIndex - 1,
        moveCounter: this.state.moveCounter + 1,
        moveErrMsg: initialMessage
      })
    }
    else if(evt.target.id === "right" && this.state.currIndex % rowLength !== rowLength - 1){
      this.setState({
        currIndex: this.state.currIndex + 1,
        moveCounter: this.state.moveCounter + 1,
        moveErrMsg: initialMessage
      })
    }else{
      this.setState({
        moveErrMsg: `You can't go ${evt.target.id}`
      })
    }
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.

    this.setState({
      userEmail: evt.target.value
    })
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.

    evt.preventDefault()

    fetch("http://localhost:9000/api/result" , {method:"POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      x: this.getXY()[0],
      y: this.getXY()[1],
      steps: this.state.moveCounter,
      email: this.state.userEmail})})
    .then(res => res.json())
    .then(res => this.setState({
      moveErrMsg: res.message
    }))

    this.setState({
      userEmail:initialEmail
    })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.getXY()[0]}, {this.getXY()[1]})</h3>
          <h3 id="steps">You moved {this.state.moveCounter} time{this.state.moveCounter === 1 ? "" : "s"}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.currIndex ? ' active' : ''}`}>
                {idx === this.state.currIndex ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.moveErrMsg}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" 
          placeholder="type email" value={this.state.userEmail} onChange={this.onChange}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
