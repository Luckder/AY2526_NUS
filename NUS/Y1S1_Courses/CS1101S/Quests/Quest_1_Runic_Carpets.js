const paw = from_url("https://i.imgur.com/4jv7XPQ.jpeg"); //Doge, nothing offensive

function besiden(n, rune1){
    
    return n === 1 ? rune1 : beside_frac(1/n, rune1, besiden(n-1, rune1));
    
}

function persian(rune, count) {
    
    // I wanted to add an if else statement to 'break' the function if count < 3
        
    const centreSquare = make_cross(rune);
    
    const row = besiden(count-2, rune);

    const column = stackn(count, rune);
    
    const missingColumns = turn_upside_down(stack_frac(1/count, turn_upside_down(row), turn_upside_down(stack_frac(1/(count-1), row, centreSquare))));
    
    const nowWithColumns = turn_upside_down(beside_frac(1/count, turn_upside_down(column), turn_upside_down(beside_frac(1/(count-1), column, missingColumns))));

    return nowWithColumns;

    
}

// Tests

//show(persian(heart, 7)); WORKS
//show(persian(make_cross(rcross), 5)); WORKS
show(persian(paw, 5));
