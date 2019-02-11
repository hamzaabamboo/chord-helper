import {
    moveNote
} from "./notes-util";

const scales = {
    major: [0, 2, 4, 5, 7, 9, 11]
}

const types = {
    major: ['maj7', 'm7', 'm7', 'maj7', '7', 'm7', 'dim7']
}

export const scale = (root, type = "major") => {
    return scales[type].map(interval => moveNote(root, interval)).map((note, i) => note + types[type][i]);
}