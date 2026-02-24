const drum_envelope = adsr(0.05, 0.95, 0, 0);

function snare_drum(note, duration) {
    return drum_envelope(noise_sound(duration)); // From Question
}

function bass_drum(note, duration) {
    const sine = x => sine_sound(x, duration); // From Question

    // Creates a list of integers from a to b inclusive
    // Copy-Pasted from my code for one of the paths
    function my_enum_list(a, b) {
        if (a <= b && is_number(a) && is_number(b)) {
            return a > b ? null : pair(a, my_enum_list(a + 1, b));
        } else {
            return null;
        }
    }

    // Takes a list and returns a list of only prime numbers within it
    // Copy-Pasted from my code for one of the paths
    function prime_only(xs) {
        function helper(n) {
            if (n < 2) {
                return false;
            } else {
                const limit = math_round(math_sqrt(n));
                const A = a => {
                    return a > limit
                       ? true
                       : n % a === 0
                       ? false
                       : A(a + 1);
                };

                return A(2);
            }
        }
        return filter(helper, xs);
    }

    return drum_envelope( // From Question
               simultaneously(
                   map(sine, prime_only(my_enum_list(75, 150)))));
}

function mute(note, duration) { // From Question
    return drum_envelope(silence_sound(duration));
}

/*
    In all my life experience drumming, and using MIDI tools like FL studio,
    this is a very bad bass drum (kick drum) sound
*/

// Test
//play(snare_drum(50, 0.2));

//play(bass_drum(50, 0.2));

// play(consecutively(list(snare_drum(50, 0.2), mute(0, 0.2),
//                         bass_drum(50, 0.2), mute(0, 0.2),
//                         snare_drum(50, 0.2), mute(0, 0.2),
//                         bass_drum(50, 0.2))));

// Undertale drum sequence, 1 bar only, Slowed down to 60 Beats Per Minute            
play(consecutively(list(bass_drum(50, 0.25), mute(0, 0.25),
                        snare_drum(50, 0.25), bass_drum(50, 0.25),
                        mute(0, 0.25), bass_drum(50, 0.25),
                        snare_drum(50, 0.25), bass_drum(50, 0.25),
                        mute(0, 0.25), bass_drum(50, 0.25),
                        snare_drum(50, 0.25), bass_drum(50, 0.25),
                        bass_drum(50, 0.25), mute(0, 0.25),
                        snare_drum(50, 0.25), mute(0, 0.25))));

//---------------------------------------------------------------------------------------------

function generate_list_of_note(letter_name, list_of_interval) {
    const start_midi = letter_name_to_midi_note(letter_name);// First Midi note
    const len = length(list_of_interval); // len is length of list

    // Helper function that returns a list of all midi notes given the
    // interval list
    const helper = (x, xs, n, l) => is_null(xs)
                         ? null
                         : n === 0
                         ? pair(x, helper(x, xs, n + 1, l))
                         : n > l
                         ? null
                         : pair(x + head(xs),
                                helper(x + head(xs), tail(xs), n + 1, l));

    return helper(start_midi, list_of_interval, 0, len);
}

const major_scale_interval = list(2, 2, 1, 2, 2, 2, 1, // From Question
                                  -1, -2, -2, -2, -1, -2, -2);
// From Question
const c_major_scale = generate_list_of_note("C4", major_scale_interval);

//display(c_major_scale);

function list_to_sound(list_of_midi_note, duration, instrument) {
    // Helper function that will mapped to each element in the list to make
    // a sound of that midi note with universal duration for this code block
    const helper = x => instrument(x, duration);

    return consecutively(map(helper, list_of_midi_note));
}

// From Question
const c_major_scale_sound = list_to_sound(c_major_scale, 0.4, cello);
//play(c_major_scale_sound); // WORKS

// From Question
const harmonic_minor_scale_interval = list(2, 1, 2, 2, 1, 3, 1,
                                           -1, -3, -1, -2, -2, -1, -2);

// From Question
const melodic_minor_scale_interval = list(2, 1, 2, 2, 2, 2, 1,
                                          -2, -2, -1, -2, -2, -1, -2);

// From Question
const c_harmonic_minor_scale = generate_list_of_note(
                                   "C4", harmonic_minor_scale_interval);

