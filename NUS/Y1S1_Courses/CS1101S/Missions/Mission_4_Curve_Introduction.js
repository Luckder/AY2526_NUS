// Part 1
// unit_line_at : (Number) -> Horizontal Line at Number as the y coordinate


// Part 2
function vertical_line(pt, length) {
    return t => t > 1 ? make_point(pt, pt + length)
                      : make_point(pt, t * length + pt);
}


// Part 3
// vertical_line : (Number1, Number2) -> Vertical line that starts from Number 1
// as the starting point for both x and y coordinates
// and has a length of Number2 from the starting point


// Part 4
draw_connected_2d(100)(vertical_line(0.3, 0.5));
// Line is fully enclosed in the 1 by 1 unit^2 box as requested

//---------------------------------------------------------------------------------------------

function three_quarters(pt) {
    function unit_circle(t) { 
        return make_point(math_cos(2 * math_PI * t), // <---- Does this space to the right of the comma count as whitespace?
                          math_sin(2 * math_PI * t));
    } // From Prof Boyd in Lecture
    
    return t => {
        if (t <= 0.75) {
            const p = unit_circle(t);
            return make_point(x_of(p) + x_of(pt), y_of(p) + y_of(pt)); // If comments exceed this 80 character limit, will I get penalised?
        } else {
            const p = unit_circle(0.75); // From t=0.75 to t=1, all the new points will be stuck being created at bottom of circle
            return make_point(x_of(p) + x_of(pt), y_of(p) + y_of(pt));
        } // Breaks up the coordinates of each point, adds x_of(pt) to x, and y_of(pt) to y, coordinates respectively, then returns the new point
    };
}

// Test
draw_connected_2d(200)(three_quarters(make_point(0.5, 0.25))); //Works

//---------------------------------------------------------------------------------------------

function s_generator(pt) {
    function unit_circle(t) {
        return make_point(math_cos(2 * math_PI * t),
                          math_sin(2 * math_PI * t));
    }

    return t => {
        if (t <= 0.75 / 2) {
            const p = unit_circle(2 * t);
            return make_point(x_of(p) + x_of(pt), y_of(p) + y_of(pt) + 1);
        } else if (t > 0.75 / 2 && t < 1 / 2) {
            const p = unit_circle(2 * 0.75 / 2);
            return make_point(x_of(p) + x_of(pt), y_of(p) + y_of(pt) + 1);
        } else if (t >= 1 / 2 && t <= 0.5 + 0.25 / 2) {
            const p = unit_circle(- 0.75);
            return make_point(- x_of(p) + x_of(pt),  y_of(p) + y_of(pt) - 1);
        } else {
            const p = unit_circle(2 * t);
            return make_point(- x_of(p) + x_of(pt),  y_of(p) + y_of(pt) - 1);
        }
    };
}

// Test
draw_connected_2d(200)(s_generator(make_point(0.5, 0.25)));
// Works for other coordinates of center of S curve
