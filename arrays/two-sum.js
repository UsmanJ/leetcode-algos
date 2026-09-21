/*
Problem: Two Sum
LeetCode: #1

Given an array of integers nums and an integer target,
return the indices of the two numbers such that they add up to target.

Example:
nums = [2, 7, 11, 15]
target = 9
output = [0, 1]

--------------------------------------------------
1. Brute-force approach
--------------------------------------------------

Idea:
Check every possible pair.

Time: O(n^2)
Space: O(1)

Learning:
- Use i < nums.length, not i <= nums.length
- Start j at i + 1 so we:
  - don't use the same element twice
  - don't check the same pair twice
*/

function twoSumBruteForce(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
}

/*
--------------------------------------------------
2. Optimised Hash Map approach
--------------------------------------------------

Idea:
For each number, work out the value we still need:

    complement = target - nums[i]

Then check whether we have already seen that value.

The Map stores:

    number -> index

Example:
nums = [2, 7, 11, 15]
target = 9

i = 0
current = 2
complement = 7
7 is not in the Map
store: 2 -> 0

i = 1
current = 7
complement = 2
2 is already in the Map at index 0
return [0, 1]

Time: O(n)
Space: O(n)

Pattern:
Hash Map / fast lookup

Key takeaway:
If I repeatedly need to ask:

    "Have I already seen the value I need?"

consider using a Map.
*/

function twoSum(nums, target) {
    const numMap = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }

        numMap.set(nums[i], i);
    }
}

// Quick checks
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6));       // [1, 2]
console.log(twoSum([3, 3], 6));          // [0, 1]