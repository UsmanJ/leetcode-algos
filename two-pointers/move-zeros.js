/**
 * LeetCode 283 - Move Zeroes
 *
 * Problem:
 * Given an integer array nums, move all 0's to the end of the array
 * while maintaining the relative order of all non-zero elements.
 *
 * The array must be modified in place.
 *
 *
 * Example:
 *
 * Input:
 *
 * nums = [0, 1, 0, 3, 12]
 *
 * Output:
 *
 * [1, 3, 12, 0, 0]
 */


/**
 * ------------------------------------------------------------
 * INITIAL IDEA - EXTRA ARRAY
 * ------------------------------------------------------------
 *
 * A straightforward approach would be:
 *
 * 1. Create a new array.
 * 2. Loop through nums.
 * 3. Add every non-zero number to the new array.
 * 4. Count how many zeroes were found.
 * 5. Add that many zeroes to the end.
 *
 *
 * Example:
 *
 * nums = [0, 1, 0, 3, 12]
 *
 * Non-zero values:
 *
 * [1, 3, 12]
 *
 * Number of zeroes:
 *
 * 2
 *
 * Final:
 *
 * [1, 3, 12, 0, 0]
 *
 *
 * This works logically, but the problem asks us to modify
 * nums in place.
 *
 * Creating another array would use O(n) extra space.
 */


/**
 * ------------------------------------------------------------
 * OPTIMIZED APPROACH - TWO PASSES
 * ------------------------------------------------------------
 *
 * Instead of creating another array, we can reuse nums.
 *
 * We keep a pointer which represents:
 *
 * "the position where the next non-zero number should go"
 *
 *
 * Start:
 *
 * nums = [0, 1, 0, 3, 12]
 *
 * pointer = 0
 */


/**
 * ------------------------------------------------------------
 * PASS 1 - MOVE NON-ZERO VALUES TO THE FRONT
 * ------------------------------------------------------------
 *
 * Loop through every number.
 *
 * Whenever we find a non-zero value:
 *
 * nums[pointer] = nums[i]
 *
 * then:
 *
 * pointer++
 *
 *
 * Example:
 *
 * nums = [0, 1, 0, 3, 12]
 *
 *
 * i = 0
 *
 * nums[i] = 0
 *
 * Ignore it.
 *
 * pointer = 0
 *
 *
 * i = 1
 *
 * nums[i] = 1
 *
 * Non-zero.
 *
 * nums[0] = 1
 *
 * Array temporarily becomes:
 *
 * [1, 1, 0, 3, 12]
 *
 * pointer = 1
 *
 *
 * i = 2
 *
 * nums[i] = 0
 *
 * Ignore.
 *
 *
 * i = 3
 *
 * nums[i] = 3
 *
 * nums[1] = 3
 *
 * Array:
 *
 * [1, 3, 0, 3, 12]
 *
 * pointer = 2
 *
 *
 * i = 4
 *
 * nums[i] = 12
 *
 * nums[2] = 12
 *
 * Array:
 *
 * [1, 3, 12, 3, 12]
 *
 * pointer = 3
 *
 *
 * At this point, everything BEFORE pointer is correct:
 *
 * [1, 3, 12]
 *
 * Everything after pointer is old/stale data that we no
 * longer care about.
 */


/**
 * ------------------------------------------------------------
 * PASS 2 - FILL THE REMAINING POSITIONS WITH ZEROES
 * ------------------------------------------------------------
 *
 * pointer is now 3.
 *
 * nums.length is 5.
 *
 * Therefore indexes:
 *
 * 3
 * 4
 *
 * must contain zeroes.
 *
 *
 * We can keep writing zeroes while:
 *
 * pointer < nums.length
 *
 *
 * nums[3] = 0
 * nums[4] = 0
 *
 *
 * Final array:
 *
 * [1, 3, 12, 0, 0]
 */


/**
 * ------------------------------------------------------------
 * SOLUTION
 * ------------------------------------------------------------
 *
 * Time Complexity:
 *
 * O(n)
 *
 * We use two separate loops:
 *
 * O(n) + O(n)
 *
 * which simplifies to:
 *
 * O(n)
 *
 *
 * Space Complexity:
 *
 * O(1)
 *
 * We modify the existing array and only use a pointer variable.
 */

var moveZeroes = function(nums) {

    var pointer = 0;


    // --------------------------------------------------------
    // PASS 1:
    // Move every non-zero value towards the front.
    // --------------------------------------------------------

    for (var i = 0; i < nums.length; i++) {

        if (nums[i] !== 0) {

            nums[pointer] = nums[i];

            pointer++;
        }
    }


    // --------------------------------------------------------
    // PASS 2:
    // Everything from pointer onwards should now be zero.
    // --------------------------------------------------------

    while (pointer < nums.length) {

        nums[pointer] = 0;

        pointer++;
    }
};


/**
 * ------------------------------------------------------------
 * THINGS TO REMEMBER
 * ------------------------------------------------------------
 *
 * 1. The problem asks us to modify the original array
 *    in place.
 *
 *
 * 2. We do NOT need to physically move each zero towards
 *    the end.
 *
 *
 * 3. Instead, move all non-zero values towards the front.
 *
 *
 * 4. pointer means:
 *
 *    "where should the next non-zero value be written?"
 *
 *
 * 5. During the first pass:
 *
 *    if nums[i] !== 0:
 *
 *        nums[pointer] = nums[i]
 *        pointer++
 *
 *
 * 6. After the first pass:
 *
 *    everything before pointer is already correct.
 *
 *
 * 7. Everything from pointer onwards can safely be
 *    overwritten with 0.
 *
 *
 * 8. Two separate loops are still:
 *
 *    O(n)
 *
 *    not O(n²).
 *
 *
 * 9. Final complexity:
 *
 *    Time:  O(n)
 *    Space: O(1)
 *
 *
 * ------------------------------------------------------------
 * PATTERN TO RECOGNISE
 * ------------------------------------------------------------
 *
 * This is a TWO-POINTER / WRITE-POINTER pattern.
 *
 * One pointer scans through the array:
 *
 * i
 *
 * The other tells us where the next valid value should
 * be written:
 *
 * pointer
 *
 *
 * This pattern is useful when:
 *
 * - removing values in place
 * - moving certain values
 * - compacting arrays
 * - preserving the order of selected elements
 */