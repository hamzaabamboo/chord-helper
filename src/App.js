import React, { Component } from "react";
import { parse } from "chord-magic";
import { chordNotes } from "./library/chord-notes";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import { noteNumberToName } from "midiutils";
import "react-piano/dist/styles.css";

const noteRange = {
  first: MidiNumbers.fromNote("c2"),
  last: MidiNumbers.fromNote("f5")
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
    currentChord: "C7"
  };

  onChordChange = event => {
    this.setState({
      currentChord: event.target.value
    });
  };

  render() {
    const { currentChord } = this.state;
    const { onChordChange } = this;
    console.log(chordNotes(parse(currentChord)));
    return (
      <div className="App">
        <DontTouchContainer>
          <BasicPiano
            activeNotes={
              parse(currentChord)
                ? [2, 3, 4]
                    .map(octave =>
                      chordNotes(parse(currentChord)).map(e =>
                        MidiNumbers.fromNote(e + octave)
                      )
                    )
                    .reduce((p, c) => [...p, ...c])
                : []
            }
            renderNoteLabel={({ isActive, midiNumber }) => {
              if (isActive) {
                const note = noteNumberToName(midiNumber);
                return note.includes("-") ? note[0] : note.substring(0, 2);
              }
            }}
          />
        </DontTouchContainer>
        <input type="text" value={currentChord} onChange={onChordChange} />
        <p>{JSON.stringify(parse(currentChord))}</p>
      </div>
    );
  }
}

export default App;
