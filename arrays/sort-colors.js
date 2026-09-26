/**
 * LeetCode 75 - Sort Colors
 *
 * Problem:
 * Given an array nums containing only:
 *
 * 0 = red
 * 1 = white
 * 2 = blue
 *
 * Rearrange the array in-place so that all:
 *
 * 0s come first,
 * then 1s,
 * then 2s.
 *
 *
 * Example:
 *
 * Input:
 *
 * nums = [2, 0, 2, 1, 1, 0]
 *
 * Output:
 *
 * [0, 0, 1, 1, 2, 2]
 *
 *
 * The array must be modified in place.
 */


/**
 * ------------------------------------------------------------
 * APPROACH 1 - COUNT EACH COLOUR
 * ------------------------------------------------------------
 *
 * Since nums can only contain three possible values:
 *
 * 0
 * 1
 * 2
 *
 * we can first count how many of each value exist.
 *
 *
 * Example:
 *
 * nums = [2, 0, 2, 1, 1, 0]
 *
 * After counting:
 *
 * red = 2
 * white = 2
 * blue = 2
 *
 *
 * Then we overwrite nums in this order:
 *
 * first 2 positions  -> 0
 * next 2 positions   -> 1
 * final 2 positions  -> 2
 *
 *
 * Result:
 *
 * [0, 0, 1, 1, 2, 2]
 */


/**
 * ------------------------------------------------------------
 * PASS 1 - COUNT VALUES
 * ------------------------------------------------------------
 *
 * Loop through nums once.
 *
 * If the value is:
 *
 * 0 -> red++
 * 1 -> white++
 * 2 -> blue++
 *
 *
 * Example:
 *
 * nums = [2, 0, 2, 1, 1, 0]
 *
 * gives:
 *
 * red = 2
 * white = 2
 * blue = 2
 */


/**
 * ------------------------------------------------------------
 * PASS 2 - REWRITE THE ARRAY
 * ------------------------------------------------------------
 *
 * Loop through nums again.
 *
 * As long as red > 0:
 *
 * write 0
 *
 *
 * Once all red values have been written:
 *
 * write 1 while white > 0
 *
 *
 * Then:
 *
 * write 2 while blue > 0
 *
 *
 * Because we process the colours in this order:
 *
 * 0 -> 1 -> 2
 *
 * the final array is sorted.
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
 * We only store three counters.
 *
 * The amount of extra memory does not increase with nums.
 */

var sortColors = function(nums) {

    var red = 0;
    var white = 0;
    var blue = 0;


    // --------------------------------------------------------
    // PASS 1:
    // Count how many 0s, 1s and 2s exist.
    // --------------------------------------------------------

    for (var i = 0; i < nums.length; i++) {

        if (nums[i] === 0) {
            red++;
        }

        if (nums[i] === 1) {
            white++;
        }

        if (nums[i] === 2) {
            blue++;
        }
    }


    // --------------------------------------------------------
    // PASS 2:
    // Overwrite nums in sorted order.
    // --------------------------------------------------------

    for (var j = 0; j < nums.length; j++) {

        if (red > 0) {

            nums[j] = 0;

            red--;

        } else if (white > 0) {

            nums[j] = 1;

            white--;

        } else if (blue > 0) {

            nums[j] = 2;

            blue--;
        }
    }
};


/**
 * ------------------------------------------------------------
 * THINGS TO REMEMBER
 * ------------------------------------------------------------
 *
 * 1. nums only contains:
 *
 *    0
 *    1
 *    2
 *
 *
 * 2. When the set of possible values is very small and known
 *    in advance, counting can be a simple solution.
 *
 *
 * 3. First pass:
 *
 *    count each value.
 *
 *
 * 4. Second pass:
 *
 *    rebuild the array using those counts.
 *
 *
 * 5. Two separate loops are still:
 *
 *    O(n)
 *
 *    not O(n²).
 *
 *
 * 6. Space is:
 *
 *    O(1)
 *
 *    because only three counters are used.
 *
 *
 * 7. The array is modified in place.
 *
 *
 * ------------------------------------------------------------
 * PATTERN TO RECOGNISE
 * ------------------------------------------------------------
 *
 * This is a COUNTING / FIXED-VALUE-RANGE pattern.
 *
 * When:
 *
 * - the possible values are known
 * - there are only a small number of them
 *
 * it can be easier to count occurrences and rebuild the
 * result than to perform a general-purpose sort.
 *
 *
 * ------------------------------------------------------------
 * FURTHER OPTIMISATION
 * ------------------------------------------------------------
 *
 * There is also a one-pass solution called the:
 *
 * DUTCH NATIONAL FLAG ALGORITHM
 *
 * It uses three pointers to divide the array into:
 *
 * 0 region
 * unknown region
 * 2 region
 *
 * That solution also has:
 *
 * Time:  O(n)
 * Space: O(1)
 *
 * but performs the rearrangement in a single pass.
 *
 * The counting solution above is simpler and is a good version
 * to understand before learning the three-pointer approach.
 */