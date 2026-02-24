const test_curve =
    t => make_point(t, 0.5 + (math_sin(4 * (math_PI * t)) / 2));

function stack(c1, c2) {
    return t => {
        if (t <= 0.5) {
            return translate(0, 0.5, 0)(scale(1, 0.5, 1)(c1))(2 * t);
        } else {
            return translate(0, 0, 0)(scale(1, 0.5, 1)(c2))(2 * t - 1);
        }
    };
}

// Test
draw_points(10000)(stack(test_curve, test_curve)); // Works

//---------------------------------------------------------------------------------------------

const test_curve = t => make_point(t, 0.5 + (math_sin(4 * (math_PI * t)) / 2));

// const upper = 
    //RuneFunctions.translate(0, -(1 - frac),
        //RuneFunctions.scale_independent(1, frac, rune1));
// const lower =
    //RuneFunctions.translate(0, frac,
        //RuneFunctions.scale_independent(1, 1 - frac, rune2));
        
// LOL the above is from Source Academy's Github for stack_frac function
// literally just tweak the code abit for this question >w< OSINT FTW

function stack_frac(frac, c1, c2) {
    if (!(frac >= 0 && frac <= 1)){
        return "frac value must be in the interval [0, 1];" +
               " ∀ frac ∈ Q, frac ∈ [0, 1] <---> code_works(frac)";
    } else {
        return t => {
            if (t <= frac) {
                return translate(0, 1 - frac, 0)
                           (scale(1, frac, 1)(c1))((1 / frac) * t);
            } else {
                return translate(0, 0, 0)
                           (scale(1, 1 - frac, 1)(c2))((1 / frac) * t - 1);
            }
        };
    }
}

// Test
draw_points(10000)(stack_frac(1 / 5,
                  test_curve,
                  stack_frac(1 / 2, test_curve, test_curve))); // WORKS
