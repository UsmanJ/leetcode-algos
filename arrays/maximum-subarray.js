/**
 * LeetCode 53 - Maximum Subarray
 *
 * Pattern:
 * Kadane's Algorithm / Running Sum
 *
 * Problem:
 * Given an integer array nums, find the contiguous subarray
 * with the largest sum and return that sum.
 *
 *
 * Example:
 *
 * nums = [-2,1,-3,4,-1,2,1,-5,4]
 *
 * Best subarray:
 *
 * [4,-1,2,1]
 *
 * Sum:
 *
 * 6
 *
 * Output:
 *
 * 6
 */


/**
 * ------------------------------------------------------------
 * KEY IDEA
 * ------------------------------------------------------------
 *
 * As we move through the array, we maintain:
 *
 * currentSum
 *     = sum of the subarray we are currently building
 *
 * largestSum
 *     = largest sum we have seen so far
 *
 *
 * The important question at every index is:
 *
 * "Is the previous running sum helping me or hurting me?"
 *
 *
 * If currentSum is negative:
 *
 * carrying it forward would only make the next number smaller.
 *
 *
 * Example:
 *
 * currentSum = -5
 * next number = 4
 *
 * Keeping previous sum:
 *
 * -5 + 4 = -1
 *
 * Starting fresh:
 *
 * 0 + 4 = 4
 *
 *
 * So if currentSum is negative, we discard it.
 *
 *
 * This line does that:
 *
 * currentSum = Math.max(currentSum, 0);
 */


/**
 * ------------------------------------------------------------
 * IMPORTANT EDGE CASE
 * ------------------------------------------------------------
 *
 * Do NOT initialise largestSum to 0.
 *
 *
 * Example:
 *
 * nums = [-3, -2, -5]
 *
 * The correct answer is:
 *
 * -2
 *
 *
 * If largestSum started at 0, the algorithm would incorrectly
 * return 0 even though an empty subarray is not allowed.
 *
 *
 * Therefore:
 *
 * largestSum = nums[0]
 */


/**
 * Time Complexity:
 *
 * O(n)
 *
 * We visit every element once.
 *
 *
 * Space Complexity:
 *
 * O(1)
 *
 * We only store a few variables.
 */

var maxSubArray = function(nums) {

    var largestSum = nums[0];

    var currentSum = 0;


    for (var i = 0; i < nums.length; i++) {

        // If the previous running sum is negative,
        // discard it before adding the current number.
        currentSum = Math.max(currentSum, 0);


        // Add the current number to the running subarray.
        currentSum += nums[i];


        // Record the best sum seen so far.
        largestSum = Math.max(
            currentSum,
            largestSum
        );
    }


    return largestSum;
};


/**
 * ------------------------------------------------------------
 * WALKTHROUGH
 * ------------------------------------------------------------
 *
 * nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
 *
 *
 * Start:
 *
 * currentSum = 0
 * largestSum = -2
 *
 *
 * i = 0
 * nums[i] = -2
 *
 * currentSum = max(0, 0) = 0
 * currentSum = 0 + -2 = -2
 * largestSum = max(-2, -2) = -2
 *
 *
 * i = 1
 * nums[i] = 1
 *
 * currentSum = max(-2, 0) = 0
 * currentSum = 0 + 1 = 1
 * largestSum = max(1, -2) = 1
 *
 *
 * i = 2
 * nums[i] = -3
 *
 * currentSum = max(1, 0) = 1
 * currentSum = 1 + -3 = -2
 * largestSum = 1
 *
 *
 * i = 3
 * nums[i] = 4
 *
 * currentSum = max(-2, 0) = 0
 * currentSum = 0 + 4 = 4
 * largestSum = 4
 *
 *
 * From here:
 *
 * 4 + -1 + 2 + 1 = 6
 *
 * So the final answer becomes:
 *
 * 6
 */


/**
 * ------------------------------------------------------------
 * ANOTHER COMMON KADANE FORM
 * ------------------------------------------------------------
 *
 * You may also see the algorithm written like this:
 *
 * var currentSum = nums[0];
 * var largestSum = nums[0];
 *
 * for (var i = 1; i < nums.length; i++) {
 *
 *     currentSum = Math.max(
 *         nums[i],
 *         currentSum + nums[i]
 *     );
 *
 *     largestSum = Math.max(
 *         largestSum,
 *         currentSum
 *     );
 * }
 *
 *
 * This asks:
 *
 * "Should I start a new subarray at nums[i],
 * or continue the previous subarray?"
 *
 *
 * Both versions are Kadane's algorithm.
 */


/**
 * ------------------------------------------------------------
 * REMEMBER
 * ------------------------------------------------------------
 *
 * Pattern:
 *
 * Running sum / Kadane's Algorithm
 *
 *
 * Core idea:
 *
 * A negative running sum can never help a future subarray.
 *
 *
 * Therefore:
 *
 * if previous sum is negative:
 *     discard it
 *
 * add current number
 *
 * update best answer
 *
 *
 * Trigger:
 *
 * "Maximum/minimum sum of a CONTIGUOUS subarray"
 *
 * should make you think about Kadane's algorithm.
 *
 *
 * Complexity:
 *
 * Time:  O(n)
 * Space: O(1)
 */