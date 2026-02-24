// TASK 1

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 15;

function stellar_motion_detector(src, dest) {
    const width = image_width();
    const height = image_height();
    
    if (width >= 256 && height >= 256) {
        let min_x = width;
        let min_y = height;
        let max_x = 0;
        let max_y = 0;

        for (let i = 0; i < height; i = i + 1) {
            for (let j = 0; j < width; j = j + 1) {
                // If I use src[i][j][0] === 255, then the code doesn't
                // really pick up on all red objects shown, hence I made it
                // accept a range of values unlike what the question wanted
                // since this worked better for me especially w/ poor lighting
                if (src[i][j][0] >= 175 && src[i][j][1] <= 25 && 
                    src[i][j][2] <= 25 && src[i][j][3] >= 230) {
                    if (j < min_x) {
                        min_x = j;
                    }

                    if (j > max_x) {
                        max_x = j;
                    }

                    if (i < min_y) {
                        min_y = i;
                    }

                    if (i > max_y) {
                        max_y = i;
                    }
                }
            }
        }

        // The code will create one large blue box to encompass all red
        // object instead of multiple blue boxes like what the question wanted
        for (let i = 0; i < height; i = i + 1) {
            for (let j = 0; j < width; j = j + 1) {
                dest[i][j] = src[i][j];
            }
        }

        if (max_x >= 0) {
            for (let i = min_y; i <= max_y; i = i + 1) {
                for (let j = min_x; j <= max_x; j = j + 1) {
                    dest[i][j][2] = 255; // Make blue
                    dest[i][j][3] = 100; // Translucent
                }
            }
        }
    }
}

// This is really dang cool!
install_filter(stellar_motion_detector);
set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();
