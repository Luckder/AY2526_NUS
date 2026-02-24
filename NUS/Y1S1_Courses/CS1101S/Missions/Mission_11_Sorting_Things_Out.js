// Task 1

function partition(xs, p) {
    const len = length(xs);

    const even = (xs, p, n) => n === 0
                                ? null
                                : head(xs) <= p
                                ? pair(head(xs), even(tail(xs), p, n - 1))
                                : even(tail(xs), p, n - 1);

    const odd = (xs, p, n) => n === 0
                                 ? null
                                 : head(xs) > p
                                 ? pair(head(xs), odd(tail(xs), p, n - 1))
                                 : odd(tail(xs), p, n - 1);

    return pair(even(xs, p, len), odd(xs, p, len));
}

// Test
const my_list = n => n === 1
                     ? list(1, 2, 3, 4, 5, 6)
                     : list(12, 32, 100, 123, 999, 45, 125, 666, 777, 1000);

partition(my_list(math_floor(math_random() * 2) + 1), 500);

//---------------------------------------------------------------------------------------------

// Task 2

function partition(xs, p) {
    const len = length(xs);

    const even = (xs, p, n) => n === 0
                                ? null
                                : head(xs) <= p
                                ? pair(head(xs), even(tail(xs), p, n - 1))
                                : even(tail(xs), p, n - 1);

    const odd = (xs, p, n) => n === 0
                                 ? null
                                 : head(xs) > p
                                 ? pair(head(xs), odd(tail(xs), p, n - 1))
                                 : odd(tail(xs), p, n - 1);
    return pair(even(xs, p, len), odd(xs, p, len));
}

function quicksort(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        // Technically, if we are working with arrays instead of lists,
        // we can use the last element as the pivot instead.
        const partitions = partition(tail(xs), head(xs));
        const left_sorted = quicksort(head(partitions));
        const right_sorted = quicksort(tail(partitions));
        return append(left_sorted, pair(head(xs), right_sorted));
        // Always remember, best-case scenerio runtime complexity
        // for bogosort is Θ(1), better than all other sorting algorithms!
    }
}

// Test
const my_list = list(23, 12, 56, 92, -2, 0);
quicksort(my_list);

//---------------------------------------------------------------------------------------------

/*
Θ(n)
*/

//---------------------------------------------------------------------------------------------

/*
Θ(n²)
*/

//---------------------------------------------------------------------------------------------

/*
Θ(n * log(n))
*/
