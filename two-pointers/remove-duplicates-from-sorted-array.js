/**
 * LeetCode 26 - Remove Duplicates from Sorted Array
 *
 * Problem:
 * Given a sorted integer array nums, remove the duplicates
 * in-place so that each unique element appears only once.
 *
 * Return the number of unique elements.
 *
 *
 * Example:
 *
 * Input:
 *
 * nums = [1, 1, 2]
 *
 * After modification:
 *
 * nums = [1, 2, ...]
 *
 * Return:
 *
 * 2
 *
 *
 * Only the first k elements matter, where k is the number
 * of unique values.
 */


/**
 * ------------------------------------------------------------
 * KEY OBSERVATION
 * ------------------------------------------------------------
 *
 * The array is already SORTED.
 *
 * That means duplicate values will always appear next
 * to each other.
 *
 *
 * Example:
 *
 * [1, 1, 2, 2, 3, 3]
 *
 *
 * So we do not need a Set or Map.
 *
 * We can use two pointers:
 *
 * i = position of the last unique value we kept
 *
 * j = scanning pointer looking for the next new value
 */


/**
 * ------------------------------------------------------------
 * POINTER SETUP
 * ------------------------------------------------------------
 *
 * Example:
 *
 * nums = [1, 1, 2, 2, 3]
 *
 *
 * Start:
 *
 * i = 0
 * j = 1
 *
 *
 * i points at:
 *
 * nums[0] = 1
 *
 *
 * j scans forward looking for a value different from nums[i].
 *
 *
 * The first value is automatically unique, so:
 *
 * uniqueValues = 1
 */


/**
 * ------------------------------------------------------------
 * WALKTHROUGH
 * ------------------------------------------------------------
 *
 * nums = [1, 1, 2, 2, 3]
 *
 *
 * Start:
 *
 * i = 0
 * j = 1
 * uniqueValues = 1
 *
 *
 * ------------------------------------------------------------
 * j = 1
 * ------------------------------------------------------------
 *
 * nums[i] = 1
 * nums[j] = 1
 *
 * Same value.
 *
 * Duplicate.
 *
 * Move j forward.
 *
 *
 * ------------------------------------------------------------
 * j = 2
 * ------------------------------------------------------------
 *
 * nums[i] = 1
 * nums[j] = 2
 *
 * Different.
 *
 * We found the next unique value.
 *
 *
 * Move i forward:
 *
 * i = 1
 *
 *
 * Write:
 *
 * nums[1] = 2
 *
 *
 * Array becomes:
 *
 * [1, 2, 2, 2, 3]
 *
 *
 * uniqueValues = 2
 */


/**
 * ------------------------------------------------------------
 * NEXT UNIQUE VALUE
 * ------------------------------------------------------------
 *
 * j continues scanning.
 *
 * When it reaches 3:
 *
 * nums[i] = 2
 * nums[j] = 3
 *
 *
 * Different.
 *
 * Move i forward and write:
 *
 * nums[i + 1] = nums[j]
 *
 *
 * Final important portion:
 *
 * [1, 2, 3]
 *
 *
 * uniqueValues = 3
 */


/**
 * ------------------------------------------------------------
 * WRITE POINTER IDEA
 * ------------------------------------------------------------
 *
 * i represents:
 *
 * "the end of the unique section"
 *
 *
 * j represents:
 *
 * "the value currently being inspected"
 *
 *
 * If:
 *
 * nums[i] === nums[j]
 *
 * then j found a duplicate.
 *
 * Just keep scanning.
 *
 *
 * If:
 *
 * nums[i] !== nums[j]
 *
 * then j found a new unique value.
 *
 *
 * Write that value immediately after the current
 * unique section.
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
 * j scans through the array once.
 *
 *
 * Space Complexity:
 *
 * O(1)
 *
 * We modify nums directly and only use a few variables.
 */

var removeDuplicates = function(nums) {

    // Handle an empty array safely.
    if (nums.length === 0) {
        return 0;
    }

    // First value is automatically unique.
    var uniqueValues = 1;

    // i points to the last unique value kept.
    var i = 0;

    // j scans for the next unique value.
    var j = 1;


    while (j < nums.length) {

        if (nums[i] === nums[j]) {

            // Duplicate.
            // Keep scanning.
            j++;

        } else {

            // New unique value found.
            //
            // Write it immediately after the current
            // unique section.
            nums[i + 1] = nums[j];

            // Move the unique/write pointer forward.
            i++;

            // Increase the number of unique values.
            uniqueValues++;

            // Continue scanning.
            j++;
        }
    }


    return uniqueValues;
};


/**
 * ------------------------------------------------------------
 * SIMPLER VERSION
 * ------------------------------------------------------------
 *
 * Because i + 1 is always the next write position, you can
 * also write this with a for loop.
 *
 * This version returns:
 *
 * i + 1
 *
 * because i is the index of the final unique element.
 */

var removeDuplicatesAlternative = function(nums) {

    if (nums.length === 0) {
        return 0;
    }

    var i = 0;

    for (var j = 1; j < nums.length; j++) {

        if (nums[j] !== nums[i]) {

            i++;

            nums[i] = nums[j];
        }
    }

    return i + 1;
};


/**
 * ------------------------------------------------------------
 * THINGS TO REMEMBER
 * ------------------------------------------------------------
 *
 * 1. The array is already sorted.
 *
 *
 * 2. Because it is sorted, duplicates are adjacent.
 *
 *
 * 3. That means we do NOT need:
 *
 *    Set
 *    Map
 *    sorting
 *
 *
 * 4. Use two pointers:
 *
 *    i = last unique value
 *    j = scanning pointer
 *
 *
 * 5. If:
 *
 *    nums[i] === nums[j]
 *
 *    then j found a duplicate.
 *
 *
 * 6. If:
 *
 *    nums[i] !== nums[j]
 *
 *    then j found a new unique value.
 *
 *
 * 7. Write the new unique value at:
 *
 *    nums[i + 1]
 *
 *
 * 8. Move i forward.
 *
 *
 * 9. The first value is automatically unique, so:
 *
 *    uniqueValues starts at 1
 *
 *
 * 10. Final complexity:
 *
 *     Time:  O(n)
 *     Space: O(1)
 *
 *
 * ------------------------------------------------------------
 * PATTERN TO RECOGNISE
 * ------------------------------------------------------------
 *
 * This is a:
 *
 * READ POINTER + WRITE POINTER
 *
 * pattern.
 *
 *
 * One pointer scans through the input.
 *
 * The other pointer tracks where the next valid value
 * should be written.
 *
 *
 * This pattern is useful for:
 *
 * - removing duplicates
 * - filtering values in-place
 * - moving zeroes
 * - compacting arrays
 *
 *
 * ------------------------------------------------------------
 * MENTAL MODEL
 * ------------------------------------------------------------
 *
 * Think:
 *
 * "j searches for the next value worth keeping.
 *
 * i marks the end of the values I've already kept."
 */