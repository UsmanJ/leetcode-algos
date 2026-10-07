/**
 * LeetCode 567 - Permutation in String
 *
 * Pattern:
 * Fixed-size sliding window
 *
 * Problem:
 * Return true if s2 contains any permutation of s1.
 *
 *
 * Example:
 *
 * s1 = "ab"
 * s2 = "eidbaooo"
 *
 * "ba" appears inside s2.
 *
 * "ba" is a permutation of "ab".
 *
 * Therefore:
 *
 * true
 */


/**
 * ------------------------------------------------------------
 * KEY IDEA
 * ------------------------------------------------------------
 *
 * A permutation contains exactly the same characters with
 * exactly the same frequencies.
 *
 *
 * Therefore:
 *
 * 1. Count characters in s1.
 * 2. Maintain a window in s2 of exactly s1.length.
 * 3. Count the characters in that window.
 * 4. Compare the two frequency maps.
 *
 *
 * When the window moves:
 *
 * incoming character -> count++
 *
 * outgoing character -> count--
 */


/**
 * ------------------------------------------------------------
 * WINDOW TYPE
 * ------------------------------------------------------------
 *
 * This is a FIXED-size sliding window.
 *
 * Window size:
 *
 * s1.length
 *
 *
 * Unlike Longest Substring or Character Replacement,
 * we are not trying to find the best window size.
 *
 * Every candidate window must have exactly the same
 * length as s1.
 */


/**
 * Time Complexity:
 *
 * O(n)
 *
 * Strictly, map comparison can inspect up to 26 characters.
 *
 * O(26 * n)
 *
 * simplifies to:
 *
 * O(n)
 *
 *
 * Space Complexity:
 *
 * O(1)
 *
 * because there are only 26 lowercase English letters.
 */

var checkInclusion = function(s1, s2) {

    // Impossible if s1 is longer than s2.
    if (s1.length > s2.length) {
        return false;
    }


    var left = 0;

    var windowSize = s1.length;


    var s1Map = new Map();

    var windowMap = new Map();


    // --------------------------------------------------------
    // Build frequency map for s1.
    // --------------------------------------------------------

    for (var i = 0; i < s1.length; i++) {

        if (s1Map.has(s1[i])) {

            s1Map.set(
                s1[i],
                s1Map.get(s1[i]) + 1
            );

        } else {

            s1Map.set(s1[i], 1);
        }
    }


    // --------------------------------------------------------
    // Slide through s2.
    // --------------------------------------------------------

    for (var right = 0; right < s2.length; right++) {

        // Add incoming character.
        if (windowMap.has(s2[right])) {

            windowMap.set(
                s2[right],
                windowMap.get(s2[right]) + 1
            );

        } else {

            windowMap.set(s2[right], 1);
        }


        // If window becomes too large,
        // remove the character on the left.
        if (right - left + 1 > windowSize) {

            windowMap.set(
                s2[left],
                windowMap.get(s2[left]) - 1
            );


            // Remove zero-count keys so map comparison
            // remains clean.
            if (windowMap.get(s2[left]) === 0) {

                windowMap.delete(s2[left]);
            }


            left++;
        }


        // ----------------------------------------------------
        // Compare maps when window has correct size.
        // ----------------------------------------------------

        if (right - left + 1 === windowSize) {

            var matches = true;


            // Different number of keys means the maps
            // cannot be equal.
            if (windowMap.size !== s1Map.size) {

                matches = false;
            }


            if (matches) {

                for (const [key, value] of s1Map) {

                    if (windowMap.get(key) !== value) {

                        matches = false;

                        break;
                    }
                }
            }


            if (matches) {

                return true;
            }
        }
    }


    return false;
};


/**
 * ------------------------------------------------------------
 * REMEMBER
 * ------------------------------------------------------------
 *
 * Fixed-size sliding window:
 *
 * add right character
 *
 * if window too large:
 *     remove left character
 *     left++
 *
 * when window size is correct:
 *     evaluate window
 *
 *
 * In this problem:
 *
 * evaluate =
 *
 * compare character frequencies
 */