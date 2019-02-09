const notesSharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const notesFlat = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const moveNote = (note, step) => {
    let source = notesSharp.includes(note) ? notesSharp : (notesFlat.includes(note) ? notesFlat : null)
    const noteIdx = source.indexOf(note)
    if (noteIdx !== undefined) {
        source = step > 0 ? notesSharp : notesFlat;
        step = step < 0 ? step + source.length : step;
        return source[(noteIdx + step) % source.length]
    }
}

const thirdsInterval = {
    'Major': 0,
    'Minor': -1,
    'Augmented': 0,
    'Diminished': -1
};
const fifthInterval = {
    'Major': 0,
    'Minor': 0,
    'Augmented': 1,
    'Diminished': -1
}
const extendedSeventhInterval = {
    'Major7': 0,
    'Minor7': -1,
    'Dominant7': -1,
    'Diminished7': -2,

    'Major9': 0,
    'Minor9': -1,
    'Dominant9:': -1,
    'Diminished9': -2,
}

const extendedNinthInterval = {
    'Major9': 0,
    'Minor9': 0,
    'Dominant9': 0,
    'Diminished9': 0
}

export const chordNotes = (chord, options = {}) => {
    if (chord) {
        const {
            root,
            quality,
            extended,
            overridingRoot
        } = chord;
        const {
            rootless,
            fifthless
        } = options;
        let notes = []
        if (!rootless) notes.push(root);
        const third = moveNote(moveNote(root, 4), thirdsInterval[quality])
        notes.push(third);
        if (!fifthless) {
            const fifth = moveNote(moveNote(root, 7), fifthInterval[quality])
            notes.push(fifth);
        }
        if (extended) {
            if (extended in extendedSeventhInterval) {
                const seventh = moveNote(moveNote(root, 11), extendedSeventhInterval[extended])
                notes.push(seventh);
            }
            if (extended in extendedNinthInterval) {
                const ninth = moveNote(moveNote(root, 14), extendedNinthInterval[extended])
                notes.push(ninth);
            }
        }
        if (overridingRoot) {
            notes = notes.filter(note => note !== overridingRoot);
            notes.unshift(overridingRoot)
        }
        return notes;
    }
}