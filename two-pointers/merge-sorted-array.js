/**
 * LeetCode 88 - Merge Sorted Array
 *
 * Problem:
 * You are given two sorted integer arrays:
 *
 * nums1
 * nums2
 *
 * nums1 has enough extra space at the end to contain
 * all elements from nums2.
 *
 * m = number of real values currently in nums1
 * n = number of values in nums2
 *
 * Merge nums2 into nums1 so that nums1 becomes one
 * sorted array.
 *
 *
 * Example:
 *
 * nums1 = [1, 2, 3, 0, 0, 0]
 * m = 3
 *
 * nums2 = [2, 5, 6]
 * n = 3
 *
 * Result:
 *
 * nums1 = [1, 2, 2, 3, 5, 6]
 *
 *
 * IMPORTANT:
 *
 * The zeroes at the end of nums1 are placeholder space.
 *
 * However, we should NOT identify placeholders by checking
 * whether a value is 0.
 *
 * This is because 0 could be a legitimate value.
 *
 * Instead, m tells us exactly how many real values nums1
 * currently contains.
 */


/**
 * ------------------------------------------------------------
 * INITIAL IDEA - MERGE FROM THE FRONT
 * ------------------------------------------------------------
 *
 * Because both arrays are sorted, one idea would be:
 *
 * - compare the smallest remaining value in nums1
 * - compare the smallest remaining value in nums2
 * - take whichever is smaller
 *
 *
 * The problem with doing this directly inside nums1 is that
 * nums1's real values are already at the front.
 *
 * If we overwrite nums1 from the beginning, we could destroy
 * values that we still need later.
 *
 *
 * Example:
 *
 * nums1 = [1, 2, 3, 0, 0, 0]
 *
 * If we start inserting values at index 0, we would need to
 * keep shifting existing values to make room.
 *
 * That makes the solution unnecessarily complicated.
 */


/**
 * ------------------------------------------------------------
 * KEY OBSERVATION - MERGE FROM THE BACK
 * ------------------------------------------------------------
 *
 * nums1 already has empty space at the END.
 *
 * Therefore, instead of comparing the smallest values,
 * compare the LARGEST remaining values.
 *
 *
 * We use three pointers:
 *
 * i = last real value in nums1
 * j = last value in nums2
 * k = last available position in nums1
 *
 *
 * i = m - 1
 * j = n - 1
 * k = m + n - 1
 */


/**
 * Example:
 *
 * nums1 = [1, 2, 3, 0, 0, 0]
 * nums2 = [2, 5, 6]
 *
 *
 * i points to:
 *
 * nums1[2] = 3
 *
 *
 * j points to:
 *
 * nums2[2] = 6
 *
 *
 * k points to:
 *
 * nums1[5]
 *
 *
 * Compare:
 *
 * 3 vs 6
 *
 * 6 is larger.
 *
 * Therefore:
 *
 * nums1[5] = 6
 *
 *
 * Then move:
 *
 * j--
 * k--
 */


/**
 * ------------------------------------------------------------
 * WALKTHROUGH
 * ------------------------------------------------------------
 *
 * Start:
 *
 * nums1 = [1, 2, 3, 0, 0, 0]
 * nums2 = [2, 5, 6]
 *
 * i = 2
 * j = 2
 * k = 5
 *
 *
 * ------------------------------------------------------------
 * STEP 1
 * ------------------------------------------------------------
 *
 * nums1[i] = 3
 * nums2[j] = 6
 *
 * 6 is larger.
 *
 * nums1[k] = 6
 *
 * nums1:
 *
 * [1, 2, 3, 0, 0, 6]
 *
 * j = 1
 * k = 4
 *
 *
 * ------------------------------------------------------------
 * STEP 2
 * ------------------------------------------------------------
 *
 * nums1[i] = 3
 * nums2[j] = 5
 *
 * 5 is larger.
 *
 * nums1[4] = 5
 *
 * nums1:
 *
 * [1, 2, 3, 0, 5, 6]
 *
 * j = 0
 * k = 3
 *
 *
 * ------------------------------------------------------------
 * STEP 3
 * ------------------------------------------------------------
 *
 * nums1[i] = 3
 * nums2[j] = 2
 *
 * 3 is larger.
 *
 * nums1[3] = 3
 *
 * nums1:
 *
 * [1, 2, 3, 3, 5, 6]
 *
 * i = 1
 * k = 2
 *
 *
 * ------------------------------------------------------------
 * STEP 4
 * ------------------------------------------------------------
 *
 * nums1[i] = 2
 * nums2[j] = 2
 *
 * Either 2 can go next.
 *
 * Our implementation takes nums2[j].
 *
 * nums1[2] = 2
 *
 * nums1:
 *
 * [1, 2, 2, 3, 5, 6]
 *
 * j = -1
 *
 *
 * nums2 is now fully merged.
 *
 * Stop.
 */


