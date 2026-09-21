/**
 * LeetCode 128 - Longest Consecutive Sequence
 *
 * Problem:
 * Given an unsorted array of integers, return the length of the
 * longest sequence of consecutive integers.
 *
 * The numbers do NOT need to appear next to each other in the
 * original array.
 *
 *
 * Example:
 *
 * Input:
 * nums = [100, 4, 200, 1, 3, 2]
 *
 * Consecutive sequence:
 *
 * 1, 2, 3, 4
 *
 * Output:
 *
 * 4
 *
 *
 * Important:
 *
 * The target time complexity is O(n).
 */


/**
 * ------------------------------------------------------------
 * APPROACH 1 - SORT FIRST
 * ------------------------------------------------------------
 *
 * A simple first idea is:
 *
 * 1. Sort the array.
 * 2. Walk through it from left to right.
 * 3. Count how long the current consecutive sequence is.
 *
 *
 * Example:
 *
 * nums:
 *
 * [100, 4, 200, 1, 3, 2]
 *
 * after sorting:
 *
 * [1, 2, 3, 4, 100, 200]
 *
 * Then:
 *
 * 1 -> 2 -> 3 -> 4
 *
 * gives a sequence length of 4.
 *
 *
 * One thing to handle carefully is duplicates.
 *
 * Example:
 *
 * [1, 2, 2, 3]
 *
 * The duplicate 2 should NOT break the sequence.
 *
 *
 * Time Complexity:
 *
 * O(n log n)
 *
 * because sorting dominates the runtime.
 *
 *
 * Space Complexity:
 *
 * Depends on the sorting implementation.
 *
 *
 * This approach works, but it does NOT meet the required O(n)
 * time complexity.
 */


/**
 * ------------------------------------------------------------
 * APPROACH 2 - HASH SET
 * ------------------------------------------------------------
 *
 * The optimized solution uses a Set.
 *
 *
 * Why a Set?
 *
 * A Set gives us fast average O(1) lookup:
 *
 * set.has(value)
 *
 *
 * We first put all numbers into the Set.
 *
 * Example:
 *
 * nums = [100, 4, 200, 1, 3, 2]
 *
 * Set contains:
 *
 * 100, 4, 200, 1, 3, 2
 *
 *
 * ------------------------------------------------------------
 * KEY OBSERVATION
 * ------------------------------------------------------------
 *
 * We do NOT want to start counting from every number.
 *
 * For example:
 *
 * 1, 2, 3, 4
 *
 * We only want to start from 1.
 *
 *
 * How do we know that 1 is the beginning?
 *
 * Because:
 *
 * 1 - 1 = 0
 *
 * and 0 does NOT exist in the Set.
 *
 *
 * For 2:
 *
 * 2 - 1 = 1
 *
 * and 1 DOES exist.
 *
 * So 2 is not the beginning of the sequence.
 *
 *
 * Therefore:
 *
 * if currentNumber - 1 does NOT exist
 *
 * then currentNumber is the start of a sequence.
 */


/**
 * ------------------------------------------------------------
 * WALKTHROUGH
 * ------------------------------------------------------------
 *
 * nums:
 *
 * [100, 4, 200, 1, 3, 2]
 *
 *
 * Check 100:
 *
 * Does 99 exist?
 *
 * No.
 *
 * So 100 starts a sequence.
 *
 * Does 101 exist?
 *
 * No.
 *
 * Length = 1
 *
 *
 * Check 4:
 *
 * Does 3 exist?
 *
 * Yes.
 *
 * Therefore 4 is NOT the start.
 *
 * Skip it.
 *
 *
 * Check 200:
 *
 * Does 199 exist?
 *
 * No.
 *
 * Sequence length = 1.
 *
 *
 * Check 1:
 *
 * Does 0 exist?
 *
 * No.
 *
 * So 1 is a sequence start.
 *
 *
 * Now keep checking:
 *
 * 2 exists -> length = 2
 * 3 exists -> length = 3
 * 4 exists -> length = 4
 * 5 does not exist -> stop
 *
 *
 * Longest sequence:
 *
 * 4
 */


