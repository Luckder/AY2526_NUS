// s_generator from Mission "Curve Introduction" is predeclared
const s_curve = s_generator(make_point(0, 0));

function reflect_through_y_axis(curve) {
    return t => make_point(- x_of(curve(t)), y_of(curve(t)));
}// Breaks up coordinates, negates x-coordinate, reforms coordinates

const reflected_s_curve = reflect_through_y_axis(s_curve);
draw_connected_2d(200)(reflected_s_curve);

//---------------------------------------------------------------------------------------------

// your solution from Question 1
function reflect_through_y_axis(curve) {
    return t => make_point(- x_of(curve(t)), y_of(curve(t)));
}

const s_curve = s_generator(make_point(0,0));
const reflected_s_curve = reflect_through_y_axis(s_curve);

function close(curve) {
    return t => t <= 1 / 2 ? curve(2 * t) : curve(1 - (2 * t - 1));
}
// For t <= 1/2, curve is sped up to complete the drawing, then for 0.5<t<=1,
// curve retraces the entire graph but goes from down to up, reversed

draw_connected_2d(200)(connect_ends(close(s_curve), reflected_s_curve));
