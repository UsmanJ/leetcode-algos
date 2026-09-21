/*
Problem: Valid Anagram
LeetCode: #242

Given two strings s and t, return true if t is an anagram of s.

An anagram uses exactly the same characters with exactly the same frequencies,
but the characters can appear in a different order.

Examples:

s = "anagram"
t = "nagaram"
output = true

s = "rat"
t = "car"
output = false

--------------------------------------------------
1. First approach: two Maps
--------------------------------------------------

Idea:
Create one frequency Map for s and another frequency Map for t.

For each character:
- Count how many times it appears in s
- Count how many times it appears in t
- Compare the two Maps

The first useful optimisation is checking the string lengths.

If the strings have different lengths, they cannot be anagrams.

Example:

s = "cat"
t = "cats"

They cannot contain exactly the same characters because their lengths differ.

Time: O(n)
Space: O(n)

Pattern:
Frequency Map / character counting
*/

function isAnagramTwoMaps(s, t) {
    if (s.length !== t.length) {
        return false;
    }

    const sMap = new Map();
    const tMap = new Map();

    // Count characters in s
    for (let i = 0; i < s.length; i++) {
        if (sMap.has(s[i])) {
            sMap.set(s[i], sMap.get(s[i]) + 1);
        } else {
            sMap.set(s[i], 1);
        }
    }

    // Count characters in t
    for (let i = 0; i < t.length; i++) {
        if (tMap.has(t[i])) {
            tMap.set(t[i], tMap.get(t[i]) + 1);
        } else {
            tMap.set(t[i], 1);
        }
    }

    // Compare the character counts
    for (const [letter, count] of sMap) {
        if (tMap.get(letter) !== count) {
            return false;
        }
    }

    return true;
}


/*
--------------------------------------------------
2. Improved approach: one Map
--------------------------------------------------

Idea:
We do not actually need two Maps.

Instead:

1. Count every character in s by adding 1.
2. Loop through t and subtract 1 for every character.
3. If the strings are anagrams, every count should finish at 0.

Example:

s = "abb"

After counting s:

a -> 1
b -> 2

t = "bab"

After subtracting characters from t:

b -> 1
a -> 0
b -> 0

Final Map:

a -> 0
b -> 0

Because all counts are 0, the strings are anagrams.

Time: O(n)
Space: O(n)

Pattern:
Frequency Map

Key takeaway:

If I need to know:

    "How many times does each value occur?"

consider using a Map.

Map:
    value -> count

Examples:

Valid Anagram:
    character -> frequency

Two Sum:
    number -> index

Contains Duplicate:
    only need existence, so Set is better
*/

function isAnagramOneMap(s, t) {
    if (s.length !== t.length) {
        return false;
    }

    const map = new Map();

    // Add the counts from s
    for (let i = 0; i < s.length; i++) {
        map.set(s[i], (map.get(s[i]) || 0) + 1);
    }

    // Subtract the counts from t
    for (let i = 0; i < t.length; i++) {
        map.set(t[i], (map.get(t[i]) || 0) - 1);
    }

    // Every count must finish at 0
    for (const count of map.values()) {
        if (count !== 0) {
            return false;
        }
    }

    return true;
}


/*
--------------------------------------------------
3. Further optimisation: fixed array of 26 counts
--------------------------------------------------

LeetCode states that s and t only contain lowercase English letters.

That means there are only 26 possible characters:

a - z

Instead of using a Map, we can use an array with exactly 26 positions.

Each position represents one letter:

index 0  -> a
index 1  -> b
index 2  -> c
...
index 25 -> z

To convert a character into an array index, we use charCodeAt().

Character codes:

a = 97
b = 98
c = 99
...
z = 122

So:

    charCodeAt(...) - 97

converts:

a -> 0
b -> 1
c -> 2
...
z -> 25

Example:

    "c".charCodeAt(0) = 99

    99 - 97 = 2

So "c" is stored at:

    counts[2]

We can increment the count for characters in s
and decrement the count for characters in t
in the same loop.

If the strings are anagrams, every position should finish at 0.

Time: O(n)
Space: O(1)

Why O(1) space?

The counts array is always exactly 26 elements,
no matter whether the input contains 10 characters or 10 million characters.

This solution is slightly more efficient than using a Map,
but it relies on the problem constraint that only lowercase English letters
are allowed.

The Map solution is more general.
*/

function isAnagram(s, t) {
    if (s.length !== t.length) {
        return false;
    }

    const counts = new Array(26).fill(0);

    for (let i = 0; i < s.length; i++) {
        counts[s.charCodeAt(i) - 97]++;
        counts[t.charCodeAt(i) - 97]--;
    }

    return counts.every(count => count === 0);
}


/*
--------------------------------------------------
Useful syntax learned
--------------------------------------------------

MAP

Get a value:

    map.get(key)

Check whether a key exists:

    map.has(key)

Store/update a value:

    map.set(key, value)

Common frequency-counting pattern:

    map.set(value, (map.get(value) || 0) + 1)

Explanation:

    map.get(value)

gets the existing count.

If it does not exist, it returns undefined.

    map.get(value) || 0

therefore gives us either:
- the existing count
- or 0 if the value has not been seen before

Then:

    + 1

increments the count.


ARRAY

Create an array of 26 zeroes:

    const counts = new Array(26).fill(0);

Convert a lowercase character to an index:

    character.charCodeAt(0) - 97

Example:

    "a" -> 0
    "b" -> 1
    "c" -> 2


--------------------------------------------------
Comparison of approaches
--------------------------------------------------

Two Maps:
    Time:  O(n)
    Space: O(n)

One Map:
    Time:  O(n)
    Space: O(n)

26-element array:
    Time:  O(n)
    Space: O(1)

The one-Map solution is a good general-purpose pattern to remember.

The 26-element array solution is the most optimised for this specific
LeetCode problem because the inputs are limited to lowercase English letters.
*/


// Quick checks

console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car"));         // false
console.log(isAnagram("abb", "bab"));         // true
console.log(isAnagram("aacc", "ccac"));       // false
console.log(isAnagram("", ""));               // true