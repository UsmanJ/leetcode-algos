/*
LeetCode 844 — Backspace String Compare
Difficulty: Easy
Pattern: Two Pointers + Skip Counters

Problem:
Given two strings s and t, return true if they are equal when both
are typed into empty text editors.

'#' means a backspace character.

If there is nothing to delete, the backspace does nothing.


Example:

Input:
s = "ab#c"
t = "ad#c"

Output:
true

Explanation:

"ab#c" -> "ac"
"ad#c" -> "ac"


--------------------------------------------------
FIRST APPROACH
--------------------------------------------------

One simple approach is to build the final version of each string.

Example:

"ab#c"

a
ab
a
ac

Then compare the two final strings.

That works, but it uses extra space.


--------------------------------------------------
OPTIMISED IDEA
--------------------------------------------------

Use two pointers starting from the end:

i -> end of s
j -> end of t

Why go backwards?

Because when we see '#', we immediately know that the next
normal character to the left should be skipped.


Example:

s = "ab##c"

Working backwards:

c -> valid
# -> skip one character
# -> skip another character
b -> skipped
a -> skipped

So the next real character is c.


--------------------------------------------------
SKIP COUNTERS
--------------------------------------------------

Use:

skipS
skipT

If we see:

'#'

increase the skip counter.

Example:

skipS++

If we then see a normal character while:

skipS > 0

that character has been deleted, so:

skipS--
i--

Keep moving backwards until reaching a character that survives.


--------------------------------------------------
ALGORITHM
--------------------------------------------------

While either pointer is still inside its string:

1. Move i backwards until it reaches the next valid character.

2. Move j backwards until it reaches the next valid character.

3. Compare s[i] and t[j].

4. If they are different:
   return false.

5. Otherwise move both pointers backwards.

If everything matches:

return true.


--------------------------------------------------
TIME / SPACE COMPLEXITY
--------------------------------------------------

Time: O(n + m)

Each pointer moves backwards through its string at most once.

Space: O(1)

We do not build any new strings or arrays.
*/


/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function(s, t) {
    var i = s.length - 1;
    var j = t.length - 1;

    var skipS = 0;
    var skipT = 0;

    while (i >= 0 || j >= 0) {

        // Find next valid character in s
        while (i >= 0) {
            if (s[i] === '#') {
                skipS++;
                i--;
            } else if (skipS > 0) {
                skipS--;
                i--;
            } else {
                break;
            }
        }

        // Find next valid character in t
        while (j >= 0) {
            if (t[j] === '#') {
                skipT++;
                j--;
            } else if (skipT > 0) {
                skipT--;
                j--;
            } else {
                break;
            }
        }

        // Compare the next surviving characters
        if (s[i] !== t[j]) {
            return false;
        }

        // Move both pointers backwards
        i--;
        j--;
    }

    return true;
};


// --------------------------------------------------
// QUICK CHECKS
// --------------------------------------------------

console.log(backspaceCompare("ab#c", "ad#c"));
// true

console.log(backspaceCompare("ab##", "c#d#"));
// true

console.log(backspaceCompare("a#c", "b"));
// false

console.log(backspaceCompare("xywrrmp", "xywrrmu#p"));
// true


/*
--------------------------------------------------
THINGS TO REMEMBER
--------------------------------------------------

Backspace String Compare
-> Two pointers
-> Start from the end
-> Use skip counters
-> Skip deleted characters
-> Compare only surviving characters


Mental model:

"Going backwards makes backspaces easy."


When you see '#':
-> increase skip counter

When skip counter > 0:
-> skip the current normal character

When skip counter === 0:
-> current character survives


Interview clue:

If an operation affects characters that came before it,
consider whether traversing the string backwards makes the
problem easier.
*/