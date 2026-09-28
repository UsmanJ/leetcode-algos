/**
 * LeetCode 560 - Subarray Sum Equals K
 *
 * Problem:
 * Given an integer array nums and an integer k,
 * return the total number of contiguous subarrays whose sum equals k.
 *
 *
 * Example:
 *
 * nums = [1, 1, 1]
 * k = 2
 *
 * Valid subarrays:
 *
 * indexes 0 -> 1
 * [1, 1]
 *
 * indexes 1 -> 2
 * [1, 1]
 *
 * Output:
 *
 * 2
 *
 *
 * IMPORTANT:
 *
 * A subarray must be CONTIGUOUS.
 *
 * You cannot skip elements.
 */


/**
 * ------------------------------------------------------------
 * APPROACH 1 - BRUTE FORCE
 * ------------------------------------------------------------
 *
 * A straightforward solution is:
 *
 * 1. Choose every possible starting index.
 * 2. Keep extending the subarray to the right.
 * 3. Maintain a running sum.
 * 4. Every time the running sum equals k, increment the count.
 *
 *
 * Example:
 *
 * nums = [1, 2, 1]
 * k = 3
 *
 *
 * Start at index 0:
 *
 * [1]       -> sum = 1
 * [1, 2]    -> sum = 3 -> valid
 * [1, 2, 1] -> sum = 4
 *
 *
 * Start at index 1:
 *
 * [2]       -> sum = 2
 * [2, 1]    -> sum = 3 -> valid
 *
 *
 * Start at index 2:
 *
 * [1]       -> sum = 1
 *
 *
 * Total:
 *
 * 2
 */


/**
 * ------------------------------------------------------------
 * IMPORTANT DETAIL
 * ------------------------------------------------------------
 *
 * We cannot stop when the running sum becomes greater than k.
 *
 * nums can contain negative numbers.
 *
 *
 * Example:
 *
 * nums = [5, -2]
 * k = 3
 *
 * Running sum:
 *
 * 5
 *
 * which is greater than 3,
 *
 * but then:
 *
 * 5 + (-2) = 3
 *
 * so we must keep going.
 */


/**
 * Time Complexity:
 *
 * O(n²)
 *
 * We have a nested loop.
 *
 *
 * Space Complexity:
 *
 * O(1)
 *
 * We only store a few variables.
 */

var subarraySumBruteForce = function(nums, k) {

    var subarrays = 0;

    for (var i = 0; i < nums.length; i++) {

        var sum = 0;

        for (var j = i; j < nums.length; j++) {

            sum += nums[j];

            if (sum === k) {
                subarrays++;
            }
        }
    }

    return subarrays;
};


/**
 * ------------------------------------------------------------
 * APPROACH 2 - PREFIX SUM + MAP
 * ------------------------------------------------------------
 *
 * We can improve the solution to O(n) by using prefix sums.
 *
 *
 * A prefix sum means:
 *
 * "the sum of everything seen so far"
 *
 *
 * Example:
 *
 * nums = [1, 2, 3]
 *
 * Prefix sums:
 *
 * after 1       -> 1
 * after 1 + 2   -> 3
 * after 1 + 2 + 3 -> 6
 */


/**
 * ------------------------------------------------------------
 * KEY IDEA
 * ------------------------------------------------------------
 *
 * Suppose:
 *
 * currentPrefix - previousPrefix = k
 *
 *
 * Then:
 *
 * previousPrefix = currentPrefix - k
 *
 *
 * Therefore, at every index we can ask:
 *
 * "Have I previously seen a prefix sum equal to:
 *
 * currentPrefix - k
 *
 * ?"
 *
 *
 * If yes, then the values between that previous prefix
 * and the current position form a subarray whose sum is k.
 */


/**
 * ------------------------------------------------------------
 * EXAMPLE
 * ------------------------------------------------------------
 *
 * nums = [1, 2, 3]
 * k = 3
 *
 *
 * Start:
 *
 * prefixSum = 0
 *
 * Map:
 *
 * 0 -> 1
 *
 *
 * ------------------------------------------------------------
 * i = 0
 * ------------------------------------------------------------
 *
 * nums[i] = 1
 *
 * prefixSum = 1
 *
 * neededPrefix:
 *
 * 1 - 3 = -2
 *
 * Has -2 been seen?
 *
 * No.
 *
 * Record:
 *
 * 1 -> 1
 *
 *
 * Map:
 *
 * 0 -> 1
 * 1 -> 1
 *
 *
 * ------------------------------------------------------------
 * i = 1
 * ------------------------------------------------------------
 *
 * nums[i] = 2
 *
 * prefixSum = 3
 *
 * neededPrefix:
 *
 * 3 - 3 = 0
 *
 * Has 0 been seen?
 *
 * Yes.
 *
 * Map says:
 *
 * 0 -> 1
 *
 * Therefore there is 1 valid subarray ending here.
 *
 * That subarray is:
 *
 * [1, 2]
 *
 *
 * Record current prefix:
 *
 * 3 -> 1
 *
 *
 * ------------------------------------------------------------
 * i = 2
 * ------------------------------------------------------------
 *
 * nums[i] = 3
 *
 * prefixSum = 6
 *
 * neededPrefix:
 *
 * 6 - 3 = 3
 *
 * Has prefix 3 been seen?
 *
 * Yes.
 *
 * That represents:
 *
 * [3]
 *
 *
 * Total valid subarrays:
 *
 * 2
 */


