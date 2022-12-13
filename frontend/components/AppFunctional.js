import e from 'cors'
import React, {useState} from 'react'

// Suggested initial states

const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const rowLength = 3



export default function AppFunctional(props) {
  const [currIndex,setCurrIndex] = useState(initialIndex)
  const [moveCounter, setMoveCounter] = useState(initialSteps)
  const [moveErrMsg, setMoveErrMsg] = useState(initialMessage)
  const [userEmail,setUserEmail] = useState(initialEmail)
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    let cords = [2,2]
    if(currIndex % rowLength === 0){
      cords[0] = 1
    }else if(currIndex % rowLength === 1){
      cords[0] = 2
    }else{
      cords[0] = 3
    }
    if(currIndex < rowLength){
      cords[1] = 1
    }else if(currIndex >= (rowLength * 2)){
      cords[1] = 3
    }else{
      cords[1] = 2
    }
    return cords

  }

  function reset(evt) {
    // Use this helper to reset all states to their initial values.
    setCurrIndex(initialIndex)
    setMoveCounter(initialSteps)
    setMoveErrMsg(initialMessage)
    setUserEmail(initialEmail)
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.

    if(evt.target.id === "up" && currIndex > 2){
      setCurrIndex(currIndex - 3)
      setMoveCounter(moveCounter + 1)
      setMoveErrMsg(initialMessage)
    }
    else if(evt.target.id === "down" && currIndex < 6){
      setCurrIndex(currIndex + 3)
      setMoveCounter(moveCounter + 1)
      setMoveErrMsg(initialMessage)
    }
    else if(evt.target.id === "left" && currIndex % rowLength !== 0){
      setCurrIndex(currIndex - 1)
      setMoveCounter(moveCounter + 1)
      setMoveErrMsg(initialMessage)
    }
    else if(evt.target.id === "right" && currIndex % rowLength !== rowLength - 1){
      setCurrIndex(currIndex + 1)

      setMoveCounter(moveCounter + 1)
      setMoveErrMsg(initialMessage)
    }else{
      setMoveErrMsg(`You can't go ${evt.target.id}`)
    }
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    setUserEmail(evt.target.value)
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.

    evt.preventDefault()

    fetch("http://localhost:9000/api/result" , {method:"POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      x: getXY()[0],
      y: getXY()[1],
      steps: moveCounter,
      email: userEmail})})
    .then(res => res.json())
    .then(res => setMoveErrMsg(res.message))

    setUserEmail(initialEmail)
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 data-testid ="coords" id="coordinates">Coordinates ({getXY()[0]}, {getXY()[1]})</h3>
        <h3 id="steps">You moved {moveCounter} time{moveCounter === 1 ? "" : "s"}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === currIndex ? ' active' : ''}`}>
              {idx === currIndex ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{moveErrMsg}</h3>
      </div>
      <div id="keypad">
        <button data-testid="left" id="left" onClick={move}>LEFT</button>
        <button data-testid="up"id="up" onClick={move}>UP</button>
        <button data-testid="right"id="right" onClick={move}>RIGHT</button>
        <button data-testid="down"id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input data-testid="email" id="email" type="email" placeholder="type email" value={userEmail} onChange={onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
