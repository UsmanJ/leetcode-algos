/**
 * LeetCode 169 - Majority Element
 *
 * Problem:
 * Given an array nums, return the element that appears more than
 * nums.length / 2 times.
 *
 * The problem guarantees that a majority element always exists.
 *
 *
 * Example:
 *
 * nums = [2, 2, 1, 1, 1, 2, 2]
 *
 * 2 appears 4 times.
 *
 * nums.length = 7
 *
 * 7 / 2 = 3.5
 *
 * Since:
 *
 * 4 > 3.5
 *
 * the majority element is:
 *
 * 2
 */


/**
 * ------------------------------------------------------------
 * APPROACH 1 - FREQUENCY MAP
 * ------------------------------------------------------------
 *
 * A straightforward approach is to count how many times each
 * number appears.
 *
 * Store:
 *
 * number -> count
 *
 *
 * Example:
 *
 * nums = [2, 2, 1, 1, 1, 2, 2]
 *
 * Map eventually contains:
 *
 * 2 -> 4
 * 1 -> 3
 *
 *
 * After updating the count for a number, check whether:
 *
 * count > nums.length / 2
 *
 * If so, that number is the majority element.
 *
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
 * O(n)
 *
 * In the worst case, the Map could contain many different
 * values.
 */

var majorityElementMap = function(nums) {

    const majorityThreshold = nums.length / 2;

    const map = new Map();

    for (var i = 0; i < nums.length; i++) {

        if (map.has(nums[i])) {

            map.set(nums[i], map.get(nums[i]) + 1);

        } else {

            map.set(nums[i], 1);

        }

        if (map.get(nums[i]) > majorityThreshold) {

            return nums[i];
        }
    }
};


/**
 * ------------------------------------------------------------
 * APPROACH 2 - BOYER-MOORE VOTING ALGORITHM
 * ------------------------------------------------------------
 *
 * The Map solution is already O(n) time, but we can improve
 * the extra space from O(n) to O(1).
 *
 *
 * We only keep two variables:
 *
 * candidate
 * count
 *
 *
 * The idea is:
 *
 * - If count becomes 0, choose the current number as the new
 *   candidate.
 *
 * - If the current number matches the candidate:
 *
 *   count++
 *
 * - Otherwise:
 *
 *   count--
 *
 *
 * Different numbers effectively cancel each other out.
 *
 *
 * Because the problem guarantees that the majority element
 * appears more than half the time, it cannot be completely
 * cancelled out.
 */


/**
 * ------------------------------------------------------------
 * EXAMPLE
 * ------------------------------------------------------------
 *
 * nums = [2, 2, 1, 1, 1, 2, 2]
 *
 *
 * Start:
 *
 * candidate = undefined
 * count = 0
 *
 *
 * num = 2
 *
 * count is 0
 *
 * candidate = 2
 *
 * num === candidate
 *
 * count = 1
 *
 *
 * num = 2
 *
 * same as candidate
 *
 * count = 2
 *
 *
 * num = 1
 *
 * different from candidate
 *
 * count = 1
 *
 *
 * num = 1
 *
 * different
 *
 * count = 0
 *
 *
 * num = 1
 *
 * count is 0
 *
 * candidate = 1
 *
 * count = 1
 *
 *
 * num = 2
 *
 * different
 *
 * count = 0
 *
 *
 * num = 2
 *
 * count is 0
 *
 * candidate = 2
 *
 * count = 1
 *
 *
 * Final candidate:
 *
 * 2
 */


/**
 * ------------------------------------------------------------
 * WHY DOES CANCELLATION WORK?
 * ------------------------------------------------------------
 *
 * Suppose the majority element appears more than half the time.
 *
 * Every occurrence of a different number can cancel one
 * occurrence of the majority element.
 *
 * But there are not enough non-majority values to cancel all
 * occurrences of the majority.
 *
 * Therefore, after all cancellations, the majority element
 * must remain as the final candidate.
 *
 *
 * IMPORTANT:
 *
 * This works directly here because LeetCode guarantees that a
 * majority element exists.
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
 * We scan the array once.
 *
 *
 * Space Complexity:
 *
 * O(1)
 *
 * We only store:
 *
 * candidate
 * count
 *
 * regardless of how large nums becomes.
 */

var majorityElement = function(nums) {

    let candidate;

    let count = 0;

    for (var i = 0; i < nums.length; i++) {

        // If all previous votes have cancelled out,
        // make the current number the new candidate.
        if (count === 0) {

            candidate = nums[i];
        }

        // Matching candidate adds a vote.
        if (nums[i] === candidate) {

            count++;

        } else {

            // Different number cancels one vote.
            count--;
        }
    }

    return candidate;
};


/**
 * ------------------------------------------------------------
 * THINGS TO REMEMBER
 * ------------------------------------------------------------
 *
 * 1. A frequency Map is a perfectly valid solution:
 *
 *    Time:  O(n)
 *    Space: O(n)
 *
 *
 * 2. The optimized solution is Boyer-Moore Voting:
 *
 *    Time:  O(n)
 *    Space: O(1)
 *
 *
 * 3. Boyer-Moore keeps:
 *
 *    candidate
 *    count
 *
 *
 * 4. When count reaches 0:
 *
 *    choose the current number as the new candidate.
 *
 *
 * 5. If the current number matches the candidate:
 *
 *    count++
 *
 *
 * 6. Otherwise:
 *
 *    count--
 *
 *
 * 7. Think of different numbers as cancelling each other.
 *
 *
 * 8. Because the true majority appears more than half the time,
 *    it survives the cancellation process.
 *
 *
 * ------------------------------------------------------------
 * PATTERN TO RECOGNISE
 * ------------------------------------------------------------
 *
 * This is a useful interview pattern:
 *
 * CANCELLATION / VOTING
 *
 * When one value is guaranteed to dominate the input, it may
 * be possible to cancel opposing values rather than storing
 * every frequency explicitly.
 */