// From Question
const c_harmonic_minor_scale_sound = list_to_sound(
                                         c_harmonic_minor_scale, 0.4, cello);

//play(c_harmonic_minor_scale_sound); // WORKS

// From Question
const c_melodic_minor_scale = generate_list_of_note(
                                  "C4", melodic_minor_scale_interval);

// From Question
const c_melodic_minor_scale_sound = list_to_sound(
                                        c_melodic_minor_scale, 0.4, cello);

play(c_melodic_minor_scale_sound);

//---------------------------------------------------------------------------------------------

// copy your functions generate_list_of_note and list_to_sound
// from the previous Question here

function generate_list_of_note(letter_name, list_of_interval) {
    const start_midi = letter_name_to_midi_note(letter_name);// First Midi note
    const len = length(list_of_interval); // len is length of list

    // Helper function that returns a list of all midi notes given the
    // interval list
    const helper = (x, xs, n, l) => is_null(xs)
                         ? null
                         : n === 0
                         ? pair(x, helper(x, xs, n + 1, l))
                         : n > l
                         ? null
                         : pair(x + head(xs),
                                helper(x + head(xs), tail(xs), n + 1, l));

    return helper(start_midi, list_of_interval, 0, len);
}

function list_to_sound(list_of_midi_note, duration, instrument) {
    // Helper function that will mapped to each element in the list to make
    // a sound of that midi note with universal duration for this code block
    const helper = x => instrument(x, duration);

    return consecutively(map(helper, list_of_midi_note));
}

// Both From Question
const major_arpeggio_interval = list(4, 3, 5, 4, 3, 5);
const minor_arpeggio_interval = list(3, 4, 5, 3, 4, 5);

// Given Function
function generate_arpeggio(letter_name, list_of_interval) {
    return generate_list_of_note(letter_name, list_of_interval);
}

// Okay, if all those memories of self-teaching myself drums and piano serve
// me well, then the jump between each natural notes consists of either 1 
// flat/sharp key, or none (semitone); so intervals, EXCLUSIVE, starting
// from C has the recurring pattern 1, 1, 0, 1, 1, 1, 0. We skip some natural
// tones so pattern becomes, EXCLUSIVE, 3, 2, 4

function arpeggiator_up(arpeggio, duration_each, instrument) {
    const len = length(arpeggio);
    
    // Helper function that will combine all lists into one big list, where all
    // elements of the greater list are midi notes following the question
    // requirements.
    const helper = (xs, n) => {
    // For my own Reference
    // 1  2  3  4 ; 2  3  4  5 ; 3  4  5  6 ; 4  5  6  7
    // +3 +2 +4  -6  +2 +4 +3 -7 +4 +3 +2 -5  +3 +2 +4

        if (n === 1) {
            return append(xs, helper(map(x => x + 3, xs), n + 1));
        } else if (n === 2) {
            return append(xs, helper(map(x => x + 2, xs), n + 1));
        } else if (n === 3) {
            return append(xs, helper(map(x => x + 4, xs), n + 1));
        } else if (n === 4) {
            return append(xs, helper(map(x => x - 6, xs), n + 1));
        } else if (n === 5) {
            return append(xs, helper(map(x => x + 2, xs), n + 1));
        } else if (n === 6) {
            return append(xs, helper(map(x => x + 4, xs), n + 1));
        } else if (n === 7) {
            return append(xs, helper(map(x => x + 3, xs), n + 1));
        } else if (n === 8) {
            return append(xs, helper(map(x => x - 7, xs), n + 1));
        } else if (n === 9) {
            return append(xs, helper(map(x => x + 4, xs), n + 1));
        } else if (n === 10) {
            return append(xs, helper(map(x => x + 3, xs), n + 1));
        } else if (n === 11) {
            return append(xs, helper(map(x => x + 2, xs), n + 1));
        } else if (n === 12) {
            return append(xs, helper(map(x => x - 5, xs), n + 1));
        } else if (n === 13) {
            return append(xs, helper(map(x => x + 3, xs), n + 1));
        } else if (n === 14) {
            return append(xs, helper(map(x => x + 2, xs), n + 1));
        } else if (n === 15) {
            return append(xs, helper(map(x => x + 4, xs), n + 1));
        } else {
            return xs;
        }
    };

    if (len < 4) {
        return silence_sound(0); // From Question
    } else {
        return list_to_sound(helper(arpeggio, 1), duration_each, instrument);
    }
}

