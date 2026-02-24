const connect_numbers =
    n => draw_connected_2d(n)(unit_circle);

connect_numbers(5); // Indeed returns a Drawing of a pentagon

//---------------------------------------------------------------------------------------------

const connect_results =
    (n, f) => draw_connected_2d(n)(t => unit_circle(f(math_round(t * n)) / n));

const star =
    (n, step) => connect_results(n, k => (step * k));//Replace 2 with step

star(11, 4); //Works as intended

//---------------------------------------------------------------------------------------------

const connect_results =
    (n, f) => draw_connected_2d(n)(t => unit_circle(f(math_round(t * n)) / n));

const wheel = (n) =>
    n >= 4 && n % 2 === 0
    ? connect_results(3 * n, k => {
                        const v = 3 * math_round((k - 1) / 3);
                        return k % 3 === 1 ? v + (n / 2 * 3) : v;
                        })
    : "n is either not even or not more than, or equal to, 4";

wheel(100);
//wheel(8); // Works as well

//---------------------------------------------------------------------------------------------

const connect_results =
    (n, f) =>
        draw_connected_2d(n)
        (t => unit_circle(f(math_round(t * n)) / n));
// Using pen and paper to compartmentalise the lambda expressions really helps
const connect_laps =
    (n, g) =>
    connect_results(n * 3,
                    k => { const v = math_round((k - 1) / 3);
                           return k % 3 === 1 ? g(v)*3 : v * 3; }
                   );


const draw_times_table = (n, m) => connect_laps(n, k => k * m % n);


//draw_times_table(100, 2);      // m = 2: cardioid: 1 lobe
//draw_times_table(100, 3);      // m = 3: nephroid: 2 lobes
//draw_times_table(100, 4);      // m = 4: 3 lobes...

//draw_times_table(397, 200);    // m = (n + 3) / 2: cardioid
//draw_times_table(500, 252);    // m = (n + 4) / 2: nephroid
//draw_times_table(501, 253);    // m = (n + 5) / 2: 3 lobes...

//draw_times_table(500, 168);    // m = (n + 4) / 3: cardioid
//draw_times_table(295, 100);    // m = (n + 5) / 3: nephroid
//draw_times_table(594, 200);    // m = (n + 6) / 3: 3 lobes...

//draw_times_table(395, 100);    // m = (n + 5) / 4: cardioid
//draw_times_table(494, 100);    // m = (n + 6) / 5: cardioid
//draw_times_table(593, 100);    // m = (n + 7) / 6: cardioid...

// also nice:
//draw_times_table(400, 201);    // m = n / 2 + 1 (/4,/8,/16)
draw_times_table(200, 99);     // m = (n / 2) - 1: square pattern

//They all look very nice, I do not know how it works but I trust the math
//from the video linked in the question. I guess that is the beauty
//of OOP's 1/4 core principle: Abstraction.
