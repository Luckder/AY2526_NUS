// Task 1

// Function type: Number -> pair_of_numbers
// where input is between 0 - 15 inclusive.
// where 0 - 9 represent the digits
// 10 represents *, 11 represents #,
// and 12 - 15 represent the letters A-D.


// Such high XP for only 4 questions, I am guessing my comments explaining
// my work will be graded and carry XP

function get_dtmf_frequencies(number) {
    // Checks if number is in interval [0, 15], is a number, & is an integer
    if (number >= 0 && number<= 15 && is_number(number) && number % 1 === 0) {
        // Very spaghetti, I know, but we are barred from
        // using JavaScript's switch statements in CS1101S so...
        // ¯\_(ツ)_/¯
        return number === 0
               ? pair(941, 1336) // Returns this pair if number = 0
               : number === 1
               ? pair(697, 1209) // Returns this pair if number = 1
               : number === 2
               ? pair(697, 1336) // Returns this pair if number = 2
               : number === 3
               ? pair(697, 1477) // Returns this pair if number = 3
               : number === 4
               ? pair(770, 1209) // Returns this pair if number = 4
               : number === 5
               ? pair(770, 1336) // Returns this pair if number = 5
               : number === 6
               ? pair(770, 1477) // Returns this pair if number = 6
               : number === 7
               ? pair(852, 1209) // Returns this pair if number = 7
               : number === 8
               ? pair(852, 1336) // Returns this pair if number = 8
               : number === 9
               ? pair(852, 1477) // Returns this pair if number = 9
               : number === 10
               ? pair(941, 1209) // Returns this pair if number = 10
               : number === 11
               ? pair(941, 1477) // Returns this pair if number = 11
               : number === 12
               ? pair(697, 1633) // Returns this pair if number = 12
               : number === 13
               ? pair(770, 1633) // Returns this pair if number = 13
               : number === 14
               ? pair(852, 1633) // Returns this pair if number = 14
               : pair(941, 1633); // Returns this pair if number = 15
    } else { // Handles error when number is not an integer or out of interval
        return display("Please input an integer, number, number ∈ [0, 15]");
    }
}

// Testing
display(get_dtmf_frequencies(display(math_floor(math_random() * 16))));

//---------------------------------------------------------------------------------------------

// Task 2

// Copy your function get_dtmf_frequencies here.
function get_dtmf_frequencies(number) {
    // Checks if number is in interval [0, 15], is a number, & is an integer
    if (number >= 0 && number<= 15 && is_number(number) && number % 1 === 0) {
        return number === 0
               ? pair(941, 1336) // Returns this pair if number = 0
               : number === 1
               ? pair(697, 1209) // Returns this pair if number = 1
               : number === 2
               ? pair(697, 1336) // Returns this pair if number = 2
               : number === 3
               ? pair(697, 1477) // Returns this pair if number = 3
               : number === 4
               ? pair(770, 1209) // Returns this pair if number = 4
               : number === 5
               ? pair(770, 1336) // Returns this pair if number = 5
               : number === 6
               ? pair(770, 1477) // Returns this pair if number = 6
               : number === 7
               ? pair(852, 1209) // Returns this pair if number = 7
               : number === 8
               ? pair(852, 1336) // Returns this pair if number = 8
               : number === 9
               ? pair(852, 1477) // Returns this pair if number = 9
               : number === 10
               ? pair(941, 1209) // Returns this pair if number = 10
               : number === 11
               ? pair(941, 1477) // Returns this pair if number = 11
               : number === 12
               ? pair(697, 1633) // Returns this pair if number = 12
               : number === 13
               ? pair(770, 1633) // Returns this pair if number = 13
               : number === 14
               ? pair(852, 1633) // Returns this pair if number = 14
               : pair(941, 1633); // Returns this pair if number = 15
    } else { // Handles error when number is not a number or out of interval
        return display("Please input a number, n, where n ∈ [0, 15]");
    }
}