// Test

// I checked the code and it should be correct,
// the math checks out, each arpeggio has 6+1=7 notes, and the sawtooth has 16
// arpeggios so in total, 7x16=112 notes, and each note has 0.1s of duration,
// so total duration is 112x0.1s=11.2s which is what I got.

play(arpeggiator_up(generate_arpeggio("C4", major_arpeggio_interval),
                    0.1,
                    cello));

//---------------------------------------------------------------------------------------------

function simplify_rhythm(rhythm) {
    // if rhythm is a pair
    if (is_pair(rhythm) && is_number(tail(rhythm))
        && is_list(head(rhythm)) && !is_null(head(rhythm))) {

        const nums_to_repeat = tail(rhythm);
        const li = head(rhythm);

        const helper = (xs, n) => {
            return n === 1
                   ? simplify_rhythm(xs)
                   : append(simplify_rhythm(xs), helper(xs, n - 1));
        };

        return helper(li, nums_to_repeat);

      // if rhythm is a list of integers or list of lists
    } else if (is_list(rhythm) && !is_null(rhythm)) {

        // Question has clearly stated that rhythm, if not a pair,
        // can only be either a list of rhythms or a list of lists of rhythms,
        // not a mix, hence just checking if one of the element in the list
        // is a list will suffice to ascertain
        // the type of list we are dealing with

        // if rhythm is a list of lists
        if (is_list(head(rhythm))){
            const len = length(rhythm);

            const helper = (xs, n, l) => {
                return n === l
                       ? head(xs)
                       : append(head(xs), helper(tail(xs), n + 1, l));
            };

            return helper(rhythm, 1, len);

          // if rhythm is a list of integers
        } else if (is_number(head(rhythm))) {
            return rhythm;
          // if a pair inside is detected
        } else if (is_pair(head(rhythm))){
            const nums_to_repeat = tail(head(rhythm));
            const li = head(head(rhythm));
    
            const helper = (xs, n) => {
                return n === 1
                       ? simplify_rhythm(xs)
                       : append(simplify_rhythm(xs), helper(xs, n - 1));
            };

            return append(helper(li, nums_to_repeat),
                       simplify_rhythm(tail(rhythm)));
        } else {
            return display("Fatal Error");
        }

    } else { // Error handling
        const A = " a simple rhythm";
        const B = " a list of rhythms";
        const C = " a pair whose head is a Rhythm and whose tail is a Number";
        return display("Please input" + A + "," + B + ", or" + C + ".");
    }
}

// Test
const my_rhythm = pair(list(pair(list(1,2,0,1), 2), list(1,3,0,1,3,1,0,3)), 3);
const my_simple_rhythm = simplify_rhythm(my_rhythm);
display_list(my_simple_rhythm);

const correct_simple_rhythm = list(1,2,0,1,1,2,0,1,1,3,0,1,3,1,0,3,1,2,0,1,1,
        2,0,1,1,3,0,1,3,1,0,3,1,2,0,1,1,2,0,1,1,3,0,1,3,1,0,3);
        
// Please tell me if my code is hard-coded, that is, it only worked by chance
equal(my_simple_rhythm, correct_simple_rhythm); // Returns TRUE

//---------------------------------------------------------------------------------------------

const drum_envelope = adsr(0.05, 0.95, 0, 0);

// paste your snare_drum, mute and simplify_rhythm
// from Questions 1 and 4 here
function snare_drum(note, duration) {
    return drum_envelope(noise_sound(duration)); // From Question
}

function mute(note, duration) { // From Question
    return drum_envelope(silence_sound(duration));
}

