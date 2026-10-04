/**
 * LeetCode 3 - Longest Substring Without Repeating Characters
 *
 * Problem:
 * Given a string s, return the length of the longest substring
 * that contains no repeating characters.
 *
 *
 * Example:
 *
 * Input:
 *
 * s = "abcabcbb"
 *
 * Longest substring without repeating characters:
 *
 * "abc"
 *
 * Length:
 *
 * 3
 *
 *
 * IMPORTANT:
 *
 * A substring must be CONTIGUOUS.
 */


/**
 * ------------------------------------------------------------
 * INITIAL THOUGHT
 * ------------------------------------------------------------
 *
 * We need to keep track of a section of the string that contains
 * only unique characters.
 *
 * This section is called a:
 *
 * SLIDING WINDOW
 *
 *
 * We use:
 *
 * left
 *
 * to represent the beginning of the window.
 *
 *
 * The for-loop variable i represents:
 *
 * the right side of the window.
 *
 *
 * Example:
 *
 * s = "abc"
 *
 * left = 0
 * i = 2
 *
 * Window:
 *
 * indexes 0 -> 2
 *
 * "abc"
 */


/**
 * ------------------------------------------------------------
 * WHY USE A SET?
 * ------------------------------------------------------------
 *
 * We need to know quickly:
 *
 * "Does this character already exist inside my current window?"
 *
 *
 * A Set is useful because:
 *
 * set.has(character)
 *
 * is O(1) on average.
 *
 *
 * The Set represents all characters currently inside
 * the sliding window.
 */


/**
 * ------------------------------------------------------------
 * THE WINDOW
 * ------------------------------------------------------------
 *
 * Suppose:
 *
 * s = "abcabcbb"
 *
 *
 * Start:
 *
 * left = 0
 *
 * Set = {}
 *
 *
 * ------------------------------------------------------------
 * i = 0
 * ------------------------------------------------------------
 *
 * current character:
 *
 * a
 *
 * Is a already in the Set?
 *
 * No.
 *
 * Add it.
 *
 * Set:
 *
 * { a }
 *
 * Window:
 *
 * "a"
 *
 * Length:
 *
 * 1
 */


/**
 * ------------------------------------------------------------
 * i = 1
 * ------------------------------------------------------------
 *
 * current character:
 *
 * b
 *
 * Is b already in the Set?
 *
 * No.
 *
 * Add it.
 *
 * Set:
 *
 * { a, b }
 *
 * Window:
 *
 * "ab"
 *
 * Length:
 *
 * 2
 */


/**
 * ------------------------------------------------------------
 * i = 2
 * ------------------------------------------------------------
 *
 * current character:
 *
 * c
 *
 * Add it.
 *
 * Set:
 *
 * { a, b, c }
 *
 * Window:
 *
 * "abc"
 *
 * Length:
 *
 * 3
 *
 * maxLength = 3
 */


/**
 * ------------------------------------------------------------
 * DUPLICATE FOUND
 * ------------------------------------------------------------
 *
 * Next character:
 *
 * a
 *
 *
 * But:
 *
 * Set already contains a.
 *
 *
 * Therefore our current window is no longer valid.
 *
 *
 * We need to SHRINK the window from the left until
 * the duplicate a is removed.
 *
 *
 * This is where the while loop is used.
 *
 *
 * while (set.has(s[i]))
 *
 *
 * Remove:
 *
 * s[left]
 *
 * and move:
 *
 * left++
 */


/**
 * ------------------------------------------------------------
 * WHY DELETE FROM THE LEFT?
 * ------------------------------------------------------------
 *
 * Suppose the current window is:
 *
 * "abc"
 *
 * and the next character is:
 *
 * a
 *
 *
 * We cannot simply ignore the new a.
 *
 * Instead, we move the beginning of the window forward:
 *
 * "abc"
 *  ^
 * left
 *
 *
 * Remove a:
 *
 * Set becomes:
 *
 * { b, c }
 *
 *
 * left becomes:
 *
 * 1
 *
 *
 * Now the new a is no longer duplicated.
 *
 * We can add it.
 *
 *
 * New window:
 *
 * "bca"
 */


