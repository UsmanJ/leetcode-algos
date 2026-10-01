/*
LeetCode 15 — 3Sum
Difficulty: Medium
Pattern: Sorting + Two Pointers

Problem:
Given an integer array nums, return all unique triplets:

[nums[i], nums[j], nums[k]]

such that:

nums[i] + nums[j] + nums[k] === 0

The solution must not contain duplicate triplets.


Example:

Input:
nums = [-1, 0, 1, 2, -1, -4]

Output:
[
    [-1, -1, 2],
    [-1, 0, 1]
]


--------------------------------------------------
KEY IDEA
--------------------------------------------------

3Sum can be reduced to a Two Sum II-style problem.

1. Sort the array.

2. Fix one number using i.

3. Put:
   j = i + 1
   k = end of array

4. While j < k:

   sum = nums[i] + nums[j] + nums[k]

   If sum === 0:
       save the triplet
       move j right
       move k left
       skip duplicate j and k values

   If sum > 0:
       sum is too large
       move k left

   If sum < 0:
       sum is too small
       move j right


--------------------------------------------------
WHY SORT FIRST?
--------------------------------------------------

Sorting lets us use two pointers.

After sorting:

If the sum is too small:
    moving j right gives us a larger value

If the sum is too large:
    moving k left gives us a smaller value


--------------------------------------------------
DUPLICATES
--------------------------------------------------

The answer must contain unique triplets.

Because the array is sorted, duplicate values sit next to each other.

Skip duplicate i values:

if (i > 0 && sortedNums[i] === sortedNums[i - 1]) {
    continue;
}

After finding a valid triplet:

j++;
k--;

Then skip repeated j values:

while (j < k && sortedNums[j] === sortedNums[j - 1]) {
    j++;
}

And repeated k values:

while (j < k && sortedNums[k] === sortedNums[k + 1]) {
    k--;
}


--------------------------------------------------
TIME / SPACE COMPLEXITY
--------------------------------------------------

Sorting:
O(n log n)

Outer loop:
O(n)

Two-pointer search for each i:
O(n)

Overall:
O(n^2)

Extra space:
O(1) excluding the returned answers
(depending on the sorting implementation).
*/


/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    var sortedNums = nums.sort((a, b) => a - b);
    var answers = [];

    for (var i = 0; i < sortedNums.length; i++) {
        // Skip duplicate fixed values
        if (i > 0 && sortedNums[i] === sortedNums[i - 1]) {
            continue;
        }

        var j = i + 1;
        var k = sortedNums.length - 1;

        while (j < k) {
            var sum = sortedNums[i] + sortedNums[j] + sortedNums[k];

            if (sum === 0) {
                answers.push([
                    sortedNums[i],
                    sortedNums[j],
                    sortedNums[k]
                ]);

                j++;
                k--;

                // Skip duplicate j values
                while (j < k && sortedNums[j] === sortedNums[j - 1]) {
                    j++;
                }

                // Skip duplicate k values
                while (j < k && sortedNums[k] === sortedNums[k + 1]) {
                    k--;
                }

            } else if (sum > 0) {
                k--;
            } else {
                j++;
            }
        }
    }

    return answers;
};


// --------------------------------------------------
// QUICK CHECKS
// --------------------------------------------------

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
// [[-1, -1, 2], [-1, 0, 1]]

console.log(threeSum([0, 1, 1]));
// []

console.log(threeSum([0, 0, 0]));
// [[0, 0, 0]]

console.log(threeSum([-2, 0, 0, 2, 2]));
// [[-2, 0, 2]]


/*
--------------------------------------------------
THINGS TO REMEMBER
--------------------------------------------------

3Sum
-> Sort
-> Fix one number
-> Solve the remaining problem with two pointers
-> Skip duplicates

Mental model:

"For each fixed number,
can the other two numbers make the rest of the target?"

3Sum
=
one fixed number
+
Two Sum II
*/