/**
 * LeetCode 49 - Group Anagrams
 *
 * Problem:
 * Given an array of strings, group the anagrams together.
 *
 * Example:
 *
 * Input:
 * ["eat", "tea", "tan", "ate", "nat", "bat"]
 *
 * Output:
 * [
 *   ["eat", "tea", "ate"],
 *   ["tan", "nat"],
 *   ["bat"]
 * ]
 *
 * ------------------------------------------------------------
 * KEY IDEA
 * ------------------------------------------------------------
 *
 * Anagrams contain exactly the same characters with exactly
 * the same frequencies.
 *
 * Therefore, we need to create a "signature" for each word.
 *
 * Words with the same signature belong in the same group.
 *
 * We can store:
 *
 * Map {
 *   signature => [original words]
 * }
 *
 * There are two approaches below:
 *
 * 1. Sort each word and use the sorted word as the signature.
 * 2. Count each character and use the frequency counts as
 *    the signature.
 */


/**
 * ------------------------------------------------------------
 * APPROACH 1 - SORT EACH STRING
 * ------------------------------------------------------------
 *
 * Example:
 *
 * "eat" -> "aet"
 * "tea" -> "aet"
 * "ate" -> "aet"
 *
 * They all produce the same key, so they go into the same
 * array in the Map.
 *
 * Map eventually looks roughly like:
 *
 * "aet" => ["eat", "tea", "ate"]
 * "ant" => ["tan", "nat"]
 * "abt" => ["bat"]
 *
 * Time Complexity:
 *
 * Let:
 * n = number of strings
 * k = maximum length of a string
 *
 * Sorting one string:
 * O(k log k)
 *
 * We do this for n strings:
 * O(n * k log k)
 *
 * Space Complexity:
 * O(n * k)
 */

var groupAnagramsSorting = function(strs) {
    var aMap = new Map();

    for (var i = 0; i < strs.length; i++) {

        // Convert the word into a sorted signature.
        //
        // Example:
        // "tea"
        // -> ["t", "e", "a"]
        // -> ["a", "e", "t"]
        // -> "aet"
        var sortedString = strs[i]
            .split('')
            .sort()
            .join('');

        // If this signature has not been seen before,
        // create a new group.
        if (!aMap.has(sortedString)) {
            aMap.set(sortedString, []);
        }

        // Add the original word to its group.
        aMap.get(sortedString).push(strs[i]);
    }

    // We no longer need the Map keys.
    // We only want the arrays containing the grouped words.
    return Array.from(aMap.values());
};


/**
 * ------------------------------------------------------------
 * APPROACH 2 - CHARACTER FREQUENCY ARRAY
 * ------------------------------------------------------------
 *
 * Instead of sorting every word, count how many times each
 * lowercase letter appears.
 *
 * There are 26 lowercase English letters, so we create:
 *
 * [0, 0, 0, 0, ..., 0]
 *
 * Index:
 *
 * 0 = a
 * 1 = b
 * 2 = c
 * ...
 * 25 = z
 *
 *
 * Example:
 *
 * "abb"
 *
 * becomes:
 *
 * [1, 2, 0, 0, 0, ...]
 *
 *
 * "eat", "tea" and "ate" will all produce exactly the same
 * frequency array.
 *
 *
 * ------------------------------------------------------------
 * WHY charCodeAt() - 97?
 * ------------------------------------------------------------
 *
 * JavaScript character codes:
 *
 * 'a'.charCodeAt(0) = 97
 * 'b'.charCodeAt(0) = 98
 * 'c'.charCodeAt(0) = 99
 *
 * We want:
 *
 * a -> index 0
 * b -> index 1
 * c -> index 2
 *
 * Therefore:
 *
 * 'a' -> 97 - 97 = 0
 * 'b' -> 98 - 97 = 1
 * 'c' -> 99 - 97 = 2
 *
 * So:
 *
 * count[character.charCodeAt(0) - 97]++;
 *
 *
 * ------------------------------------------------------------
 * WHY DON'T WE USE THE ARRAY DIRECTLY AS THE MAP KEY?
 * ------------------------------------------------------------
 *
 * In JavaScript, arrays are objects.
 *
 * Two arrays containing identical values are still two
 * different objects.
 *
 * Example:
 *
 * [1, 2, 0] === [1, 2, 0]
 *
 * is false.
 *
 * Therefore this would NOT work correctly:
 *
 * map.set(count, ...)
 *
 * because every newly-created count array would be considered
 * a different key.
 *
 * Instead, convert it to a string:
 *
 * count.join(',')
 *
 * Example:
 *
 * [1, 2, 0, 0]
 *
 * becomes:
 *
 * "1,2,0,0"
 *
 * Identical frequency arrays now produce identical Map keys.
 *
 *
 * ------------------------------------------------------------
 * WHY USE A COMMA?
 * ------------------------------------------------------------
 *
 * We shouldn't use:
 *
 * count.join('')
 *
 * because counts could become ambiguous.
 *
 * For example:
 *
 * [1, 11]
 *
 * and:
 *
 * [11, 1]
 *
 * could both create confusing concatenated strings.
 *
 * Using commas preserves the boundaries:
 *
 * "1,11"
 * "11,1"
 *
 *
 * ------------------------------------------------------------
 * COMPLEXITY
 * ------------------------------------------------------------
 *
 * Let:
 *
 * n = number of strings
 * k = maximum length of each string
 *
 * For every word, we inspect every character once.
 *
 * Time Complexity:
 *
 * O(n * k)
 *
 * This improves on the sorting solution:
 *
 * O(n * k log k)
 *
 *
 * Space Complexity:
 *
 * O(n * k)
 *
 * The 26-element count array itself is constant space because
 * its size never changes.
 */

var groupAnagrams = function(strs) {

    var aMap = new Map();

    for (var i = 0; i < strs.length; i++) {

        // Create a fresh frequency array for each word.
        var count = new Array(26).fill(0);

        // Count each character in the current word.
        for (var j = 0; j < strs[i].length; j++) {

            var index = strs[i][j].charCodeAt(0) - 97;

            count[index]++;
        }

        // Convert the frequency array into a string so it can
        // safely be used as a Map key.
        var key = count.join(',');

        // Create the group if it doesn't exist yet.
        if (!aMap.has(key)) {
            aMap.set(key, []);
        }

        // Add the original word to its anagram group.
        aMap.get(key).push(strs[i]);
    }

    // Return only the grouped arrays.
    return Array.from(aMap.values());
};


/**
 * ------------------------------------------------------------
 * THINGS TO REMEMBER
 * ------------------------------------------------------------
 *
 * 1. Anagrams need the same letters AND the same frequencies.
 *
 *    "ab" and "abb" are not anagrams.
 *
 *
 * 2. A useful pattern for grouping problems is:
 *
 *    value -> create signature -> Map signature to group
 *
 *
 * 3. Map pattern:
 *
 *    if (!map.has(key)) {
 *        map.set(key, []);
 *    }
 *
 *    map.get(key).push(value);
 *
 *
 * 4. Array.from(map.values())
 *
 *    converts the Map's values iterator into a normal array.
 *
 *
 * 5. Sorting gives a simple solution:
 *
 *    O(n * k log k)
 *
 *
 * 6. Counting characters avoids sorting:
 *
 *    O(n * k)
 *
 *
 * 7. Fixed-size frequency arrays are useful when the possible
 *    values are known in advance — here there are only
 *    26 lowercase letters.
 */