function simplify_rhythm(rhythm) {
    // if rhythm is a pair
    if (is_pair(rhythm) && is_number(tail(rhythm))
        && is_list(head(rhythm)) && !is_null(head(rhythm))) {

        const nums_to_repeat = tail(rhythm);
        const li = head(rhythm);

        const helper = (xs, n) => {
            return n === 1
                   ? simplify_rhythm(xs)
                   : append(simplify_rhythm(xs), helper(xs, n - 1));
        };

        return helper(li, nums_to_repeat);

      // if rhythm is a list of integers or list of lists
    } else if (is_list(rhythm) && !is_null(rhythm)) {

        // Question has clearly stated that rhythm, if not a pair,
        // can only be either a list of rhythms or a list of lists of rhythms,
        // not a mix, hence just checking if one of the element in the list
        // is a list will suffice to ascertain
        // the type of list we are dealing with

        // if rhythm is a list of lists
        if (is_list(head(rhythm))){
            const len = length(rhythm);

            const helper = (xs, n, l) => {
                return n === l
                       ? head(xs)
                       : append(head(xs), helper(tail(xs), n + 1, l));
            };

            return helper(rhythm, 1, len);

          // if rhythm is a list of integers
        } else if (is_number(head(rhythm))) {
            return rhythm;
          // if a pair inside is detected
        } else if (is_pair(head(rhythm))){
            const nums_to_repeat = tail(head(rhythm));
            const li = head(head(rhythm));

            const helper = (xs, n) => {
                return n === 1
                       ? simplify_rhythm(xs)
                       : append(simplify_rhythm(xs), helper(xs, n - 1));
            };

            return append(helper(li, nums_to_repeat),
                       simplify_rhythm(tail(rhythm)));
        } else {
            return display("Fatal Error");
        }

    } else { // Error handling
        const A = " a simple rhythm";
        const B = " a list of rhythms";
        const C = " a pair whose head is a Rhythm and whose tail is a Number";
        return display("Please input" + A + "," + B + ", or" + C + ".");
    }
}

function percussions(distance, list_of_sounds, rhythm) {
    // Makes a new list of sounds based on the index
    const beats = map(n => list_ref(list_of_sounds, n),
                      // Because the rhythm here is a simple list of integers
                      // simplify_rhythm function was not necessary, but to
                      // appease the question, I have added it here
                      simplify_rhythm(rhythm));

    // Make a new list whereby each increasing element has an increasing
    // delay before it starts
    const delays = (xs, n, d) => {
        return is_null(tail(xs))
               ? pair(consecutively(list(silence_sound(d * n), head(xs))),
                      null)
               : pair(consecutively(list(silence_sound(d * n), head(xs))),
                      delays(tail(xs), n + 1, d));
    };

    // Have to use simultaneously along with delays lambda function to ensure
    // drum envelope is sustained and not cut off
    return simultaneously(delays(beats, 0, distance));
}

// Test
const my_mute_sound = mute(50, 0.7);
const my_snare_drum = snare_drum(50, 0.7);
const my_cello = cello(50, 0.7);
const my_bell = bell(72, 1);
play(percussions(0.5,
         list(my_mute_sound,
              my_snare_drum,
              my_cello,
              my_bell),
         list(1,2,1,0,3,1,0))); // WORKS


// Below is miscellaneous
function bass_drum(note, duration) {
    const sine = x => sine_sound(x, duration); // From Question

    // Creates a list of integers from a to b inclusive
    // Copy-Pasted from my code for one of the paths
    function my_enum_list(a, b) {
        if (a <= b && is_number(a) && is_number(b)) {
            return a > b ? null : pair(a, my_enum_list(a + 1, b));
        } else {
            return null;
        }
    }

    // Takes a list and returns a list of only prime numbers within it
    // Copy-Pasted from my code for one of the paths
    function prime_only(xs) {
        function helper(n) {
            if (n < 2) {
                return false;
            } else {
                const limit = math_round(math_sqrt(n));
                const A = a => {
                    return a > limit
                       ? true
                       : n % a === 0
                       ? false
                       : A(a + 1);
                };

                return A(2);
            }
        }
        return filter(helper, xs);
    }

    return drum_envelope( // From Question
               simultaneously(
                   map(sine, prime_only(my_enum_list(75, 150)))));
}

const my_bass_drum = bass_drum(50, 0.7);
// play(percussions(0.35,
//                  list(my_mute_sound, my_bass_drum, my_snare_drum),
//                  list(1, 0, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 1, 0, 2, 0)));
