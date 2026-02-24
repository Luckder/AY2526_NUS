// YOU GET A DIFFERENT SHAPE EACH TIME!

//count_tokens(`
function curves_contest() {
// We had Epitrochoids (Cardioids, Nephroids), Lévy C curves,
// Harter-Heighway dragon curves, Koch curves,
// Sierpiński-Menger snowflakes, and Menger sponges.
// Now for even more cool math art:
// 
// Hypotrochoid, bascially the inverse of Epitrochoid,
// FYI, Hypotrochoids and Epitrochoids are known as Spinographs
// 
// The Butterfly Curve
//
// Fermat's Spiral
// 
// Lissajous Curve

    const g = () => math_round(math_random());
    const r = 14 + g() * 4 + g() * 8;
    const n = math_floor(math_random() * 4) + 1;
    const d = (n) => n === 1 // I would rather use a Switch statement here :(
                     ? display("Hypotrochoid")
                     : n === 2
                     ? display("Butterfly Curve")
                     : n === 3
                     ? display("Fermat's Spiral")
                     : display("Lissajous Curve");

    d(n);
    display("r was " + stringify(r));

    function sexy_curve(t) {
        // I have linked the animation videos for visualisation

        const angle = t * r * math_PI; // [0, 1] becomes [0, r * pi]

        if (n === 1) { // Hypotrochoid : https://www.youtube.com/watch?v=KyW_BBums_c

            // Define the values for the radii and length of the circles
            // MESS AROUND HERE!
            const R = 25; // Radius of the fixed circle
            //const r = 18; // Radius of the rolling circle
            const d = 3; // Distance of point from center of inner moving circle

            // Calculate the x and y coordinates based on the formula
            // Formula is free and available on the internet for all maths lovers
            const x = (R - r) * math_cos(4 * angle) + d * math_cos(((R - r) / r) * 4 * angle);
            const y = (R - r) * math_sin(4 * angle) - d * math_sin(((R - r) / r) * 4 * angle);

            return make_point(x, y);

        } else if (n === 2) { // The Butterfly Curve : https://www.youtube.com/watch?v=l4a0MqzIDds

            // Calculate the x and y coordinates based on the formula
            // Formula is free and available on the internet for all maths lovers
            const x = math_sin(angle) * (math_pow(math_E, math_cos(angle)) - 2 * math_cos(4 * angle) - math_pow(math_sin(angle / 12), 5));
            const y = math_cos(angle) * (math_pow(math_E, math_cos(angle)) - 2 * math_cos(4 * angle) - math_pow(math_sin(angle / 12), 5));

            return make_point(x, y);

        } else if (n === 3) { // Fermat's Spiral : https://www.youtube.com/watch?v=3ueD-qRnHLw

            // Calculate the x and y coordinates based on the formula
            // Formula is free and available on the internet for all maths lovers
            const x = math_sqrt(angle) * math_cos(angle);
            const y = math_sqrt(angle) * math_sin(angle);

            return make_point(x, y);

        } else { // Lissajous Curve : https://www.youtube.com/watch?v=kQ7A_bO0Efo

            // Calculate the x and y coordinates based on the formula
            // Formula is free and available on the internet for all maths lovers
            const x = math_sin(12 * angle);
            const y = math_sin(r * angle + math_PI);

            return make_point(x, y);

        }
    }

    if (n === 3) {

        const l = g() === 1 ? 1 : - 1;
        const close = c => t => make_point(l * x_of(c(1 - t)), - y_of(c(1 - t)));

        return draw_connected_full_view(10000)(connect_ends(close(sexy_curve), sexy_curve));

    } else {

        return draw_connected_full_view(10000)(sexy_curve);

    }
}
//`);

curves_contest(); // YOU GET A DIFFERENT SHAPE EACH TIME!
// You can also get other shapes : https://www.youtube.com/watch?v=Ey-W3xwNJU8
