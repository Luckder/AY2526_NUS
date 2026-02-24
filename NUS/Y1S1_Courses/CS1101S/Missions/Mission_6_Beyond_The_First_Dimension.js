function fractal(level, transformation, curve) {
    if (level === 0) {
        return curve;
    } else {
        return fractal(level - 1, transformation, transformation(curve));
    }
}

function levycize(curve) { // Pre-typed
    const f = math_sqrt(2) / 2;
    const scaled_curve = (scale(f, f, 1))(curve);
    return connect_rigidly(
        (rotate_around_origin(0, 0, math_PI / 4))(scaled_curve),
        (translate(0.5, 0.5, 0))
            ((rotate_around_origin(0, 0, - math_PI / 4))(scaled_curve)));
}

// Test
//draw_connected_2d(10000)(fractal(5, levycize, unit_line));// Works
draw_connected_2d(10000)(fractal(11, levycize, unit_line));

//---------------------------------------------------------------------------------------------

// copy your fractal function here
function fractal(level, transformation, curve) {
    if (level === 0) {
        return curve;
    } else {
        return fractal(level - 1, transformation, transformation(curve));
    }
}

function dragonize(curve) {
    return put_in_standard_position(
               connect_ends(
                   (rotate_around_origin(0, 0, - math_PI / 2))(invert(curve)),
                   curve));
}

// Test
draw_connected_2d(10000)(fractal(11, dragonize, unit_line));

//---------------------------------------------------------------------------------------------

function kochize(curve) {
    const up_60 = rotate_around_origin(0, 0, math_PI / 3);
    const down_60 = rotate_around_origin(0, 0, - math_PI / 3);
    return put_in_standard_position(
               connect_ends(curve,
                            connect_ends(up_60(curve),
                                         connect_ends(down_60(curve),
                                                      curve))));
}

// copy your fractal function here
function fractal(level, transformation, curve) {
    if (level === 0) {
        return curve;
    } else {
        return fractal(level - 1, transformation, transformation(curve));
    }
}

function snowflake(n) {
    const flake = fractal(n, kochize, unit_line);
    const top = connect_rigidly(
                    (rotate_around_origin(
                        math_PI, 0, - math_PI / 3))(invert(flake)),
                    flake);
    const bottom = connect_ends(
                       (rotate_around_origin(
                           0, 0, - math_PI * (2 / 3)))(flake),
                       top);

    return bottom;
}

// Test
draw_connected_2d(10000)(snowflake(5));
