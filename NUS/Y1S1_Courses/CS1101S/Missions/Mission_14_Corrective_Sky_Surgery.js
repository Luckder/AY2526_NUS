// TASK 1

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 10;

function my_first_filter(src, dest) {
    const width = image_width();
    const height = image_height();

    if (width >= 256 && height >= 256) {

        const x_proportion = 255 / width;
        const y_proportion = 255 / height;

        for (let y = 0; y < height; y = y + 1) {

            for (let x = 0; x < width; x = x + 1) {
                dest[y][x][0] = y_proportion * y; // R
                dest[y][x][1] = x_proportion * x; // G
                dest[y][x][2] = 255 - x_proportion * x - y_proportion * y; // B
                dest[y][x][3] = 255; // Opacity
            }
        }
    }
}
// Different gradient of colour change dependent on how many pixels of image
// so the gradient would look dissimilar to the image provided by the mission
// if a different camera which outputs different pixel numbers are used.
install_filter(my_first_filter);
set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

//---------------------------------------------------------------------------------------------

// TASK 2

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 15;
const limit = 220; // 220 * 50 = 11000 pixels
// I do not believe there are any contemporary monitors 
// with greater than 11000 pixels horizontally

function copy(src, dest) {
    const width = image_width();
    const height = image_height();

    if (width >= 256 && height >= 256) {

        for (let i = 0; i < height; i = i + 1) {
            for (let j = 0; j < width; j = j + 1) {
               dest[i][j][0] = src[i][j][0];
               dest[i][j][1] = src[i][j][1];
               dest[i][j][2] = src[i][j][2];
               dest[i][j][3] = src[i][j][3];
            }
        }
    }
}

function crosshair(src, dest) {
    const width = image_width();
    const height = image_height();

    if (width >= 256 && height >= 256) {
        const center_x = width / 2;
        const center_y = height / 2;

         for (let i = 0; i < height; i = i + 1) {
            for (let j = 0; j < width; j = j + 1) {

                const dx = j - center_x;
                const dy = i - center_y;
                const ds = dx * dx + dy * dy;

                dest[i][j][0] = src[i][j][0];
                dest[i][j][1] = src[i][j][1];
                dest[i][j][2] = src[i][j][2];
                dest[i][j][3] = src[i][j][3];

                for (let k = 0; k < limit; k = k + 1) {
                    if (ds >= (25 + k * 50) * (25 + k * 50)
                        && ds <= (50 + k * 50) * (50 + k * 50)) {
                        dest[i][j][2] = 255;
                    }
                }

                if (i === height / 2 || j === width / 2) {
                    dest[i][j][0] = 255;
                    dest[i][j][1] = 0;
                    dest[i][j][2] = 0;
                }
            }
        }
    }
}

install_filter(copy);
install_filter(crosshair);
set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

//---------------------------------------------------------------------------------------------

// TASK 3

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 15;

function zoom(factor) {
    return (src, dest) => {
        const width = image_width();
        const height = image_height();

        if (width >= 256 && height >= 256) {
            const cx = width / 2;
            const cy = height / 2;

            for (let i = 0; i < height; i = i + 1) {
                for (let j = 0; j < width; j = j + 1) {

                    const src_i = math_floor((i - cy) / factor + cy);
                    const src_j = math_floor((j - cx) / factor + cx);

                    dest[i][j][0] = src[src_i][src_j][0];
                    dest[i][j][1] = src[src_i][src_j][1];
                    dest[i][j][2] = src[src_i][src_j][2];
                    dest[i][j][3] = src[src_i][src_j][3];
                }
            }
        }
    };
}

install_filter(zoom(2));
set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

//---------------------------------------------------------------------------------------------

// TASK 4

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 15;

function flip_vertically(src, dest) {
    const width = image_width();
    const height = image_height();

    for (let i = 0; i < height; i = i + 1) {
        for (let j = 0; j < width; j = j + 1) {
            for (let k = 0; k < 4; k = k + 1) {
                dest[i][j][k] = src[height - 1 - i][j][k];
            }
        }
    }
}

function color_invert(src, dest) {
    const width = image_width();
    const height = image_height();

    for (let i = 0; i < height; i = i + 1){
        for (let j = 0; j < width; j = j + 1){
            for (let c = 0; c < 4; c = c + 1) {
                dest[i][j][c] = c < 3 ? 255 - src[i][j][c] : src[i][j][c];
            }
        }
    }
}


