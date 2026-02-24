function fractal(pic, n) {
    
    return n === 1 ? pic : beside(pic, fractal(stack(pic, pic), n-1));
    
}

// Test
show(fractal(make_cross(rcross), 3));
//show(fractal(make_cross(rcross), 5)); //WORKS FOR 5 AS WELL

//---------------------------------------------------------------------------------------------

function hook(frac){
    
    return stack(square, quarter_turn_right(stack_frac(frac, square, blank))); //Could not get beside_frac to work
    
}

// Test
show(hook(1/5));
//show(hook(1/2)); //WORKS
//show(0); //WORKS
//show(1); //WORKS

//---------------------------------------------------------------------------------------------

function hook(frac){
    
    return stack(square, quarter_turn_right(stack_frac(frac, square, blank)));
    
}

function spiral(thickness, depth) {
    
    return depth === 0
    
    ? blank
    
    : stack_frac(thickness,
    quarter_turn_right( stack_frac(thickness, quarter_turn_left(hook(1/2)),
    quarter_turn_left(hook(0)) ) ), quarter_turn_right(spiral(thickness, depth - 1)));
}

// Test
show(spiral(1/5, 20));
//show(spiral(1, 1)); //WORKS
//show(spiral(1 / 2, 1)); //WORKS
//show(spiral(1 / 5, 1)); //WORKS
//show(spiral(1 / 5, 2)); //WORKS
//show(spiral(1 / 5, 3)); //WORKS
//show(spiral(0, 20)); //HOWS BLANK
//show(spiral(1 / 5, 0)); //HOWS BLANK
