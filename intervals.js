const NOTES = [
    'Cb', 'C', 'C#',
    'Db', 'D', 'D#',
    'Eb', 'E', 'E#',
    'Fb', 'F', 'F#',
    'Gb', 'G', 'G#',
    'Ab', 'A', 'A#',
    'Bb', 'B', 'B#'
];

const NOTES_SHARP = [
    'C', 'C#',
    'D', 'D#',
    'E',
    'F', 'F#',
    'G', 'G#',
    'A', 'A#',
    'B',
]

const NOTES_BASE = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const INTERVALS = {
    m2: {
        semitone: 1,
        degrees: 2
    },

    M2: {
        semitone: 2,
        degrees: 2
    },

    m3: {
        semitone: 3,
        degrees: 3
    },

    M3: {
        semitone: 4,
        degrees: 3
    },
    P4: {
        semitone: 5,
        degrees: 4
    },

    P5: {
        semitone: 7,
        degrees: 5
    },

    m6: {
        semitone: 8,
        degrees: 6
    },

    M6: {
        semitone: 9,
        degrees: 8
    },

    m7: {
        semitone: 10,
        degrees: 7
    },

    M7: {
        semitone: 11,
        degrees: 7
    },

    P8: {
        semitone: 12,
        degrees: 8
    },

}

function convertToSharp(note) {
    const SPECIAL_NOTES = {
        'E#': 'F',
        'B#': 'C',
        'Fb': 'E',
        'Cb': 'B'
    }

    if (note in SPECIAL_NOTES) {
        return SPECIAL_NOTES[note];
    }

    if (note.length === 1 || note[1] !== 'b') {
        return note;
    }

    let newIndex = NOTES.indexOf(note) - 1;
    if (newIndex < 0) {
        return NOTES[NOTES.length - 1];
    }

    return NOTES[newIndex];
}

function findByDegree(noteWithSemitone, noteWithDegree) {
    let indexNoteWithDegree = NOTES_SHARP.indexOf(noteWithDegree);
    let indexNoteWithSemitone = NOTES_SHARP.indexOf(noteWithSemitone);
    let diff = indexNoteWithDegree - indexNoteWithSemitone;

    if (diff === 0) {
        return noteWithDegree;
    }
    else if (diff > 0) {
        return noteWithDegree + 'b'.repeat(diff);
    }
    else if (diff < 0) {
        return noteWithDegree + '#'.repeat(-diff);
    }
}

function addInterval(array, noteIndex, interval) {
    let newIndex = noteIndex + interval;

    if (newIndex > array.length) {
        newIndex -= array.length;
    }
    if (newIndex < 0) {
        newIndex += array.length;
    }
    return newIndex;
}

function validateArray(arr) {
    if (arr.length < 2 || arr.length > 3) {
        throw new Error('Illegal number of elements in input array');
    }
}

function intervalConstruction(arr) {
    validateArray(arr);
    let intervalName = arr[0];
    let noteName = arr[1];
    let noteNameSharp = convertToSharp(arr[1]);
    let direction = arr.length === 3 ? arr[2] : 'asc';
    let semitone = INTERVALS[intervalName].semitone;
    let degrees = INTERVALS[intervalName].degrees;
    let noteIndex = NOTES_SHARP.indexOf(noteNameSharp);
    let degreeResult;

    if (direction === 'asc') {
        let noteWithSemitone = NOTES_SHARP[addInterval(NOTES_SHARP, noteIndex, semitone)];
        let noteWithDegree =
            NOTES_BASE[addInterval(
                NOTES_BASE,
                NOTES_BASE.indexOf(noteName.charAt(0)),
                degrees) - 1];
        degreeResult = findByDegree(noteWithSemitone, noteWithDegree);
    }
    else {
        let noteWithSemitone = NOTES_SHARP[addInterval(NOTES_SHARP, noteIndex, -semitone)];
        let noteWithDegree =
            NOTES_BASE[addInterval(
                NOTES_BASE,
                NOTES_BASE.indexOf(noteName.charAt(0)),
                -degrees) + 1];

        degreeResult = findByDegree(noteWithSemitone, noteWithDegree);

    }
    return degreeResult;
}

function intervalIdentification(arr) {
    validateArray(arr);
    let firstNote = arr[0];
    let secondNote = arr[1];
    let direction = arr.length === 3 ? arr[2] : 'asc';
    let interval;
    validateArray(arr);
    
    for (const INTERVAL in INTERVALS) {
        let noteResult = intervalConstruction([
            INTERVAL,
            firstNote,
            direction
        ]);
        if (noteResult === secondNote) {
            interval = INTERVAL;
        }
    }

    return interval;
}