/**
 * ------------------------------------------------------------
 * WHY DOES THE LOOP ONLY CHECK j?
 * ------------------------------------------------------------
 *
 * We use:
 *
 * while (j >= 0)
 *
 *
 * This means:
 *
 * "Keep going while nums2 still has values left."
 *
 *
 * If nums2 runs out first, we are done.
 *
 * Why?
 *
 * Because any values still remaining in nums1 are already
 * in the correct positions.
 *
 *
 * Example:
 *
 * nums1 = [1, 2, 7, 0, 0]
 * nums2 = [3, 4]
 *
 * Once 3 and 4 have been merged into the correct positions,
 * the remaining 1 and 2 do not need to move.
 */


/**
 * ------------------------------------------------------------
 * WHAT IF nums1 RUNS OUT FIRST?
 * ------------------------------------------------------------
 *
 * Example:
 *
 * nums1 = [4, 5, 6, 0, 0, 0]
 * nums2 = [1, 2, 3]
 *
 *
 * Eventually:
 *
 * i = -1
 *
 * but nums2 still contains values.
 *
 *
 * When:
 *
 * i < 0
 *
 * there are no real nums1 values left.
 *
 * Therefore, every remaining value must come from nums2.
 *
 *
 * This is why our condition is:
 *
 * if (i < 0 || nums1[i] <= nums2[j])
 *
 *
 * If nums1 has run out:
 *
 * take nums2[j]
 *
 * OR
 *
 * if nums2[j] is greater than or equal to nums1[i]:
 *
 * take nums2[j]
 *
 *
 * Otherwise:
 *
 * take nums1[i]
 */


/**
 * ------------------------------------------------------------
 * SOLUTION
 * ------------------------------------------------------------
 *
 * Time Complexity:
 *
 * O(m + n)
 *
 * Each value from nums1 and nums2 is processed at most once.
 *
 *
 * Space Complexity:
 *
 * O(1)
 *
 * We modify nums1 directly and only store three pointer
 * variables.
 */

var merge = function(nums1, m, nums2, n) {

    // Last real value in nums1.
    var i = m - 1;

    // Last value in nums2.
    var j = n - 1;

    // Last position available in nums1.
    var k = m + n - 1;


    // We only need to continue while nums2 still contains
    // unmerged values.
    while (j >= 0) {

        /*
         * Take from nums2 if:
         *
         * 1. nums1 has run out of real values
         *
         * OR
         *
         * 2. nums2[j] is greater than or equal to nums1[i].
         */
        if (i < 0 || nums1[i] <= nums2[j]) {

            nums1[k] = nums2[j];

            j--;
            k--;

        } else {

            // nums1[i] is larger, so move it into the current
            // final position.
            nums1[k] = nums1[i];

            i--;
            k--;
        }
    }
};


/**
 * ------------------------------------------------------------
 * THINGS TO REMEMBER
 * ------------------------------------------------------------
 *
 * 1. Both arrays are already sorted.
 *
 *
 * 2. Do NOT use the value 0 to identify placeholder positions.
 *
 *    Zero can be a valid number.
 *
 *
 * 3. m tells us how many real values nums1 contains.
 *
 *
 * 4. n tells us how many real values nums2 contains.
 *
 *
 * 5. nums1 already has enough empty space at the end.
 *
 *
 * 6. Therefore, merge from RIGHT to LEFT.
 *
 *
 * 7. Use three pointers:
 *
 *    i = m - 1
 *
 *    j = n - 1
 *
 *    k = m + n - 1
 *
 *
 * 8. Compare:
 *
 *    nums1[i]
 *
 *    and
 *
 *    nums2[j]
 *
 *
 * 9. Put the larger value into:
 *
 *    nums1[k]
 *
 *
 * 10. Move the relevant pointer backwards.
 *
 *
 * 11. Continue while:
 *
 *     j >= 0
 *
 *
 * 12. If nums1 runs out first:
 *
 *     i < 0
 *
 *     so take the remaining values from nums2.
 *
 *
 * 13. Final complexity:
 *
 *     Time:  O(m + n)
 *     Space: O(1)
 *
 *
 * ------------------------------------------------------------
 * PATTERN TO RECOGNISE
 * ------------------------------------------------------------
 *
 * This is a THREE-POINTER / MERGE pattern.
 *
 * When you have two sorted collections, think about whether
 * you can use one pointer for each collection.
 *
 *
 * The extra trick in this problem is:
 *
 * MERGE BACKWARDS
 *
 *
 * Because the spare space is at the end of nums1, filling
 * from the back avoids overwriting values that have not yet
 * been processed.
 */