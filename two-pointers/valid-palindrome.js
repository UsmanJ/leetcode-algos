/*
LeetCode 125 — Valid Palindrome
Difficulty: Easy
Pattern: Two Pointers

Problem:
A phrase is a palindrome if, after converting all uppercase letters into lowercase
letters and removing all non-alphanumeric characters, it reads the same forward
and backward.

Alphanumeric characters include letters and numbers.

Return true if s is a palindrome, or false otherwise.


Examples:

Input:
s = "A man, a plan, a canal: Panama"

Output:
true

Explanation:
After ignoring spaces/punctuation and case:
"amanaplanacanalpanama"


Input:
s = "race a car"

Output:
false

Explanation:
After ignoring spaces/punctuation and case:
"raceacar"


Input:
s = " "

Output:
true


--------------------------------------------------
KEY IDEA
--------------------------------------------------

Use two pointers:

i -> starts at the beginning
j -> starts at the end

While i < j:

1. If s[i] is not a letter or number:
   move i forward and continue.

2. If s[j] is not a letter or number:
   move j backward and continue.

3. Compare the lowercase versions of s[i] and s[j].

4. If they are different:
   return false.

5. If they match:
   move both pointers inward.

If the pointers meet/cross without finding a mismatch,
the string is a palindrome.


--------------------------------------------------
WHY A WHILE LOOP?
--------------------------------------------------

This is a good use case for a while loop because the pointers
do not always move in the same way.

Sometimes:
- only i moves
- only j moves
- both i and j move

We keep going while:

i < j


--------------------------------------------------
USEFUL SYNTAX
--------------------------------------------------

Check whether a character is alphanumeric:

/[a-z0-9]/i.test(character)

The "i" flag means case-insensitive.


Convert a character to lowercase:

character.toLowerCase()


Skip the rest of the current loop iteration:

continue;


--------------------------------------------------
TIME / SPACE COMPLEXITY
--------------------------------------------------

Time: O(n)

Each pointer moves through the string at most once.

Space: O(1)

We do not build a cleaned copy of the string.
*/


/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    var i = 0;
    var j = s.length - 1;

    while (i < j) {
        // Skip non-alphanumeric characters from the left
        if (!/[a-z0-9]/i.test(s[i])) {
            i++;
            continue;
        }

        // Skip non-alphanumeric characters from the right
        if (!/[a-z0-9]/i.test(s[j])) {
            j--;
            continue;
        }

        // Compare both valid characters ignoring case
        if (s[i].toLowerCase() !== s[j].toLowerCase()) {
            return false;
        }

        // Characters matched, move both pointers inward
        i++;
        j--;
    }

    return true;
};


// --------------------------------------------------
// QUICK CHECKS
// --------------------------------------------------

console.log(isPalindrome("A man, a plan, a canal: Panama"));
// true

console.log(isPalindrome("race a car"));
// false

console.log(isPalindrome(" "));
// true

console.log(isPalindrome("racecar"));
// true

console.log(isPalindrome("abba"));
// true

console.log(isPalindrome("0P"));
// false


/*
--------------------------------------------------
THINGS TO REMEMBER
--------------------------------------------------

Valid Palindrome
-> Two pointers
-> Start at opposite ends
-> Skip characters you do not care about
-> Normalize before comparing
-> Stop immediately on a mismatch


Mental model:

"Compare the outside characters, then move inward."


A string having an odd number of characters does NOT mean
it cannot be a palindrome.

Example:

"racecar"

The middle character does not need a matching partner.
*/