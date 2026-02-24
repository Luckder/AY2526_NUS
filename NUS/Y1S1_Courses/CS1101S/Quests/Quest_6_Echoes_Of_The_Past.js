function backward(sound) {
    const duration = get_duration(sound);
    const old_wave = get_wave(sound);
    const new_wave = t => old_wave(duration - t);

    return make_sound(new_wave, duration);
}

                                        // step 0: press "Run"

//init_record();                        // step 1 in REPL

//const my_voice = record_for(2, 0.2);  // step 2 in REPL

//play(backward(my_voice()));           // step 3 in REPL

//play(backward(backward(my_voice()))); // step 3 in REPL

//---------------------------------------------------------------------------------------------

function repeat(n, sound) {
    if (is_number(n) && n >= 0) {
        if (n === 0) {
            return silence_sound(0);
        } else {
            const sound_list = n => n === 0
                                    ? null
                                    : pair(sound, sound_list(n - 1));

            return consecutively(sound_list(n));
        }
    } else {
        display("Please input a non-negative integer.");
        return sound;
    }
}

// Test
const my_sound = consecutively(
    list(sine_sound(400, 1), sine_sound(800, 1)));
const my_repeated = repeat(3, my_sound);
play(my_repeated);

//---------------------------------------------------------------------------------------------

function fast_forward(n, sound) {
    if (n > 0 && is_number(n)) {
        const duration = get_duration(sound);
        const wave = get_wave(sound);
        
        const new_wave = t => wave(n * t);
        const new_duration = duration / n;
        
        return make_sound(new_wave, new_duration);
    } else {
        display("Please input a positive integer.");
        return sound;
    }
}

//                                      // step 0: press "Run"

// init_record();                       // step 1 in REPL

// const my_voice = record_for(2, 0.2); // step 2 in REPL

// play(fast_forward(2, my_voice()));   // step 3 in REPL

//---------------------------------------------------------------------------------------------

function echo(n, d, sound) {
    
    if (n >= 0 && is_number(n)) {
        const duration = get_duration(sound);
        const wave = get_wave(sound);
        const N = n;
    
        const delay = silence_sound(d);
        
        const sound_list = n => n < 0
                                ? null
                                : pair(make_sound(
                                      t => wave(t) * math_pow(2, n - N),
                                      duration),
                                      pair(delay, sound_list(n - 1)));
        
        return consecutively(sound_list(n));
    } else {
        display("Please input a non-negative integer.");
        return sound;
    }
}

// Test 1
const test_sound = sine_sound(800, 0.2);
play(echo(2, 0.4, test_sound));

// Test 2
//                                      // step 0: press "Run"

// init_record();                       // step 1 in REPL

// const my_voice = record_for(2, 0.2); // step 2 in REPL

// play(echo(2, 0.4, my_voice()));      // step 3 in REPL

//---------------------------------------------------------------------------------------------

// Copy your functions backward, repeat,
// fast_forward and echo here.

function backward(sound) {
    const duration = get_duration(sound);
    const old_wave = get_wave(sound);
    const new_wave = t => old_wave(duration - t);

    return make_sound(new_wave, duration);
}

function repeat(n, sound) {
    if (is_number(n) && n >= 0) {
        if (n === 0) {
            return silence_sound(0);
        } else {
            const sound_list = n => n === 0
                                    ? null
                                    : pair(sound, sound_list(n - 1));

            return consecutively(sound_list(n));
        }
    } else {
        display("Please input a non-negative integer.");
        return sound;
    }
}

function fast_forward(n, sound) {
    if (n > 0 && is_number(n)) {
        const duration = get_duration(sound);
        const wave = get_wave(sound);
        
        const new_wave = t => wave(n * t);
        const new_duration = duration / n;
        
        return make_sound(new_wave, new_duration);
    } else {
        display("Please input a positive integer.");
        return sound;
    }
}

function echo(n, d, sound) {
    
    if (n >= 0 && is_number(n)) {
        const duration = get_duration(sound);
        const wave = get_wave(sound);
        const N = n;
    
        const delay = silence_sound(d);
        
        const sound_list = n => n === 0
                                ? null
                                : pair(make_sound(
                                      t => wave(t * math_pow(2, n - N)),
                                      duration),
                                      pair(delay, sound_list(n - 1)));
        
        return consecutively(sound_list(n));
    } else {
        display("Please input a non-negative integer.");
        return sound;
    }
}

function make_alien_jukebox(sound) {
    return n => n === 0
                ? play(sound)
                : n === 1
                ? play(backward(sound))
                : n === 2
                ? play(fast_forward(0.5, sound))
                : n === 3
                ? play(repeat(3, fast_forward(2, sound)))
                : n === 4
                ? play(echo(4, 0.3, backward(sound)))
                : display("Please input a n integer between 0 & 4 inclusive.");
}

// Press "Run"

// Then test in REPL:

// init_record();

// const erksh_voice = record_for(1, 0.2);

// const j = make_alien_jukebox(erksh_voice());

// j(0);  // plays original recording

// j(1);  // plays it backward

// j(2);  // plays it at half speed

// j(3);  // plays it at double speed, three times in a row

// j(4);  // plays it backward with 4-times echo,
//        //     with 0.3 seconds echo delay
