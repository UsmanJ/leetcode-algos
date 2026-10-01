/*
LeetCode 11 — Container With Most Water
Difficulty: Medium
Pattern: Two Pointers

Problem:
You are given an integer array height.

Each value represents the height of a vertical line.

Find two lines that, together with the x-axis, form a container
that can hold the most water.

Return the maximum amount of water the container can hold.


Example:

Input:
height = [1,8,6,2,5,4,8,3,7]

Output:
49


--------------------------------------------------
KEY IDEA
--------------------------------------------------

Use two pointers:

i -> starts at the beginning
j -> starts at the end

The amount of water between two lines is:

area = shorter height * width

So:

area = Math.min(height[i], height[j]) * (j - i)


Why use the shorter height?

Because the water would overflow above the shorter line.

Example:

height[i] = 3
height[j] = 10

The container can only hold water up to height 3.


--------------------------------------------------
WHICH POINTER SHOULD MOVE?
--------------------------------------------------

This is the main insight of the problem.

If:

height[i] < height[j]

then the left line is limiting the container.

Move:

i++

and hope to find a taller line.


If:

height[i] >= height[j]

then the right line is limiting the container.

Move:

j--


There is no benefit in keeping the shorter line while reducing
the width.

So:

shorter left line  -> move left pointer
shorter right line -> move right pointer


--------------------------------------------------
WIDTH
--------------------------------------------------

The distance between the two indexes is:

j - i

NOT:

j - i + 1


Example:

i = 0
j = 8

The distance is:

8 - 0 = 8


--------------------------------------------------
TIME / SPACE COMPLEXITY
--------------------------------------------------

Time: O(n)

Each pointer only moves inward.

Space: O(1)

No extra array, Map, or Set is required.
*/


/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    var i = 0;
    var j = height.length - 1;
    var maxArea = 0;

    while (i < j) {
        var area = Math.min(height[i], height[j]) * (j - i);

        if (area > maxArea) {
            maxArea = area;
        }

        if (height[i] < height[j]) {
            i++;
        } else {
            j--;
        }
    }

    return maxArea;
};


// --------------------------------------------------
// QUICK CHECKS
// --------------------------------------------------

console.log(maxArea([1,8,6,2,5,4,8,3,7]));
// 49

console.log(maxArea([1,1]));
// 1

console.log(maxArea([4,3,2,1,4]));
// 16

console.log(maxArea([1,2,1]));
// 2


/*
--------------------------------------------------
THINGS TO REMEMBER
--------------------------------------------------

Container With Most Water
-> Two pointers
-> Start at opposite ends
-> Area = shorter height * width
-> Move the shorter side


Mental model:

"The shorter wall limits the water."


At each step:

1. Calculate the current area.
2. Save it if it is the biggest seen so far.
3. Move the pointer pointing at the shorter line.


Interview clue:

If you see:

- sorted-ish / positional data
- two ends of an array
- trying to maximise something between two indexes

consider whether a two-pointer approach could work.
*/