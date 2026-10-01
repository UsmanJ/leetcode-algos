/*
LeetCode 977 — Squares of a Sorted Array
Difficulty: Easy
Pattern: Two Pointers

Problem:
Given an integer array nums sorted in non-decreasing order,
return an array of the squares of each number, also sorted
in non-decreasing order.


Example:

Input:
nums = [-4, -1, 0, 3, 10]

Output:
[0, 1, 9, 16, 100]


--------------------------------------------------
KEY IDEA
--------------------------------------------------

The input array is sorted, but negative numbers can produce
large squares.

Example:

-7 < 4

but:

49 > 16

So the largest square must come from one of the two ends
of the array.

Use two pointers:

i -> start of array
j -> end of array

Also use a write pointer:

k -> last position in the result array


At each step:

1. Compare:

nums[i] * nums[i]

and:

nums[j] * nums[j]

2. Put the larger square into answers[k].

3. Move the pointer that produced that square.

4. Move k one position left.


--------------------------------------------------
WHY FILL THE RESULT BACKWARDS?
--------------------------------------------------

The largest square is always found at one of the two ends.

So it is easiest to place the largest value at the end
of the result array first.

Then work backwards toward the smallest value.


Example:

nums = [-4, -1, 0, 3, 10]

Compare:

(-4)^2 = 16
10^2   = 100

100 is larger.

Put:

answers[4] = 100

Then move the right pointer left.


--------------------------------------------------
TIME / SPACE COMPLEXITY
--------------------------------------------------

Time: O(n)

Each pointer moves through the array at most once.

Space: O(n)

The output array contains n values.
*/


/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
    var i = 0;
    var j = nums.length - 1;
    var k = nums.length - 1;
    var answers = [];

    while (i <= j) {
        var leftSquare = nums[i] * nums[i];
        var rightSquare = nums[j] * nums[j];

        if (leftSquare > rightSquare) {
            answers[k] = leftSquare;
            i++;
        } else {
            answers[k] = rightSquare;
            j--;
        }

        k--;
    }

    return answers;
};


// --------------------------------------------------
// QUICK CHECKS
// --------------------------------------------------

console.log(sortedSquares([-4, -1, 0, 3, 10]));
// [0, 1, 9, 16, 100]

console.log(sortedSquares([-7, -3, 2, 3, 11]));
// [4, 9, 9, 49, 121]

console.log(sortedSquares([1, 2, 3]));
// [1, 4, 9]

console.log(sortedSquares([-3, -2, -1]));
// [1, 4, 9]


/*
--------------------------------------------------
THINGS TO REMEMBER
--------------------------------------------------

Squares of a Sorted Array
-> Two pointers
-> Start at opposite ends
-> Compare the squares
-> Put the larger square at the end
-> Move only the pointer that was used


Mental model:

"The biggest square must be at one of the two ends."


Interview clue:

When an array is sorted but negative numbers change the
ordering after a transformation such as squaring,
consider using two pointers from both ends.
*/