/**
 * ------------------------------------------------------------
 * WHY DOES THE MAP STORE COUNTS?
 * ------------------------------------------------------------
 *
 * The same prefix sum can appear multiple times.
 *
 * This can happen because nums may contain:
 *
 * - zeroes
 * - negative numbers
 *
 *
 * Therefore the Map stores:
 *
 * prefixSum -> number of times it has occurred
 *
 *
 * If neededPrefix has appeared 3 times,
 * then there are 3 valid subarrays ending at the
 * current position.
 */


/**
 * ------------------------------------------------------------
 * WHY START WITH:
 *
 * Map([[0, 1]])
 * ------------------------------------------------------------
 *
 * Before processing the array, we behave as though a prefix
 * sum of 0 has already been seen once.
 *
 *
 * This allows us to count subarrays that begin at index 0.
 *
 *
 * Example:
 *
 * nums = [3]
 * k = 3
 *
 *
 * prefixSum = 3
 *
 * neededPrefix:
 *
 * 3 - 3 = 0
 *
 * Since the Map contains:
 *
 * 0 -> 1
 *
 * we correctly count:
 *
 * [3]
 *
 * as a valid subarray.
 */


/**
 * ------------------------------------------------------------
 * IMPORTANT ORDER
 * ------------------------------------------------------------
 *
 * Inside the loop:
 *
 * 1. Update prefixSum.
 *
 * 2. Calculate neededPrefix.
 *
 * 3. Look up neededPrefix.
 *
 * 4. Add matching count to subarrays.
 *
 * 5. Record the CURRENT prefixSum in the Map.
 *
 *
 * The distinction is:
 *
 * neededPrefix -> LOOK UP
 *
 * prefixSum -> STORE
 *
 *
 * We store prefixSum after checking neededPrefix.
 *
 * This avoids accidentally matching the current prefix
 * against itself.
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
 * We scan nums once.
 *
 * Map lookups and inserts are O(1) on average.
 *
 *
 * Space Complexity:
 *
 * O(n)
 *
 * In the worst case, the Map can store many different
 * prefix sums.
 */

var subarraySum = function(nums, k) {

    var subarrays = 0;

    // prefix sum 0 has been seen once before we start.
    var map = new Map([[0, 1]]);

    var prefixSum = 0;


    for (var i = 0; i < nums.length; i++) {

        // Running total up to the current index.
        prefixSum += nums[i];


        // If this prefix existed earlier, the values between
        // that earlier position and now sum to k.
        var neededPrefix = prefixSum - k;


        // Count how many valid subarrays end at this index.
        if (map.has(neededPrefix)) {

            subarrays += map.get(neededPrefix);
        }


        // Record the current prefix sum for future positions.
        if (map.has(prefixSum)) {

            map.set(prefixSum, map.get(prefixSum) + 1);

        } else {

            map.set(prefixSum, 1);
        }
    }


    return subarrays;
};


/**
 * ------------------------------------------------------------
 * THINGS TO REMEMBER
 * ------------------------------------------------------------
 *
 * 1. A subarray is contiguous.
 *
 *
 * 2. Brute force:
 *
 *    choose every start index
 *    extend to every possible end index
 *
 *
 * 3. Brute-force complexity:
 *
 *    Time:  O(n²)
 *    Space: O(1)
 *
 *
 * 4. Prefix sum means:
 *
 *    running total so far
 *
 *
 * 5. Key equation:
 *
 *    currentPrefix - previousPrefix = k
 *
 *
 * 6. Rearranged:
 *
 *    previousPrefix = currentPrefix - k
 *
 *
 * 7. Therefore:
 *
 *    neededPrefix = prefixSum - k
 *
 *
 * 8. Map stores:
 *
 *    prefixSum -> frequency
 *
 *
 * 9. Important distinction:
 *
 *    neededPrefix -> lookup
 *
 *    prefixSum -> store
 *
 *
 * 10. Start the Map with:
 *
 *     0 -> 1
 *
 *     so subarrays beginning at index 0 are counted.
 *
 *
 * 11. Optimized complexity:
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
 * PREFIX SUM + FREQUENCY MAP
 *
 * pattern.
 *
 *
 * It is especially useful for problems involving:
 *
 * - contiguous subarrays
 * - target sums
 * - counting subarrays
 * - negative numbers
 *
 *
 * Instead of recalculating every possible subarray,
 * keep information about sums you have already seen
 * and use that history to answer the current position
 * in constant average time.
 */