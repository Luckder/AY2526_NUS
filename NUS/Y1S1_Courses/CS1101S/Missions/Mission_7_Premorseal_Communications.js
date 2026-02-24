// Task 1

function noise_sound(duration) {
    const wave = t => math_random() * 2 - 1; // t ∈ [-1, 1)
    return make_sound(wave, duration);
}

function cut_sound(sound, duration) {
    if (duration < get_duration(sound) && duration >= 0) {
        const wave = get_wave(sound);
        const new_sound = make_sound(wave, duration);
        return new_sound;
    } else {
        display("New duration needs to be less than old duration & positive.");
        return sound;
    }
}

// Play test sound.
play(cut_sound(noise_sound(2), 1)); // duration 2 becomes duration 1
// IDK why the REPL keeps displaying a lambda function as a result.
// I'm just gonna assume that this is normal for this mission.

//---------------------------------------------------------------------------------------------

// Task 2

function sine_sound(freq, duration) {
    const wave = t => math_sin(2 * math_PI * freq * t);
    return make_sound(wave, duration);
}

// Play test sound.
play(sine_sound(500, 1));

//---------------------------------------------------------------------------------------------

// Task 3

// Copy your own sine_sound function from the previous question here.
function sine_sound(freq, duration) {
    const wave = t => math_sin(2 * math_PI * freq * t);
    return make_sound(wave, duration);
}

function two_consecutively(s1, s2) {
    const total_duration = get_duration(s1) + get_duration(s2);
    const new_wave = t => t <= get_duration(s1)
                          ? get_wave(s1)(t)
                          : get_wave(s2)(t - get_duration(s1));
    return make_sound(new_wave, total_duration);
}

const my_sine_1 = sine_sound(500, 1);
const my_sine_2 = sine_sound(750, 2);

// Play test sound.
play(two_consecutively(my_sine_1, my_sine_2));

//---------------------------------------------------------------------------------------------

// Task 4

// Copy your own sine_sound function from the previous question here.
function sine_sound(freq, duration) {
    const wave = t => math_sin(2 * math_PI * freq * t);
    return make_sound(wave, duration);
}

// Copy your own two_consecutively function from the previous question here.
function two_consecutively(s1, s2) {
    const total_duration = get_duration(s1) + get_duration(s2);
    const new_wave = t => t <= get_duration(s1)
                          ? get_wave(s1)(t)
                          : get_wave(s2)(t - get_duration(s1));
    return make_sound(new_wave, total_duration);
}

function consecutively(list_of_sounds) {
    if (is_list(list_of_sounds)) {
        if (is_null(list_of_sounds)) {
            return display("Cannot concatenate empty list");
        } else {
            const loop = (remaining_sounds, accumulated_sound) => 
                is_null(remaining_sounds)
                ? accumulated_sound
                : loop(tail(remaining_sounds),
                       two_consecutively(accumulated_sound,
                                         head(remaining_sounds)));
    
            return loop(tail(list_of_sounds), head(list_of_sounds));
        }
    } else {
        return display("Please provide a list.");
    }
}

const my_sine_1 = sine_sound(500, 0.5);
const my_sine_2 = sine_sound(750, 1);
const my_sine_3 = sine_sound(625, 0.5);

// Play test sound.
play(consecutively(list(my_sine_1, my_sine_2, my_sine_3)));

//---------------------------------------------------------------------------------------------

// Task 5

// Copy your own sine_sound function from the previous question here.
function sine_sound(freq, duration) {
    const wave = t => math_sin(2 * math_PI * freq * t);
    return make_sound(wave, duration);
}

// Copy your own two_consecutively function from the previous question here.
function two_consecutively(s1, s2) {
    const total_duration = get_duration(s1) + get_duration(s2);
    const new_wave = t => t <= get_duration(s1)
                          ? get_wave(s1)(t)
                          : get_wave(s2)(t - get_duration(s1));
    return make_sound(new_wave, total_duration);
}

