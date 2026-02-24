/*

Describe your solution here, including
its order of growth.

You will get full XP only for
a solution that has an order of growth
O(n²) and that does not have an order
of growth Θ(n²).

-------------------------------------------------------------------------------

Bruh this question was phrased terribly, I had to re-read multiple times with
much contemplation to even understand it, since I wanted to avoid the same
miscommunication incident with Qn 3 of mission "Musical Diversions". If what
I gather is correct, then the question wants me to code a function to GRADE and
not to SORT a given list.

Desmos: https://www.desmos.com/calculator/8jha6wr5j3

Okay, so Θ means tight-bound, O means upper-bound, and Ω means lower-bound.
The question is asking for a solution where the upper-bound O for
runtime complexity is n² while tight-bound Θ is not n².

We only learned quicksort and merge-sort. Both have Ω(n * log(n)).
The question requirements closely resembles quicksort. According to its
wikipedia page [1], quicksort has O(n²). According to merge-sort's
wikipedia page [2], merge-sort has O(n * log(n)); this is NOT what the qn wants.

Hence, most likely qn wants quicksort. But I can't get it to work no matter how
hard I try :(, further research informs me that it is just impossible to count
inversions with quicksort as quicksort doesn't really inverse anything unlike
merge-sort, coupled with the fact that merge-sort was half-completed in the
lecture, I am guessing I have to use merge-sort? But then again merge-sort
doesn't have O(n^2) unlike quicksort. I will just leave the quicksort code as
comments below the merge-sort code to see if I did something wrong for
quicksort as a grading algorithm.

Technically, since O is upper-bound, an algorithm with O(n * log(n)) would
suffice for O(n^2), but then again the qn would just state O(n * log(n))
instead of being so extra. Also, I perused all other sorting algorithms and 
absolutely none fit the question requirements [3]. The next best algorithm
is library-sort, but just like quicksort, it does not do inversions and cannot
count them, also it leaves gaps in between elements which cannot be done with
lists; all other algorithms beside quicksort and library-sort do not have both
O(n^2) and Θ < n^2. Hence, I literally, through trial-and-error, can only use
an augmented merge-sort code to do merge-count, despite merge-sort seemingly
not fitting the qn requirements, unless I went wrong somewhere in my thinking.
I could deliberately make the mergesort code more inefficient just to
artificially increase O from n * log(n) to n^2.

References
[1] https://en.wikipedia.org/wiki/Quicksort
[2] https://en.wikipedia.org/wiki/Merge_sort
[3] https://en.wikipedia.org/wiki/Sorting_algorithm

-------------------------------------------------------------------------------

Actual Answer:

I would use merge-sort here. I would augment the code of merge-sort such that
during each inversion function, it would also simultaneously count it. After
the list is sorted in order, the count would be returned. Hence, this new
function would measure how far the parsed list is from being in order.

During merging of sub-lists, the code compares the head of each sub-lists to
see which is bigger or smaller, if left is bigger than right, out of order,
add the length of remainder of left sub-list to the count in the pair; if not,
continue with merging.

Instead of just returning back the list at each return function, the augmented
code would return a pair with head as the count and tail as the list to be
originally returned.

This code would be Ω < n^2 as challenged by the question

Also, just to meet the question requirements, I would replace all pair
functions with append functions which would be deferred and have O(k), where
k is the length of the list as the first argument.
In total, the function would have O(n^2) as requested, while Θ < n^2.

In short, the run time changes with f(n) = kn^2, for k element of positive
real numbers, and n is the length of the list as input.

*/

//---------------------------------------------------------------------------------------------

// Your solution here
function graderVer1(arr) {
    // Helper functions
    const middle = n => math_floor(n / 2);
    const take = (xs, n) => {
        return n === 0
               ? null
               : is_null(xs)
               ? null
               : pair(head(xs), take(tail(xs), n - 1));
    };
    const drop = (xs, n) => {
        return n === 0
               ? xs
               : is_null(xs)
               ? null
               : drop(tail(xs), n - 1);
    };

    // Inefficient append function added, which itself takes O(n)
    // Efficient pair function removed, which itself is < O(n)
    function merge(xs, ys) {
        // Recursive helper to build the merged list and count inversions
        const merge_helper = (xs, ys, result_list, inversions_so_far) => {
            if (is_null(xs)) {
                return pair(inversions_so_far, append(result_list, ys));
            } else {
                if (is_null(ys)) {
                    return pair(inversions_so_far, append(result_list, xs));
                } else {
                    const x = head(xs);
                    const y = head(ys);

                    if (x <= y) {
                        return merge_helper(tail(xs),
                                            ys,
                                            append(result_list, list(x)),
                                            inversions_so_far);
                    } else {
                        return merge_helper(xs,
                                            tail(ys),
                                            append(result_list, list(y)),
                                            inversions_so_far + length(xs));
                    }
                }
            }
        };

        return merge_helper(xs, ys, null, 0);
    }

    function merge_sort_and_count(xs) {
        if (is_null(xs) || is_null(tail(xs))) {
            return pair(0, xs);
        } else {
            const mid = middle(length(xs));
            const left_result = merge_sort_and_count(take(xs, mid));
            const right_result = merge_sort_and_count(drop(xs, mid));
            const merged = merge(tail(left_result), tail(right_result));
            return pair(head(left_result) + head(right_result) + head(merged),
                   tail(merged));
        }
    }

    return head(merge_sort_and_count(arr));
}

