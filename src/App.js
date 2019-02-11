import React, { Component } from "react";
import { parse } from "./library/chord-magic";
import { chordNotes } from "./library/chord-notes";
import { Piano, KeyboardShortcuts, MidiNumbers } from "./library/react-piano";
import { noteNumberToName } from "midiutils";
import "react-piano/dist/styles.css";

const noteRange = {
  first: MidiNumbers.fromNote("c2"),
  last: MidiNumbers.fromNote("b3")
};

const DontTouchContainer = props => {
  return (
    <div className="piano-container" onClick={e => e.stopPropagation()}>
      {props.children}
    </div>
  );
};

function BasicPiano(props) {
  return (
    <Piano
      noteRange={noteRange}
      playNote={() => {}}
      stopNote={() => {}}
      width={1000}
      {...props}
    />
  );
}

class App extends Component {
  state = {
    currentChord: "Cm7b5"
  };

  onChordChange = event => {
    this.setState({
      currentChord: event.target.value
    });
  };

  render() {
    const { currentChord } = this.state;
    const { onChordChange } = this;
    return (
      <div className="App">
        <DontTouchContainer>
          <BasicPiano
            activeNotes={
              parse(currentChord)
                ? [2, 3]
                    .map(octave =>
                      chordNotes(parse(currentChord)).map(e =>
                        MidiNumbers.fromNote(e + octave)
                      )
                    )
                    .reduce((p, c) => [...p, ...c])
                : []
            }
            className="MyCoolPiano"
            renderNoteLabel={({ isActive, midiNumber }) => {
              if (isActive) {
                const note = noteNumberToName(midiNumber);
                return note.includes("-") ? note[0] : note.substring(0, 2);
              }
            }}
          />
        </DontTouchContainer>
        <h2> Enter your Chord! </h2>
        <input type="text" value={currentChord} onChange={onChordChange} />
        <div className="notations">
          <h3> Notations </h3>
          <ul>
            <li> Major 7 th(maj7) </li> <li> Minor 7 th(m7 / -7) </li>
            <li> Dominant 7 th(7) </li> <li> Half - Dimished 7 th(m7b5) </li>
            <li> Minor Major(mM7) </li> <li> Root(C / D) </li>
            <li> Suspended(sus4 / sus2) </li>
            <li> Added(add9 / add11): Not yet implemented </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