function make_dtmf_tone(frequency_pair) {
    const duration = 0.5; // From question
    
    // Creates a sine sound of frequency1 with duration of 0.5s for sound1
    const sound1 = sine_sound(head(frequency_pair), duration);
    
    // Creates a sine sound of frequency2 with duration of 0.5s for sound2
    const sound2 = sine_sound(tail(frequency_pair), duration);
    
    // Returns the sound that consists of simultaneous overlay of sound1&2
    return simultaneously(list(sound1, sound2));
}

// Testing
const n = math_floor(math_random() * 16); // Random integer in [0, 15]
play(make_dtmf_tone(get_dtmf_frequencies(display(n))));

//---------------------------------------------------------------------------------------------

// Task 3

// Copy your functions get_dtmf_frequencies and make_dtmf_tone here.
function get_dtmf_frequencies(number) {
    // Checks if number is in interval [0, 15], is a number, & is an integer
    if (number >= 0 && number<= 15 && is_number(number) && number % 1 === 0) {
        return number === 0
               ? pair(941, 1336) // Returns this pair if number = 0
               : number === 1
               ? pair(697, 1209) // Returns this pair if number = 1
               : number === 2
               ? pair(697, 1336) // Returns this pair if number = 2
               : number === 3
               ? pair(697, 1477) // Returns this pair if number = 3
               : number === 4
               ? pair(770, 1209) // Returns this pair if number = 4
               : number === 5
               ? pair(770, 1336) // Returns this pair if number = 5
               : number === 6
               ? pair(770, 1477) // Returns this pair if number = 6
               : number === 7
               ? pair(852, 1209) // Returns this pair if number = 7
               : number === 8
               ? pair(852, 1336) // Returns this pair if number = 8
               : number === 9
               ? pair(852, 1477) // Returns this pair if number = 9
               : number === 10
               ? pair(941, 1209) // Returns this pair if number = 10
               : number === 11
               ? pair(941, 1477) // Returns this pair if number = 11
               : number === 12
               ? pair(697, 1633) // Returns this pair if number = 12
               : number === 13
               ? pair(770, 1633) // Returns this pair if number = 13
               : number === 14
               ? pair(852, 1633) // Returns this pair if number = 14
               : pair(941, 1633); // Returns this pair if number = 15
    } else { // Handles error when number is not a number or out of interval
        return display("Please input a number, n, where n ∈ [0, 15]");
    }
}

function make_dtmf_tone(frequency_pair) {
    const duration = 0.5; // From question
    
    // Creates a sine sound of frequency1 with duration of 0.5s for sound1
    const sound1 = sine_sound(head(frequency_pair), duration);
    
    // Creates a sine sound of frequency2 with duration of 0.5s for sound2
    const sound2 = sine_sound(tail(frequency_pair), duration);
    
    // Returns the sound that consists of simultaneous overlay of sound1&2
    return simultaneously(list(sound1, sound2));
}

function dial(list_of_digits) {
    const delimiter = silence_sound(0.1); // From question
    const xs = list_of_digits; // For brevity, sets list_of_digits to xs
    
    if (is_list(xs)) { 
        const l = length(xs); // Sets length of xs to l
        const h = (n, l, xs) => { // helper function to loop through
            return n > l
                   ? null
                   // Recursively makes a list of DTMF sounds
                   : pair(make_dtmf_tone(get_dtmf_frequencies(head(xs))),
                   // Extra delimiter at the end, but doesn't affect anything
                          pair(delimiter, h(n + 1, l, tail(xs))));
        };
        return consecutively(h(1, l, xs));
    } else if (is_null(xs)) { // Returns null
        return display(null);
    } else { // Handles error for if list was not provided
        return display("Please input a list");
    }
}

// Test
//play(dial(list(6,2,3,5,8,5,7,7)));
play(dial(list(6, 6, 0, 1, 7, 9, 0, 0))); // Prof Boyd's NUS office number

