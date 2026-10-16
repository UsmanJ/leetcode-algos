/**
 * LeetCode 20 - Valid Parentheses
 *
 * Pattern:
 * Stack
 *
 * Problem:
 * Given a string containing only:
 *
 * (
 * )
 * {
 * }
 * [
 * ]
 *
 * Return true if the brackets are valid.
 *
 * A valid string means:
 *
 * - every opening bracket has a matching closing bracket
 * - brackets close in the correct order
 *
 *
 * Example:
 *
 * s = "()[]{}"
 *
 * Output:
 *
 * true
 *
 *
 * Example:
 *
 * s = "(]"
 *
 * Output:
 *
 * false
 */


/**
 * ------------------------------------------------------------
 * KEY IDEA
 * ------------------------------------------------------------
 *
 * This problem uses a STACK.
 *
 * A stack follows:
 *
 * Last In, First Out
 *
 * LIFO
 *
 *
 * Example:
 *
 * s = "{[]}"
 *
 * Read {
 *
 * stack = ["{"]
 *
 * Read [
 *
 * stack = ["{", "["]
 *
 * Read ]
 *
 * The most recently opened bracket is:
 *
 * [
 *
 * That matches ]
 *
 * So pop it.
 *
 * stack = ["{"]
 *
 *
 * Read }
 *
 * Pop {
 *
 * It matches }
 *
 * stack = []
 *
 *
 * The stack is empty at the end,
 * so the string is valid.
 */


/**
 * ------------------------------------------------------------
 * CLOSING -> OPENING MAP
 * ------------------------------------------------------------
 *
 * We store the matching opening bracket for each closing bracket.
 *
 * This makes checking very simple.
 *
 * Example:
 *
 * closeToOpen[")"] === "("
 */

var isValid = function(s) {

    var closeToOpen = {
        "}": "{",
        ")": "(",
        "]": "["
    };

    var stack = [];


    for (var i = 0; i < s.length; i++) {

        var char = s[i];


        // If this is a closing bracket...
        if (char in closeToOpen) {

            // Get the most recently opened bracket.
            var top = stack.pop();


            // It must match the expected opening bracket.
            if (top !== closeToOpen[char]) {
                return false;
            }

        } else {

            // Otherwise it is an opening bracket.
            stack.push(char);
        }
    }


    // There must be no unmatched opening brackets left.
    return stack.length === 0;
};


/**
 * ------------------------------------------------------------
 * IMPORTANT EDGE CASE
 * ------------------------------------------------------------
 *
 * Example:
 *
 * s = "(("
 *
 * We never encounter an incorrect closing bracket.
 *
 * But the stack contains:
 *
 * ["(", "("]
 *
 * at the end.
 *
 * Therefore:
 *
 * return stack.length === 0
 *
 * rather than simply:
 *
 * return true
 */


/**
 * ------------------------------------------------------------
 * COMPLEXITY
 * ------------------------------------------------------------
 *
 * Time:
 *
 * O(n)
 *
 * We visit every character once.
 *
 *
 * Space:
 *
 * O(n)
 *
 * In the worst case, every character is an opening bracket
 * and gets stored in the stack.
 */


/**
 * ------------------------------------------------------------
 * REMEMBER
 * ------------------------------------------------------------
 *
 * Opening bracket:
 *
 * push
 *
 *
 * Closing bracket:
 *
 * pop
 * compare
 *
 *
 * If mismatch:
 *
 * false
 *
 *
 * At end:
 *
 * stack must be empty
 *
 *
 * Trigger:
 *
 * Matching pairs
 * Nested structures
 * Correct closing order
 *
 * should make you think:
 *
 * STACK
 */