function split(p, xs) {
    
    const yes = filter(p, xs);
    const no = filter(q => !p(q), xs);
    
    return pair(yes, no);
    
}

//-----------------------------------------------------------------------------------------------------------------------

function kolakoski() {

    let stack = [1, 2, 2];

    const helper = (odd, n) => {

        const iter = stack[n];

        for (let i = 0; i < iter; i = i + 1) {

            if (odd) {
                stack[array_length(stack)] = 1;
            } else {
                stack[array_length(stack)] = 2;
            }

        }

        return pair(iter, () => helper(!odd, n + 1));

    };

    return pair(1, () => pair(2, () => helper(true, 2)));

}