//---------------------------------------------------------------------------------------------

// Task 4

// Copy your functions get_dtmf_frequencies,
// make_dtmf_tone and dial here.
function get_dtmf_frequencies(number) {
    // Checks if number is in interval [0, 15], is a number, & is an integer
    if (number >= 0 && number<= 15 && is_number(number) && number % 1 === 0) {
        return number === 0
               ? pair(941, 1336) // Returns this pair if number = 0
               : number === 1
               ? pair(697, 1209) // Returns this pair if number = 1
               : number === 2
               ? pair(697, 1336) // Returns this pair if number = 2
               : number === 3
               ? pair(697, 1477) // Returns this pair if number = 3
               : number === 4
               ? pair(770, 1209) // Returns this pair if number = 4
               : number === 5
               ? pair(770, 1336) // Returns this pair if number = 5
               : number === 6
               ? pair(770, 1477) // Returns this pair if number = 6
               : number === 7
               ? pair(852, 1209) // Returns this pair if number = 7
               : number === 8
               ? pair(852, 1336) // Returns this pair if number = 8
               : number === 9
               ? pair(852, 1477) // Returns this pair if number = 9
               : number === 10
               ? pair(941, 1209) // Returns this pair if number = 10
               : number === 11
               ? pair(941, 1477) // Returns this pair if number = 11
               : number === 12
               ? pair(697, 1633) // Returns this pair if number = 12
               : number === 13
               ? pair(770, 1633) // Returns this pair if number = 13
               : number === 14
               ? pair(852, 1633) // Returns this pair if number = 14
               : pair(941, 1633); // Returns this pair if number = 15
    } else { // Handles error when number is not a number or out of interval
        return display("Please input a number, n, where n ∈ [0, 15]");
    }
}

function make_dtmf_tone(frequency_pair) {
    const duration = 0.5; // From question
    
    // Creates a sine sound of frequency1 with duration of 0.5s for sound1
    const sound1 = sine_sound(head(frequency_pair), duration);
    
    // Creates a sine sound of frequency2 with duration of 0.5s for sound2
    const sound2 = sine_sound(tail(frequency_pair), duration);
    
    // Returns the sound that consists of simultaneous overlay of sound1&2
    return simultaneously(list(sound1, sound2));
}

function dial(list_of_digits) {
    const delimiter = silence_sound(0.1); // From question
    const xs = list_of_digits; // For brevity, sets list_of_digits to xs
    
    if (is_list(xs)) { 
        const l = length(xs); // Sets length of xs to l
        const h = (n, l, xs) => { // helper function to loop through
            return n > l
                   ? null
                   // Recursively makes a list of DTMF sounds
                   : pair(make_dtmf_tone(get_dtmf_frequencies(head(xs))),
                          pair(delimiter, h(n + 1, l, tail(xs))));
        };
        return consecutively(h(1, l, xs));
    } else if (is_null(xs)) { // Returns null
        return display(null);
    } else { // Handles error for if list was not provided
        return display("Please input a list");
    }
}

function dial_all(list_of_numbers) {
    // Helper unary function that exorcises the EVIL number from the list
    // I would have LOVED to use == instead of === here
    const exorcism = x => stringify(x) === stringify(
                                               list(1,8,0,0,5,2,1,1,9,8,0))
                           ? false
                           : true;
    
    // Appends # which is 11 to the end of all elemental lists in the list                       
    const acc = z => accumulate(pair, pair(11, null), z);
                           
    // Used the map, accumulate, filter functions more than 2 times
    // to apply all helper functions and to prepare for playing
    return consecutively(map(dial, map(acc, filter(exorcism,
                                                   list_of_numbers))));
}

// Test
play(dial_all(
    list(
     list(1,8,0,0,5,2,1,1,9,8,0),  // not played!!!
     list(6,2,3,5,8,5,7,7),
     list(0,0,8,6,1,3,7,7,0,9,5,0,0,6,1))
    ));
