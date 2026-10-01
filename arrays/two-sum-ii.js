/*
LeetCode 167 — Two Sum II: Input Array Is Sorted
Difficulty: Medium
Pattern: Two Pointers

Problem:
You are given a 1-indexed array of integers called numbers that is already
sorted in non-decreasing order.

Find two numbers such that they add up to target.

Return the indexes of the two numbers as:

[index1, index2]

The returned indexes must be 1-indexed.

There is exactly one solution.


Example:

Input:
numbers = [2, 7, 11, 15]
target = 9

Output:
[1, 2]


--------------------------------------------------
KEY IDEA
--------------------------------------------------

Because the array is already sorted, use two pointers:

i -> starts at the beginning
j -> starts at the end

Calculate:

sum = numbers[i] + numbers[j]

Then:

If sum === target:
    return the indexes

If sum < target:
    the sum is too small
    move i to the right

If sum > target:
    the sum is too large
    move j to the left


--------------------------------------------------
WHY TWO POINTERS?
--------------------------------------------------

Because the array is sorted.

If the sum is too small, moving the left pointer right gives us
a larger number.

If the sum is too large, moving the right pointer left gives us
a smaller number.

This lets us solve the problem without using a Map.


--------------------------------------------------
IMPORTANT: 1-INDEXED OUTPUT
--------------------------------------------------

JavaScript arrays are still 0-indexed internally.

So keep:

i = 0
j = numbers.length - 1

Only convert to 1-indexed when returning:

return [i + 1, j + 1]


--------------------------------------------------
TIME / SPACE COMPLEXITY
--------------------------------------------------

Time: O(n)

Each pointer moves through the array at most once.

Space: O(1)

No extra Map or Set is needed.
*/


/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    var i = 0;
    var j = numbers.length - 1;

    while (i < j) {
        var sum = numbers[i] + numbers[j];

        if (sum === target) {
            return [i + 1, j + 1];
        }

        if (sum < target) {
            i++;
        } else {
            j--;
        }
    }
};


// --------------------------------------------------
// QUICK CHECKS
// --------------------------------------------------

console.log(twoSum([2, 7, 11, 15], 9));
// [1, 2]

console.log(twoSum([2, 3, 4], 6));
// [1, 3]

console.log(twoSum([-1, 0], -1));
// [1, 2]


/*
--------------------------------------------------
THINGS TO REMEMBER
--------------------------------------------------

Two Sum II
-> Sorted array
-> Two pointers
-> Left pointer starts at the beginning
-> Right pointer starts at the end

Mental model:

sum too small -> move left pointer right
sum too large -> move right pointer left
sum correct   -> return

Interview clue:

"Sorted array + pair search"
-> think two pointers
*/