// Copy your own consecutively function from the previous question here.
function consecutively(list_of_sounds) {
    if (is_list(list_of_sounds)) {
        const len = length(list_of_sounds);
        const li = list_of_sounds; // For brevity

       const loop = (l, s, i) => i < len
                                 ? loop(tail(l),
                                       two_consecutively(s, head(l)),
                                       i + 1)
                                 : s;

        return loop(tail(li), head(li), 1);
    } else {
        return display("Please provide a list.");
    }
}

const dot_duration = 0.125;
const dash_duration = 3 * dot_duration;

// Create dot, dash and pause sounds first.
const dot_sound = sine_sound(800, dot_duration);
const dash_sound = sine_sound(800, dash_duration);
const dot_pause = sine_sound(0, dot_duration);
const dash_pause = sine_sound(0, dash_duration);

// Create sounds for each letter.
const S_sound = consecutively(list(dot_sound,
                                   dot_pause,
                                   dot_sound,
                                   dot_pause,
                                   dot_sound));
const O_sound = consecutively(list(dash_sound,
                                   dot_pause,
                                   dash_sound,
                                   dot_pause,
                                   dash_sound));

// Build the signal out of letter sounds and pauses.
const distress_signal = consecutively(list(S_sound,
                                           dash_pause,
                                           O_sound,
                                           dash_pause,
                                           S_sound));

// Play distress signal.
play(distress_signal); // WORKS


// Below is for Titanic's Last Distress Message

// const word_duration = 7 * dot_duration;
// const word_pause = sine_sound(0, word_duration);

// const A_sound = consecutively(list(dot_sound, dot_pause, dash_sound));
// const C_sound = consecutively(list(dash_sound, dot_pause, dot_sound,
//                                   dot_pause, dash_sound,
//                                   dot_pause, dot_sound));
// const D_sound = consecutively(list(dash_sound, dot_pause, dot_sound,
//                                   dot_pause, dot_sound));
// const E_sound = dot_sound;
// const G_sound = consecutively(list(dash_sound, dot_pause, dash_sound,
//                                   dot_pause, dot_sound));
// const H_sound = consecutively(list(dot_sound, dot_pause, dot_sound,
//                                   dot_pause, dot_sound,
//                                   dot_pause, dot_sound));
// const I_sound = consecutively(list(dot_sound, dot_pause, dot_sound));
// const K_sound = consecutively(list(dash_sound, dot_pause, dot_sound,
//                                   dot_pause, dash_sound));
// const N_sound = consecutively(list(dash_sound, dot_pause, dot_sound));
// const Q_sound = consecutively(list(dash_sound, dot_pause, dash_sound,
//                                   dot_pause, dot_sound,
//                                   dot_pause, dash_sound));
// const R_sound = consecutively(list(dot_sound, dot_pause, dash_sound,
//                                   dot_pause, dot_sound));
// const T_sound = dash_sound;
// const W_sound = consecutively(list(dot_sound, dot_pause, dash_sound,
//                                   dot_pause, dash_sound));

// const titanic_last_message = consecutively(list(
//                                     // CQD
//                                  C_sound, dash_pause, Q_sound, dash_pause,
//                                  D_sound, word_pause,
//                                     // SOS
//                                  S_sound, dash_pause, O_sound, dash_pause,
//                                  S_sound, word_pause,
//                                     // This
//                                  T_sound, dash_pause, H_sound, dash_pause,
//                                  I_sound, dash_pause, S_sound, word_pause,
//                                     // is
//                                  I_sound, dash_pause, S_sound, word_pause,
//                                     // Titanic
//                                  T_sound, dash_pause, I_sound, dash_pause,
//                                  T_sound, dash_pause, A_sound, dash_pause,
//                                  N_sound, dash_pause, I_sound, dash_pause,
//                                  C_sound, word_pause,
//                                     // We
//                                  W_sound, dash_pause, E_sound, word_pause,
//                                     // are
//                                  A_sound, dash_pause, R_sound, dash_pause,
//                                  E_sound, word_pause,
//                                     // sinking
//                                  S_sound, dash_pause, I_sound, dash_pause,
//                                  N_sound, dash_pause, K_sound, dash_pause,
//                                  I_sound, dash_pause, N_sound, dash_pause,
//                                  G_sound
                                 
//                                  ));

// play(titanic_last_message);
