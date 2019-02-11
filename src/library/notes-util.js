const notesSharp = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B"
];
const notesFlat = [
    "C",
    "Db",
    "D",
    "Eb",
    "E",
    "F",
    "Gb",
    "G",
    "Ab",
    "A",
    "Bb",
    "B"
];

export const moveNote = (note, step) => {
    let source = notesSharp.includes(note) ?
        notesSharp :
        notesFlat.includes(note) ?
        notesFlat :
        null;
    const noteIdx = source.indexOf(note);
    if (noteIdx !== undefined) {
        source = step > 0 ? notesSharp : notesFlat;
        step = step < 0 ? step + source.length : step;
        return source[(noteIdx + step) % source.length];
    }
};