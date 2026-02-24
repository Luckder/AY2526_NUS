// My contest entry

//count_tokens(`
function runes_contest() {
    // I could not find a random_integer function under Maths for Source §1
    const i = () => math_round(math_random()); // This returns 1 or 0 with a slight bias for 1 (a bit)
    
    const n = 1 + i()*2 + i()*4; // My custom made random_integer function, basically how bits in binary (base2) work
// ^ I replaced i()*1 ∵ if all i() returns 0 & ∴ n=0, you just get a singular rcross rune without having been make_cross()-ed

    return repeat_pattern(n, r=>make_cross(r), random_color(rcross)); // <3 Lambda
    //Could have added more stuff, if not for the 50 character limit for scoring; 54 characters in total
}
//`);

// Keep this show function call
show(runes_contest()); // SPAM/repeatedly click "Shift-Enter" keys or "Run" button for intended effect
