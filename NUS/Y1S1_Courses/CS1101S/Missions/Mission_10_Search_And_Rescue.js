function binary_search_tree_to_string(tree) {
    if (is_empty_tree(tree)) {
        return "";
    } else {
        // In-order traversal: left subtree, entry, right subtree
        const left_string = binary_search_tree_to_string(left_branch(tree));
        const current_entry = entry(tree) + "; ";
        const right_string = binary_search_tree_to_string(right_branch(tree));
        return left_string + current_entry + right_string;
    }
}

const h = make_tree("h", make_empty_tree(), make_empty_tree());
const a = make_tree("a", make_empty_tree(), make_empty_tree());
const n = make_tree("n", h, make_empty_tree());
const c = make_tree("c", a, make_empty_tree());
const test_bst = make_tree("e", c, n);

// Test
display(binary_search_tree_to_string(test_bst));
binary_search_tree_to_string(cadet_names);

//---------------------------------------------------------------------------------------------

function find(bst, name) {
    if (is_empty_tree(bst)) {
        return false;
    } else {
        const current_name = entry(bst);
        if (stringify(current_name) === stringify(name)) {
            return true;
        } else if (name < current_name) {
            return find(left_branch(bst), name);
        } else if (name > current_name) {
            return find(right_branch(bst), name);
        } else {
            return display("Critical Error!");
        }
    }
}

// Test
find(cadet_names, "David Chan") 
    ? (
        find(cadet_names, "An Kai Park")
            ? (
                find(cadet_names, "Zereth Kit")
                    ? display("All Found")
                     : display("Not Found")
             )
             : display("Not Found")
        )
         : display("Not Found");

//---------------------------------------------------------------------------------------------

function insert(bst, item) {
    if (is_empty_tree(bst)) {
        // If the tree is empty, create a new tree with item as entry
        return make_tree(item, make_empty_tree(), make_empty_tree());
    } else {
        const current_item = entry(bst);
        if (item === current_item) {
            // Item already exists in the tree; return the tree unchanged
            return bst;
        } else if (item < current_item) {
            // Insert into left subtree and rebuild the tree
            const new_left = insert(left_branch(bst), item);
            return make_tree(current_item, new_left, right_branch(bst));
        } else {
            // Insert into right subtree and rebuild the tree
            const new_right = insert(right_branch(bst), item);
            return make_tree(current_item, left_branch(bst), new_right);
        }
    }
}

// Usage example:
// let updatedTree = insert(cadet_names, "Zara");

// Pre-written by Prof Martin yet mutable variable decrlarations aren't allowed

// This returns a new BST with "Zara" inserted appropriately.


// Copy your binary_search_tree_to_string function here from Task 1.
function binary_search_tree_to_string(tree) {
    if (is_empty_tree(tree)) {
        return "";
    } else {
        // In-order traversal: left subtree, entry, right subtree
        const left_string = binary_search_tree_to_string(left_branch(tree));
        const current_entry = entry(tree) + "; ";
        const right_string = binary_search_tree_to_string(right_branch(tree));
        return left_string + current_entry + right_string;
    }
}

// Test

display(binary_search_tree_to_string(insert(make_empty_tree(), "x")));
// Should produce "x; "

const bst = accumulate((item, bst) => insert(bst, item),
                      make_empty_tree(),
                      list("g", "a", "r", "x", "p"));
display(binary_search_tree_to_string(bst));
// Should produce "a; g; p; r; x; "

const cadet_names_with_aaaaron =  insert(cadet_names, "Aaaaron Aaaang");
binary_search_tree_to_string(cadet_names_with_aaaaron);
// Should produce "Aaaaron Aaaang; ..."
