/**
 * LeetCode 209 - Minimum Size Subarray Sum
 *
 * Pattern:
 * Variable-size sliding window
 *
 * Problem:
 * Given an array of positive integers nums and a target,
 * return the minimum length of a contiguous subarray whose
 * sum is greater than or equal to target.
 *
 * If no such subarray exists, return 0.
 *
 *
 * Example:
 *
 * target = 7
 * nums = [2, 3, 1, 2, 4, 3]
 *
 * Shortest valid subarray:
 *
 * [4, 3]
 *
 * sum = 7
 *
 * length = 2
 *
 * Output:
 *
 * 2
 */


/**
 * ------------------------------------------------------------
 * KEY IDEA
 * ------------------------------------------------------------
 *
 * Expand the window by moving right.
 *
 * Keep a running sum.
 *
 *
 * When:
 *
 * sum >= target
 *
 * the window is valid.
 *
 *
 * But we want the SMALLEST valid window.
 *
 * Therefore, once the window becomes valid:
 *
 * keep shrinking it from the left for as long as it
 * remains valid.
 */


/**
 * ------------------------------------------------------------
 * WHY Infinity?
 * ------------------------------------------------------------
 *
 * We want to find the minimum length.
 *
 * If we started:
 *
 * minLength = 0
 *
 * then:
 *
 * Math.min(0, 3)
 *
 * would always remain 0.
 *
 *
 * So we start with:
 *
 * Infinity
 *
 *
 * The first real valid length will always be smaller.
 *
 *
 * If minLength is still Infinity at the end,
 * no valid subarray existed.
 */


/**
 * Time Complexity:
 *
 * O(n)
 *
 * right moves through nums once.
 *
 * left also only moves forwards.
 *
 *
 * Space Complexity:
 *
 * O(1)
 */

var minSubArrayLen = function(target, nums) {

    var left = 0;

    var sum = 0;

    var minLength = Infinity;


    for (var right = 0; right < nums.length; right++) {

        // Expand the window.
        sum += nums[right];


        // The window is valid.
        //
        // Keep shrinking it to find the smallest
        // valid version.
        while (sum >= target) {

            // Record length BEFORE removing nums[left],
            // because this window is currently valid.
            minLength = Math.min(
                minLength,
                right - left + 1
            );


            // Shrink from the left.
            sum -= nums[left];

            left++;
        }
    }


    // No valid window was found.
    if (minLength === Infinity) {

        return 0;
    }


    return minLength;
};


/**
 * ------------------------------------------------------------
 * REMEMBER
 * ------------------------------------------------------------
 *
 * Variable-size sliding window:
 *
 * expand right
 * add nums[right]
 *
 * while window is valid:
 *     update best answer
 *     remove nums[left]
 *     left++
 *
 *
 * Why do we shrink WHILE valid?
 *
 * Because we are looking for the minimum length.
 *
 *
 * Valid condition:
 *
 * sum >= target
 *
 *
 * Final complexity:
 *
 * Time:  O(n)
 * Space: O(1)
 */