import {
    moveNote
} from './notes-util';

const thirdsInterval = {
    Major: 0,
    Minor: -1,
    Augmented: 0,
    Diminished: -1
};
const fifthInterval = {
    Major: 0,
    Minor: 0,
    Augmented: 1,
    Diminished: -1
};
const extendedSeventhInterval = {
    Major7: 0,
    Minor7: -1,
    Dominant7: -1,
    MinorMajor7: 0,
    Diminished7: -2,

    Major9: 0,
    Minor9: -1,
    Dominant9: -1,
    Diminished9: -2
};

const extendedNinthInterval = {
    Major9: 0,
    Minor9: 0,
    Dominant9: 0,
    Diminished9: 0
};

const applyAltered = note => alter =>
    moveNote(
        note, {
            sharp: 1,
            flat: -1
        } [alter]
    );
export const chordNotes = (chord, options = {}) => {
    if (chord) {
        const {
            root,
            quality,
            extended,
            suspended,
            overridingRoot,
            altered
        } = chord;
        const {
            rootless,
            fifthless
        } = options;
        let notes = [];
        if (!rootless) notes.push(root);
        let third;
        if (suspended === "Sus4") third = moveNote(root, 5)
        else if (suspended === 'Sus2') third = moveNote(root, 2)
        else third = moveNote(moveNote(root, 4), thirdsInterval[quality]);
        if (altered && "3" in altered) third = applyAltered(third)(altered[3]);
        notes.push(third);

        if (!fifthless) {
            let fifth = moveNote(moveNote(root, 7), fifthInterval[quality]);
            if (altered && "5" in altered) fifth = applyAltered(fifth)(altered[5]);
            notes.push(fifth);
        }
        if (extended) {
            if (extended in extendedSeventhInterval) {
                let seventh = moveNote(
                    moveNote(root, 11),
                    extendedSeventhInterval[extended]
                );
                if (altered && "7" in altered)
                    seventh = applyAltered(seventh)(altered[7]);
                notes.push(seventh);
            }
            if (extended in extendedNinthInterval) {
                let ninth = moveNote(
                    moveNote(root, 14),
                    extendedNinthInterval[extended]
                );
                if (altered && "9" in altered) ninth = applyAltered(ninth)(altered[9]);
                notes.push(ninth);
            }
        }
        if (overridingRoot) {
            notes = notes.filter(note => note !== overridingRoot);
            notes.unshift(overridingRoot);
        }
        return notes;
    }
};