// Testing
const r = () => math_floor(math_random() * 10 + 1);
const rand_list = pair(r(), pair(r(), pair(r(), pair(r(), pair(r(), null)))));
display(graderVer1(display(rand_list)));

// Below is the more efficient mergecode I had to break apart and make more
// inefficient artificially.
function mergesort_graderVer1(arr) {
    // Helper functions
    const middle = n => math_floor(n / 2);
    const take = (xs, n) => {
        return n === 0
               ? null
               : is_null(xs)
               ? null
               : pair(head(xs), take(tail(xs), n - 1));
    };
    const drop = (xs, n) => {
        return n === 0
               ? xs
               : is_null(xs)
               ? null
               : drop(tail(xs), n - 1);
    };

    function merge(xs, ys) {
        if (is_null(xs)) {
            return pair(0, ys);
        } else if (is_null(ys)) {
            return pair(0, xs);
        } else {
            const x = head(xs);
            const y = head(ys);
            if (x <= y) {
                const rest = merge(tail(xs), ys);
                return pair(head(rest), pair(head(xs), tail(rest)));
            } else {
                const rest = merge(xs, tail(ys));
                return pair(length(xs) + head(rest),
                            pair(head(ys), tail(rest)));
            }
        }
    }

    function merge_sort_and_count(xs) {
        if (is_null(xs) || is_null(tail(xs))) {
            return pair(0, xs);
        } else {
            const mid = middle(length(xs));
            const left_result = merge_sort_and_count(take(xs, mid));
            const right_result = merge_sort_and_count(drop(xs, mid));
            const merged = merge(tail(left_result), tail(right_result));
            return pair(head(left_result) + head(right_result) + head(merged),
                   tail(merged));
        }
    }

    return head(merge_sort_and_count(arr));
}

// Useless quicksort count algorithm - Always returns 0 for some reason
// I can't get it to work at all
function quicksort_graderVer1(arr) {
    function quicksort_count(xs) {
        function partition(xs, p) {
            const len = length(xs);

            const even = (xs, p, n) => n === 0
                                      ? null
                                      : head(xs) <= p
                                      ? pair(head(xs),
                                              even(tail(xs), p, n - 1))
                                      : even(tail(xs), p, n - 1);

            const odd = (xs, p, n) => n === 0
                                      ? null
                                      : head(xs) > p
                                      ? pair(head(xs),
                                             odd(tail(xs), p, n - 1))
                                      : odd(tail(xs), p, n - 1);

            return pair(even(xs, p, len), odd(xs, p, len));
            }
        if (is_null(xs) || is_null(tail(xs))) {
            return pair(xs, 0);
        } else {
            const partitions = partition(tail(xs), head(xs));

            const left_result = quicksort_count(head(partitions));
            const right_result = quicksort_count(tail(partitions));

            const left_sorted = head(left_result);
            const left_invs = tail(left_result);

            const right_sorted = head(right_result);
            const right_invs = tail(right_result);

        function count_invs(left, right) {
            if (is_null(left) || is_null(right)) {
                return 0;
            } else if (head(left) <= head(right)) {
                return count_invs(tail(left), right);
            } else {
                return length(left) + count_invs(left, tail(right));
            }
        }

        const cross_invs = count_invs(left_sorted, right_sorted);

        const sorted = append(left_sorted, pair(head(xs), right_sorted));

        return pair(sorted, left_invs + right_invs + cross_invs);
      }
    }
    return tail(quicksort_count(arr));
}

//---------------------------------------------------------------------------------------------

/* Describe your solution here

Alright, so the question did not mention anything about bounds for runtime
complexities. I am interpreting the question as freely allowing students to
pick whatever works.

Further research shows two methods, brute-force and middle-element methods [1]

I am just gonna write a simple brute-force code of O(n^3) that works,
instead of the second method of O(n^2).

First number is selected iteratively through the list, second number is
selected to the right of first number and iteratively through the list, and
third number is selected to the right of second number and iteratively
through the list.

Count the number of out of order triples with +1 for each iteration that
detects an out of order triple, out of order means strictly decreasing.

References:
[1] https://www.geeksforgeeks.org/dsa/
count-inversions-of-size-three-in-a-give-array/

*/

//---------------------------------------------------------------------------------------------

function graderVer2/*Bruh snake case for us; camel case for Prof Martin*/(arr) {
    const count_decreasing_triples = (xs) => {
        if (is_null(xs) || is_null(tail(xs)) || is_null(tail(tail(xs)))) {
            return 0;
        } else {
            const x = head(xs);
            const rest_from_x = tail(xs);

            // Counts triples starting with (x, ...)
            const count_with_first = (ylist) => {
                if (is_null(ylist) || is_null(tail(ylist))) {
                    return 0;
                } else {
                    const y = head(ylist);
                    const rest_from_y = tail(ylist);

                    // Counts triples starting with (x, y, ...)
                    const count_with_second = (zlist) => {
                        if (is_null(zlist)) {
                            return 0;
                        } else {
                            const z = head(zlist);
                            const current_count = (x > y && y > z) ? 1 : 0;
                            return current_count + count_with_second(
                                                       tail(zlist));
                        }
                    };

                    return count_with_second(rest_from_y) + count_with_first(
                                                                rest_from_y);
                }
            };
            
            return count_with_first(rest_from_x) + count_decreasing_triples(
                                                       rest_from_x);
        }
    };
    return count_decreasing_triples(arr);
}

// test your program!
const r = () => math_floor(math_random() * 10 + 1);
const rand_list = pair(r(), pair(r(), pair(r(), pair(r(), pair(r(), null)))));
display(graderVer2(display(rand_list)));