// Copy your solution for Task 3 (zoom) here.
function zoom(factor) {
    return (src, dest) => {
        const width = image_width();
        const height = image_height();

        if (width >= 256 && height >= 256) {
            const cx = width / 2;
            const cy = height / 2;

            for (let i = 0; i < height; i = i + 1) {
                for (let j = 0; j < width; j = j + 1) {

                    const src_i = math_floor((i - cy) / factor + cy);
                    const src_j = math_floor((j - cx) / factor + cx);

                    dest[i][j][0] = src[src_i][src_j][0];
                    dest[i][j][1] = src[src_i][src_j][1];
                    dest[i][j][2] = src[src_i][src_j][2];
                    dest[i][j][3] = src[src_i][src_j][3];
                }
            }
        }
    };
}


function make_image(width, height) {
    const img = [];
    for (let i = 0; i < height; i = i + 1) {
        const row = [];
        img[i] = row;
        for (let j = 0; j < width; j = j + 1) {
            const pixel = [];
            row[j] = pixel;
            for (let z = 0; z < 4; z = z + 1) {
                pixel[z] = 255;
            }
        }
    }
    return img;
}

function stack(filter1, filter2) {
    const temp1 = make_image(WIDTH, HEIGHT);
    const temp2 = make_image(WIDTH, HEIGHT);

    return (src, dest) => {
        const width = image_width();
        const height = image_height();
        const half_height = math_floor(height / 2);

        filter1(src, temp1);
        filter2(src, temp2);

        for (let i = 0; i < half_height; i = i + 1) {
            dest[i] = temp1[i * 2];
            dest[i + half_height] = temp2[i * 2];
        }

        // take last row from temp2, if height is odd
        for (let i = half_height * 2; i < height; i = i + 1) {
            dest[i] = temp2[i];
        }
    };
}

function beside(filter1, filter2) {
    const temp1 = make_image(WIDTH, HEIGHT);
    const temp2 = make_image(WIDTH, HEIGHT);

    return (src, dest) => {
        const width = image_width();
        const height = image_height();
        const half_width = math_floor(width / 2);

        filter1(src, temp1);
        filter2(src, temp2);

        for (let j = 0; j < height; j = j + 1) {
            for (let i = 0; i < half_width; i = i + 1) {
                dest[j][i] = temp1[j][i * 2];
                dest[j][i + half_width] = temp2[j][i * 2];
            }

            // take last row from temp2, if height is odd
            for (let i = half_width * 2; i < height; i = i + 1) {
                dest[j][i] = temp2[j][i];
            }
        }
    };
}


install_filter(stack(beside(flip_vertically, color_invert),
                     beside(copy_image, zoom(2))));

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

//---------------------------------------------------------------------------------------------

// TASK 5

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 15;

function flip_vertically(src, dest) {
    const width = image_width();
    const height = image_height();

    for (let i = 0; i < height; i = i + 1) {
        for (let j = 0; j < width; j = j + 1) {
            for (let k = 0; k < 4; k = k + 1) {
                dest[i][j][k] = src[height - 1 - i][j][k];
            }
        }
    }
}

function color_invert(src, dest) {
    const width = image_width();
    const height = image_height();

    for (let i = 0; i < height; i = i + 1){
        for (let j = 0; j < width; j = j + 1){
            for (let c = 0; c < 4; c = c + 1) {
                dest[i][j][c] = c < 3 ? 255 - src[i][j][c] : src[i][j][c];
            }
        }
    }
}

function make_image(width, height) {
    const img = [];
    for (let i = 0; i < height; i = i + 1) {
        const row = [];
        img[i] = row;
        for (let j = 0; j < width; j = j + 1) {
            const pixel = [];
            row[j] = pixel;
            for (let z = 0; z < 4; z = z + 1) {
                pixel[z] = 255;
            }
        }
    }
    return img;
}

function compose(filter1, filter2) {
    return (src, dest) => {
        const width = image_width();
        const height = image_height();

        const temp = [];

        if (width >= 256 && height >= 256) {
            for (let i = 0; i < height; i = i + 1) {
                temp[i] = [];
                for (let j = 0; j < width; j = j + 1) {
                    temp[i][j] = [];
                    for (let RGBa = 0; RGBa < 4; RGBa = RGBa + 1) {
                        temp[i][j][RGBa] = 0;
                    }
                }
            }   
        }

        filter1(src, temp);
        filter2(temp, dest);
    };
}

install_filter(compose(flip_vertically, color_invert));

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();
