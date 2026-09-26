/**
 * LeetCode 268 - Missing Number
 *
 * Problem:
 * You are given an array nums containing n distinct numbers
 * taken from the range:
 *
 * 0 to n
 *
 * exactly one number from that range is missing.
 *
 * Return the missing number.
 *
 *
 * Example:
 *
 * nums = [3, 0, 1]
 *
 * nums.length = 3
 *
 * Expected range:
 *
 * 0, 1, 2, 3
 *
 * Missing number:
 *
 * 2
 */


/**
 * ------------------------------------------------------------
 * APPROACH 1 - SET
 * ------------------------------------------------------------
 *
 * A straightforward solution is to put every number into a Set.
 *
 * Then check every expected number from:
 *
 * 0 to nums.length
 *
 * and return the first number that does not exist in the Set.
 *
 *
 * Example:
 *
 * nums = [3, 0, 1]
 *
 * Set contains:
 *
 * 3, 0, 1
 *
 *
 * Check:
 *
 * 0 -> exists
 * 1 -> exists
 * 2 -> missing
 *
 * return 2
 *
 *
 * IMPORTANT:
 *
 * We must check up to nums.length INCLUSIVE.
 *
 * For example:
 *
 * nums = [0, 1]
 *
 * nums.length = 2
 *
 * Expected range:
 *
 * 0, 1, 2
 *
 * Missing number:
 *
 * 2
 */


/**
 * Time Complexity:
 *
 * O(n)
 *
 * Creating the Set takes O(n).
 *
 * Then checking the expected range also takes O(n).
 *
 * O(n) + O(n)
 *
 * simplifies to:
 *
 * O(n)
 *
 *
 * Space Complexity:
 *
 * O(n)
 *
 * because the Set stores the values from nums.
 */

var missingNumberSet = function(nums) {

    var set = new Set(nums);

    for (var i = 0; i <= nums.length; i++) {

        if (!set.has(i)) {

            return i;
        }
    }
};


/**
 * ------------------------------------------------------------
 * APPROACH 2 - EXPECTED SUM VS ACTUAL SUM
 * ------------------------------------------------------------
 *
 * We can improve the space complexity by noticing something:
 *
 * We know exactly what numbers SHOULD exist.
 *
 *
 * If:
 *
 * nums.length = n
 *
 * then the expected numbers are:
 *
 * 0, 1, 2, ..., n
 *
 *
 * Therefore:
 *
 * missing number
 *
 * =
 *
 * expected total - actual total
 *
 *
 * Example:
 *
 * nums = [3, 0, 1]
 *
 *
 * Expected:
 *
 * 0 + 1 + 2 + 3
 *
 * =
 *
 * 6
 *
 *
 * Actual:
 *
 * 3 + 0 + 1
 *
 * =
 *
 * 4
 *
 *
 * Difference:
 *
 * 6 - 4
 *
 * =
 *
 * 2
 *
 *
 * Therefore:
 *
 * missing number = 2
 */


/**
 * ------------------------------------------------------------
 * BUILDING THE EXPECTED SUM
 * ------------------------------------------------------------
 *
 * While looping through nums:
 *
 * expectedSum += i
 *
 * actualSum += nums[i]
 *
 *
 * For:
 *
 * nums = [3, 0, 1]
 *
 *
 * The loop covers indexes:
 *
 * 0
 * 1
 * 2
 *
 *
 * So expectedSum after the loop contains:
 *
 * 0 + 1 + 2
 *
 *
 * But the expected range actually goes up to:
 *
 * nums.length
 *
 * which is:
 *
 * 3
 *
 *
 * Therefore, after the loop:
 *
 * expectedSum += nums.length
 */


/**
 * ------------------------------------------------------------
 * OPTIMIZED SOLUTION
 * ------------------------------------------------------------
 *
 * Time Complexity:
 *
 * O(n)
 *
 * We scan through nums once.
 *
 *
 * Space Complexity:
 *
 * O(1)
 *
 * We only store:
 *
 * expectedSum
 * actualSum
 * i
 *
 * The amount of extra memory does not grow with nums.
 */

var missingNumber = function(nums) {

    let expectedSum = 0;

    let actualSum = 0;


    for (var i = 0; i < nums.length; i++) {

        // Build the sum of the expected numbers.
        expectedSum += i;

        // Build the sum of the numbers actually present.
        actualSum += nums[i];
    }


    // The expected range includes nums.length itself.
    expectedSum += nums.length;


    // The difference must be the missing number.
    return expectedSum - actualSum;
};


/**
 * ------------------------------------------------------------
 * THINGS TO REMEMBER
 * ------------------------------------------------------------
 *
 * 1. If nums.length = n, the expected range is:
 *
 *    0 through n
 *
 *    inclusive.
 *
 *
 * 2. The Set solution is:
 *
 *    Time:  O(n)
 *    Space: O(n)
 *
 *
 * 3. To avoid the Set, use:
 *
 *    expected sum - actual sum
 *
 *
 * 4. While looping:
 *
 *    expectedSum += i
 *
 *    actualSum += nums[i]
 *
 *
 * 5. After the loop:
 *
 *    expectedSum += nums.length
 *
 *
 * 6. Then:
 *
 *    expectedSum - actualSum
 *
 *    gives the missing number.
 *
 *
 * 7. Optimized complexity:
 *
 *    Time:  O(n)
 *    Space: O(1)
 *
 *
 * ------------------------------------------------------------
 * PATTERN TO RECOGNISE
 * ------------------------------------------------------------
 *
 * This problem uses an:
 *
 * EXPECTED VALUE VS ACTUAL VALUE
 *
 * pattern.
 *
 *
 * When you know exactly what values should exist, you can
 * sometimes compare:
 *
 * expected total
 *
 * against:
 *
 * actual total
 *
 * to find what is missing.
 */