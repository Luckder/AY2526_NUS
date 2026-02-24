import { repeat_pattern } from 'rune';
//I am interpreting the question as preventing me from using other functions from 'rune'
//So that means no overlay_frac

function translate_left(shape, n){
    return translate(shape, n, 0, 0); //moves shape along x-axis by n units
}

function translate_down(shape, n){
    return translate(shape, 0, n, 0); //moves shape along y-axis by n units
}

function translate_through(shape, n){
    return translate(shape, 0, 0, n); //moves shape along z-axis by n units
}

function make_bigger(shape, n){
    return scale(shape, n, n, n); //scales shape along all axes by n factor
}

function make_base(shape){
    const half_base = union(translate_left(make_bigger(shape, 0.5), 0.5),
                            make_bigger(shape, 0.5));
    
    return union(translate_down(half_base, 0.5), half_base);
}

function make_top(shape){
    return translate_left(
                translate_down(
                    translate_through(make_bigger(shape, 0.5), 0.5)
                , 0.25),
            0.25);
}

function full_base(shape){
    return union(make_top(shape), make_base(shape));
}

function sierpiński(o) {
    return full_base(o);
}

function hypofractional(n, s) {
    return repeat_pattern(n, sierpiński, s);
}

// Testing
//Grid and Axes were helpful to show width, depth, and height of 1 unit

//render_grid_axes(sierpiński(pyramid("F54927"))); //WORKS
//render_grid_axes(hypofractional(3, pyramid("F54927"))); //WORKS

//render(sierpiński(unit_pyramid)); //WORKS
//render(sierpiński(unit_cylinder)); //WORKS
//render(hypofractional(3, unit_cube)); //WORKS
//render(hypofractional(5, unit_pyramid)); //WORKS

// I get an error when doing hypofractional() for unit_sphere, not required to show but why?



//Below is for menger

function small_menger(shape){
    return make_bigger(shape, 1/3);
}

function menger_row(shape){
    const row = union(translate_left(small_menger(shape), 2/3),
                      union(translate_left(small_menger(shape), 1/3),
                      small_menger(shape)));
    
    return row;
}

function make_menger_base(shape){
    const first = union(translate_down(menger_row(shape), 2/3),
                        menger_row(shape));
    
    const second = union(translate_down(small_menger(shape), 1/3),
                         translate_left(translate_down(small_menger(shape),
                                                       1/3), 2/3)
                        );
    
    return union(first, second);
}

function menger(shape){
    const top_bottom = union(make_menger_base(shape),
                             translate_through(make_menger_base(shape), 2/3));
                             
    const first = union(small_menger(shape), translate_left(small_menger(shape), 2/3));
    
    const second = union(first, translate_down(first, 2/3));
                             
    return union(top_bottom, translate_through(second, 1/3));
}

//render_grid_axes(menger(unit_cube)); //WORKS
//render(repeat_pattern(3, menger, unit_cube)); //WORKS



//Below is for sierpiński_menger

function sierpiński_menger(shape){
    const unit = small_menger(shape); // for brevity
    const row = union(unit, translate_left(unit, 2/3));
    const base = union(row, translate_down(row, 2/3));
    const missing_centre = union(base, translate_through(base, 2/3));
    const centre = translate_through(translate_down(translate_left(unit, 1/3), 1/3), 1/3);
    
    const smallest = union(centre, missing_centre);
    
    return smallest;
}


//render(sierpiński_menger(unit_cube)); //WORKS
render(repeat_pattern(3, sierpiński_menger, unit_cube)); //WORKS
