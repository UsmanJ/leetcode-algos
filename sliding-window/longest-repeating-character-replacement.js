/**
 * LeetCode 424 - Longest Repeating Character Replacement
 *
 * Pattern:
 * Variable-size sliding window
 *
 * Problem:
 * You may replace at most k characters.
 * Return the length of the longest substring that can be
 * turned into all the same character.
 *
 *
 * Example:
 *
 * s = "AABABBA"
 * k = 1
 *
 * Output:
 * 4
 *
 * One possible valid window is:
 *
 * "AABA"
 *
 * Replace B with A:
 *
 * "AAAA"
 */


/**
 * ------------------------------------------------------------
 * KEY IDEA
 * ------------------------------------------------------------
 *
 * For any window:
 *
 * replacements needed
 *
 * =
 *
 * window length - most frequent character count
 *
 *
 * Example:
 *
 * window = "AABA"
 *
 * length = 4
 *
 * frequencies:
 *
 * A -> 3
 * B -> 1
 *
 * maxFrequency = 3
 *
 * replacements needed:
 *
 * 4 - 3 = 1
 *
 *
 * If:
 *
 * replacements needed <= k
 *
 * the window is valid.
 *
 *
 * If:
 *
 * replacements needed > k
 *
 * shrink the window from the left.
 */


/**
 * ------------------------------------------------------------
 * SLIDING WINDOW
 * ------------------------------------------------------------
 *
 * right:
 * expands the window
 *
 * left:
 * shrinks the window when too many replacements are needed
 *
 * Map:
 * stores character frequencies inside the window
 *
 * maxFrequency:
 * highest character frequency seen in the window
 */


/**
 * Time Complexity:
 *
 * O(n)
 *
 * right moves through the string once.
 * left only moves forwards.
 *
 *
 * Space Complexity:
 *
 * O(1)
 *
 * There are only 26 uppercase English letters.
 */

var characterReplacement = function(s, k) {

    var left = 0;

    var map = new Map();

    var maxLength = 0;

    var maxFrequency = 0;


    for (var right = 0; right < s.length; right++) {

        // Add the incoming character to the window.
        if (!map.has(s[right])) {
            map.set(s[right], 0);
        }

        map.set(
            s[right],
            map.get(s[right]) + 1
        );


        // Keep track of the most frequent character.
        maxFrequency = Math.max(
            maxFrequency,
            map.get(s[right])
        );


        // Current window is invalid if making every character
        // the same would require more than k replacements.
        while (
            right - left + 1 - maxFrequency > k
        ) {

            // Remove the character leaving the window.
            map.set(
                s[left],
                map.get(s[left]) - 1
            );

            left++;
        }


        // Window is valid here.
        maxLength = Math.max(
            maxLength,
            right - left + 1
        );
    }


    return maxLength;
};


/**
 * ------------------------------------------------------------
 * REMEMBER
 * ------------------------------------------------------------
 *
 * Variable sliding window:
 *
 * expand right
 *
 * while invalid:
 *     remove left character
 *     left++
 *
 * update answer
 *
 *
 * Invalid condition:
 *
 * windowLength - maxFrequency > k
 */