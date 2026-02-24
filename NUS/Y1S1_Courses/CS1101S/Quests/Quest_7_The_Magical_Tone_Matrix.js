// Question 1

// copy generate_list_of_note from Mission "Musical Diversions"
function generate_list_of_note(letter_name, list_of_interval) {
    const start_midi = letter_name_to_midi_note(letter_name); // 1st Midi note
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

const pentatonic_list_of_interval = list(2, 2, 3, 2, 3);

// repeat_pattern from Lecture L2

function repeat_pattern(n, pattern, rune) {
    return n === 0 ? rune : repeat_pattern(n - 1, pattern, pattern(rune));
}

function repeated_scale(note, list_of_interval, n, duration, instrument) {

    const duplicate = xs => append(list_of_interval, xs);

    const li = repeat_pattern(n - 1, duplicate, list_of_interval);

    const helper = x => instrument(x, duration);

    return map(helper, generate_list_of_note(note, li));
}

play(consecutively(repeated_scale("C4", pentatonic_list_of_interval,
                                  2, 1, cello)));

//---------------------------------------------------------------------------------------------

// Question 2

// Leftwards is positive delta time, Upwards is going through list of sounds
function play_matrix(duration, list_of_sounds) {

    if (length(list_of_sounds) === 16) {
        function plays() {
            const matrix = get_matrix(); // Rows of booleans

            const sound_to_play = x => {

                const column_16_x = (n, x) => {
                    return n > 15
                           ? null
                           : pair(list_ref(list_ref(matrix, n), x),
                                  column_16_x(n + 1, x));
                };

                const traverse = (li, xs, z) => {
                     return z > 15
                            ? null
                            : head(li)
                            ? pair(head(xs),
                                   traverse(tail(li), tail(xs), z + 1))
                            : traverse(tail(li), tail(xs), z + 1);
                };

                const prepared = traverse(column_16_x(0, x),
                                          list_of_sounds,
                                          0);

                const mapper = h => consecutively(
                                        list(silence_sound(x * duration), h));

                const delayed = map(mapper, prepared);

                return simultaneously(delayed);
            };

            const to_play = g => {
                return g > 15 ? null : pair(sound_to_play(g), to_play(g + 1));
            };

            // wtf this function still plays even after leaving this page
            set_timeout(plays, duration * 16 * 1000);

            return play(simultaneously(to_play(0)));
        }

        return plays();
    } else {
        return display("List of sounds is not 16 elements long!");
    }
}

function stop_matrix() { // Type this in REPL to stop
    return clear_all_timeout();
}

// copy your functions generate_list_of_note and repeated_scale
// from Question 1 here
function generate_list_of_note(letter_name, list_of_interval) {
    const start_midi = letter_name_to_midi_note(letter_name); // 1st Midi note
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

const pentatonic_list_of_interval = list(2, 2, 3, 2, 3);

// repeat_pattern from Lecture L2

function repeat_pattern(n, pattern, rune) {
    return n === 0 ? rune : repeat_pattern(n - 1, pattern, pattern(rune));
}

function repeated_scale(note, list_of_interval, n, duration, instrument) {

    const duplicate = xs => append(list_of_interval, xs);

    const li = repeat_pattern(n - 1, duplicate, list_of_interval);

    const helper = x => instrument(x, duration);

    return map(helper, generate_list_of_note(note, li));
}

const sounds = repeated_scale(
                   "C4", pentatonic_list_of_interval, 3, 0.2, cello);

play_matrix(0.5, sounds);