/**
 * ------------------------------------------------------------
 * WHY A WHILE LOOP AND NOT AN IF?
 * ------------------------------------------------------------
 *
 * Sometimes we may need to remove more than one character
 * before the duplicate disappears.
 *
 *
 * Example:
 *
 * s = "abba"
 *
 *
 * If the new character already exists somewhere in the window,
 * keep removing from the left UNTIL that duplicate is gone.
 *
 *
 * Therefore:
 *
 * while (set.has(s[i]))
 *
 * is more appropriate than:
 *
 * if (set.has(s[i]))
 */


/**
 * ------------------------------------------------------------
 * CALCULATING WINDOW LENGTH
 * ------------------------------------------------------------
 *
 * The window starts at:
 *
 * left
 *
 * and ends at:
 *
 * i
 *
 *
 * Therefore:
 *
 * currentLength = i - left + 1
 *
 *
 * Why +1?
 *
 * If:
 *
 * left = 0
 * i = 2
 *
 * indexes included are:
 *
 * 0
 * 1
 * 2
 *
 * which is 3 values.
 *
 *
 * 2 - 0 + 1
 *
 * =
 *
 * 3
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
 *
 * At first this may look like O(n²) because there is a while
 * loop inside a for loop.
 *
 * However, every character is:
 *
 * - added to the Set at most once
 * - removed from the Set at most once
 *
 *
 * The left pointer never moves backwards.
 *
 * The right pointer never moves backwards.
 *
 *
 * Therefore the total work across the whole algorithm is O(n).
 *
 *
 * Space Complexity:
 *
 * O(n)
 *
 * In the worst case, the Set may contain every character
 * in the string.
 */

var lengthOfLongestSubstring = function(s) {

    var left = 0;

    var set = new Set();

    var maxLength = 0;


    // i acts as the right side of the sliding window.
    for (var i = 0; i < s.length; i++) {


        // If the current character already exists in the
        // window, shrink the window from the left until
        // the duplicate has been removed.
        while (set.has(s[i])) {

            set.delete(s[left]);

            left++;
        }


        // The current character can now safely be added
        // to the window.
        set.add(s[i]);


        // Calculate the current valid window length.
        var currentLength = i - left + 1;


        // Keep the largest valid window seen so far.
        maxLength = Math.max(maxLength, currentLength);
    }


    return maxLength;
};


/**
 * ------------------------------------------------------------
 * THINGS TO REMEMBER
 * ------------------------------------------------------------
 *
 * 1. A substring must be contiguous.
 *
 *
 * 2. Use a Set to represent the characters currently
 *    inside the window.
 *
 *
 * 3. Two pointers define the window:
 *
 *    left = start
 *    i    = end
 *
 *
 * 4. Expand the window by moving i forward.
 *
 *
 * 5. If s[i] already exists:
 *
 *    shrink the window from the left.
 *
 *
 * 6. Keep shrinking while:
 *
 *    set.has(s[i])
 *
 *
 * 7. Remove:
 *
 *    s[left]
 *
 *    then:
 *
 *    left++
 *
 *
 * 8. Once the duplicate is gone:
 *
 *    add s[i]
 *
 *
 * 9. Window length:
 *
 *    i - left + 1
 *
 *
 * 10. Keep:
 *
 *     maxLength
 *
 *     as the largest valid window seen so far.
 *
 *
 * 11. Final complexity:
 *
 *     Time:  O(n)
 *     Space: O(n)
 *
 *
 * ------------------------------------------------------------
 * PATTERN TO RECOGNISE
 * ------------------------------------------------------------
 *
 * This is a:
 *
 * SLIDING WINDOW
 *
 * pattern.
 *
 *
 * Sliding window is useful when dealing with:
 *
 * - contiguous substrings
 * - contiguous subarrays
 * - longest / shortest valid section
 * - constraints that become invalid as the window grows
 *
 *
 * The typical pattern is:
 *
 * expand right
 *
 * while window is invalid:
 *     shrink left
 *
 * update best answer
 *
 *
 * ------------------------------------------------------------
 * MENTAL MODEL
 * ------------------------------------------------------------
 *
 * Think:
 *
 * "Grow the window until it becomes invalid.
 *
 * Then shrink it from the left until it becomes valid again."
 *
 *
 * In this problem:
 *
 * Valid window:
 *
 * no duplicate characters.
 *
 *
 * Invalid window:
 *
 * current character already exists in the Set.
 */