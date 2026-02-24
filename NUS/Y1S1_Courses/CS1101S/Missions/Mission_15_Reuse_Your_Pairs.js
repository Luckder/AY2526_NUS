// TASK 1

function d_split_list(xs) {
    let first_half = xs;

    if (is_null(xs)) {
        return null;
    } else {
        if (length(xs) === 1) {
            return pair(xs, null);
        } else {
            const mid = math_floor((length(xs) + 1) / 2);

            for (let i = 1; i < mid; i = i + 1) {
                first_half = tail(first_half);
            }

            const second_half = tail(first_half);

            set_tail(first_half, null); // Destructive

            return pair(xs, second_half);
        }
    }
}

// TEST:
// const my_list1 = list(1, 2, 3, 4, 5, 6);
// const my_list2 = list(5, 4, 3, 2, 1);
// d_split_list(my_list1);
// d_split_list(my_list2);

//---------------------------------------------------------------------------------------------

// TASK 2

function d_merge(xs, ys) {

    if (is_null(xs)) {
        return ys;
    } else if (is_null(ys)) {
        return xs;
    } else {
        let start = list();
        let result = list();

        if (head(xs) <= head(ys)) {
            start = xs;
            result = xs;
            xs = tail(xs);
        } else {
            start = ys;
            result = ys;
            ys = tail(ys);
        }

        while (!is_null(xs) && !is_null(ys)) {
            if (head(xs) <= head(ys)) {
                set_tail(start, xs);
                start = xs;
                xs = tail(xs);
            } else {
                set_tail(start, ys);
                start = ys;
                ys = tail(ys);
            }
        }

        if (!is_null(xs)) {
            set_tail(start, xs);
        } else if (!is_null(ys)) {
            set_tail(start, ys);
        }

        return result;
    }
}

// TEST:
// const my_list1 = list(2, 4, 5, 9);
// const my_list2 = list(3, 5, 8);
// d_merge(my_list1, my_list2);

//---------------------------------------------------------------------------------------------

// TASK 3

// Copy-and-paste your d_split_list function for Task 1 here.
function d_split_list(xs) {
    let first_half = xs;

    if (is_null(xs)) {
        return null;
    } else {
        if (length(xs) === 1) {
            return pair(xs, null);
        } else {
            const mid = math_floor((length(xs) + 1) / 2);

            for (let i = 1; i < mid; i = i + 1) {
                first_half = tail(first_half);
            }

            const second_half = tail(first_half);

            set_tail(first_half, null); // Destructive

            return pair(xs, second_half);
        }
    }
}

// Copy-and-paste your d_merge function for Task 2 here.
function d_merge(xs, ys) {

    if (is_null(xs)) {
        return ys;
    } else if (is_null(ys)) {
        return xs;
    } else {
        let start = list();
        let result = list();

        if (head(xs) <= head(ys)) {
            start = xs;
            result = xs;
            xs = tail(xs);
        } else {
            start = ys;
            result = ys;
            ys = tail(ys);
        }

        while (!is_null(xs) && !is_null(ys)) {
            if (head(xs) <= head(ys)) {
                set_tail(start, xs);
                start = xs;
                xs = tail(xs);
            } else {
                set_tail(start, ys);
                start = ys;
                ys = tail(ys);
            }
        }

        if (!is_null(xs)) {
            set_tail(start, xs);
        } else if (!is_null(ys)) {
            set_tail(start, ys);
        }

        return result;
    }
}

function d_merge_sort(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    }

    const split_result = d_split_list(xs);
    const first_half = head(split_result);
    const second_half = tail(split_result);
    
    const sorted_first = d_merge_sort(first_half);
    const sorted_second = d_merge_sort(second_half);

    return d_merge(sorted_first, sorted_second);
}

// TEST:
// const my_list = list(7, 2, 4, 6, 9, 1, 5, 8, 3, 6);
// d_merge_sort(my_list);