/**
 * ------------------------------------------------------------
 * WHY USE A WHILE LOOP?
 * ------------------------------------------------------------
 *
 * Once we find the start of a sequence, we do not know
 * exactly how long the sequence is.
 *
 * Therefore, we keep checking while the next number exists.
 *
 *
 * Example:
 *
 * currentNumber = 1
 *
 * while 2 exists:
 *     move to 2
 *
 * while 3 exists:
 *     move to 3
 *
 * while 4 exists:
 *     move to 4
 *
 * 5 does not exist:
 *     stop
 *
 *
 * The variables are:
 *
 * currentNumber
 *
 * and:
 *
 * currentConsecutive
 */


/**
 * ------------------------------------------------------------
 * WHY NOT LOOP THROUGH nums?
 * ------------------------------------------------------------
 *
 * Consider:
 *
 * [1, 1, 1, 1, 2, 3, 4]
 *
 * If we loop directly through nums, every duplicate 1 could
 * trigger the same sequence search:
 *
 * 1 -> 2 -> 3 -> 4
 *
 * multiple times.
 *
 *
 * The Set already removes duplicates.
 *
 * So it is cleaner and safer to iterate over the unique values
 * in the Set:
 *
 * for (const num of set)
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
 *
 * Why is the while loop still O(n)?
 *
 * At first glance, it looks like we have a loop inside a loop.
 *
 * But we only start walking through a sequence when we find
 * its FIRST number.
 *
 * Example:
 *
 * 1, 2, 3, 4
 *
 * We walk through that sequence starting at 1.
 *
 * We do NOT walk through it again starting from:
 *
 * 2
 * 3
 * 4
 *
 * because each of those has a predecessor.
 *
 *
 * Across the whole algorithm, each number is processed only a
 * small constant number of times.
 *
 * Therefore:
 *
 * O(n)
 *
 *
 * Space Complexity:
 *
 * O(n)
 *
 * because the Set can contain every number from the input.
 */

var longestConsecutive = function(nums) {

    var set = new Set(nums);

    var longest = 0;

    for (const num of set) {

        // A number is the start of a sequence only if the
        // previous number does not exist.
        if (!set.has(num - 1)) {

            var currentNumber = num;

            var currentConsecutive = 1;

            // Keep moving forward while the next consecutive
            // number exists.
            while (set.has(currentNumber + 1)) {

                currentNumber++;

                currentConsecutive++;
            }

            // Update the longest sequence found so far.
            if (currentConsecutive > longest) {

                longest = currentConsecutive;
            }
        }
    }

    return longest;
};


/**
 * ------------------------------------------------------------
 * THINGS TO REMEMBER
 * ------------------------------------------------------------
 *
 * 1. Sorting would work:
 *
 *    O(n log n)
 *
 *
 * 2. The problem asks for:
 *
 *    O(n)
 *
 *
 * 3. A Set gives fast membership checks:
 *
 *    set.has(value)
 *
 *
 * 4. To identify the START of a sequence:
 *
 *    check whether:
 *
 *    num - 1
 *
 *    exists.
 *
 *
 * 5. If num - 1 does NOT exist:
 *
 *    num is the start of a sequence.
 *
 *
 * 6. Then keep checking:
 *
 *    num + 1
 *    num + 2
 *    num + 3
 *
 *    until the next value is missing.
 *
 *
 * 7. Use a while loop when you want to continue until a
 *    condition stops being true.
 *
 *
 * 8. Iterate over the Set instead of nums so duplicates
 *    do not cause repeated work.
 *
 *
 * 9. Final complexity:
 *
 *    Time:  O(n)
 *    Space: O(n)
 *
 *
 * ------------------------------------------------------------
 * PATTERN TO RECOGNISE
 * ------------------------------------------------------------
 *
 * This problem uses another useful interview pattern:
 *
 * IDENTIFY THE START OF A SEQUENCE
 *
 *
 * Instead of exploring from every possible number, first ask:
 *
 * "Is this actually the beginning?"
 *
 * Only do the expensive work when the answer is yes.
 */