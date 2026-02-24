function make_k_list(k, d) {

    const helper = (x, n) => {
        return n === 0
               ? null
               : pair(x, helper(x, n - 1));
    };
    
    if (d === 0) {
        return 0;
    } else {
        
        let result = helper(0, k);
        
        for (let i = 1; i < d; i = i + 1) {
            result = helper(result, k);
        }
        
        return result;
    }

}

//----------------------------------------------------------------------------------------------------------------

function sum_k_list(klist) {
    
    if (is_number(klist)) {
        return klist;
    } else {
        
        let num = klist;
        let depth = 0;
    
        while (!is_number(num)) {
            depth = depth + 1;
            
            num = head(num);
        }
        
        const k = length(klist);
        
        function flatten(l) {
            if (is_null(l)) {
                return null;
            } else {
                return append(head(l), flatten(tail(l)));
            }
        }
        
        let result = klist;
        
        for (let i = 1; i < depth; i = i + 1) {
            result = flatten(result);
        }
        
        let result2 = 0;
        
        for_each(x => result2 = x + result2, result);
        return result2;
        
        }

}

//----------------------------------------------------------------------------------------------------------------

function map_k_list(f, klist) {

    if (is_number(klist)) {
        return f(klist);
    } else {
        
        let num = klist;
        let depth = 0;
        const k = length(klist);
    
        while (!is_number(num)) {
            depth = depth + 1;
            
            num = head(num);
        }
        
        function mapping_time(f, klist, depth) {
            return depth === 0
                   ? f(klist)
                   : map(element => mapping_time(f, element, depth - 1), klist);
        }
        
        return mapping_time(f, klist, depth);
        
    }

}

//----------------------------------------------------------------------------------------------------------------

function route_distance(mat, route) {
    
    let first = 0;
    let second = 0;
    let iter = route;
    let result = 0;

    for (let i = 0; i < length(route) - 1; i = i + 1) {
        
        first = head(iter);
        second = head(tail(iter));
        
        iter = tail(iter);
        
        
        result = result + mat[first][second];
        
    }
    
    return result;

}

//----------------------------------------------------------------------------------------------------------------

function shortest_paper_route(n, mat, start) {
    
    const base_list = x => {
        return x === 0
               ? null
               : pair(n - x, base_list(x - 1));
    };

    // You can keep, modify or remove the permutations function.
    function permutations(ys) {
        return is_null(ys)
            ? list(null)
            : accumulate(append, null,
                map(x => map(p => pair(x, p),
                             permutations(remove(x, ys))),
                    ys));
    }
    
    const helper = (x, y) => {
        return tail(y) < route_distance(mat, x)
               ? head(y)
               : x;
    };
    
    const all_possibilities = map(xs => append(xs, list(start)), filter(xs => head(xs) === start, permutations(base_list(n))));
    
    let result = pair(list(), 9999);
    
    for_each(xs => result = pair(helper(xs, result), math_min(route_distance(mat, xs), tail(result))), all_possibilities);

    return result;
}

//----------------------------------------------------------------------------------------------------------------

function make_postfix_exp(bae) {
    
    function flatten(arr) {
        if (!is_array(arr)) {
            return [arr];
        } else {
            let result = [];
            for (let i = 0; i < array_length(arr); i = i + 1) {
                const flattened_element = flatten(arr[i]);
                for (let j = 0; j < array_length(flattened_element); j = j + 1) {
                    result[array_length(result)] = flattened_element[j];
                }
            }
            return result;
        }
    }

    if (is_number(bae)) {
        return [bae];
    } else {
        function bae_to_pfe(bae) {
            if (is_number(bae)) {
                return bae;
            } else {
                const left = bae[0];
                const operator = bae[1];
                const right = bae[2];
                
                const left_pfe = bae_to_pfe(left);
                const right_pfe = bae_to_pfe(right);
                
                return [left_pfe, right_pfe, operator];
            }
        }
        
        return flatten(bae_to_pfe(bae));
    }
}

//----------------------------------------------------------------------------------------------------------------

function eval_postfix_exp(pfe) {

    let stack = [];
    
    for (let i = 0; i < array_length(pfe); i = i + 1) {
        const token = pfe[i];
        
        if (is_number(token)) {
            stack[array_length(stack)] = token;
        } else {
            const stack_size = array_length(stack);
            const right = stack[stack_size - 1];
            const left = stack[stack_size - 2];

            let new_stack = [];
            for (let j = 0; j < stack_size - 2; j = j + 1) {
                new_stack[j] = stack[j];
            }

            let result = 0;
            if (token === "+") {
                result = left + right;
            } else if (token === "-") {
                result = left - right;
            } else if (token === "*") {
                result = left * right;
            } else if (token === "/") {
                result = left / right;
            }

            new_stack[array_length(new_stack)] = result;
            stack = new_stack;
        }
    }
    
    return stack[0];
}
