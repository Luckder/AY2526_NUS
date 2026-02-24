const increment_repeater = repeater => f => x => f(repeater(f)(x));
    // Solved via pen and paper lol : https://imgur.com/a/D0uQwjB
const twice = f => x => f(f(x));
const thrice = increment_repeater(twice);
const fourtimes = increment_repeater(thrice);
const warn = thrice(display);
warn("ALERT");          // should display "ALERT"
                        // three times in orange
const bigwarn = fourtimes(display);
bigwarn("A L E R T");   // should display "A L E R T"
                        // four times in orange
                        // (the REPL will display
                        // "A L E R T" a fifth time
                        // [in white] as the value
                        // returned by bigwarn)
// Works as intended

//---------------------------------------------------------------------------------------------

const pair = (x, y) => f => f(x, y);
// https://imgur.com/a/D0uQwjB
const head = p => p((x, y) => x);  // complete lambda expression
const tail = p => p((x, y) => y);  // complete lambda expression

head(pair(1, 2)) === 1; // should return true
tail(pair(1, 2)) === 2; // should return true
// Works as intended

//---------------------------------------------------------------------------------------------

/*

Big-Ω(n)

*/

//---------------------------------------------------------------------------------------------

const zero_repeater = f => x => x;
const one_repeater = f => x => f(zero_repeater, () => zero_repeater(f)(x));
const two_repeater = f => x => f(one_repeater, () => one_repeater(f)(x));
const three_repeater = f => x => f(two_repeater, () => two_repeater(f)(x));
// No more writing on paper for the next two questions
const to_int = repeater => repeater((iter_count, x) => x() + 1)(0);

const increment_repeater = repeater => f => x => f(repeater(f)(x));// From Qn 1

// I managed to do it w/o using increment_repeater at all and I'm not sure
// how to use increment_reader to do it
const add_repeaters = (repeater1, repeater2) =>
                         f => x => repeater1(f)(repeater2(f)(x));

to_int(add_repeaters(two_repeater, three_repeater));  // should return 5
// Does return 5

//---------------------------------------------------------------------------------------------

const zero_repeater = f => x => x;
const one_repeater = f => x => f(zero_repeater, () => zero_repeater(f)(x));
const two_repeater = f => x => f(one_repeater, () => one_repeater(f)(x));
const three_repeater = f => x => f(two_repeater, () => two_repeater(f)(x));

const to_int = repeater => repeater((iter_count, x) => x() + 1)(0);

const decrement_repeater = repeater => f => x => repeater((iter_count,
                                                           placeholder) => 
                                                           iter_count(f)(x))(x);
// At least now for the 2nd attempt I can understand why 'placeholder' works
to_int(decrement_repeater(three_repeater));  // should return 2
// Does return 2
