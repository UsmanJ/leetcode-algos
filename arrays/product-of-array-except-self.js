/**
 * LeetCode 238 - Product of Array Except Self
 *
 * Problem:
 * Given an integer array nums, return an array answer such that:
 *
 * answer[i] is equal to the product of every element in nums
 * except nums[i].
 *
 * You must solve the problem without using division.
 *
 *
 * Example:
 *
 * Input:
 * nums = [1, 2, 3, 4]
 *
 * Output:
 * [24, 12, 8, 6]
 *
 *
 * Why?
 *
 * index 0:
 * exclude 1
 * 2 * 3 * 4 = 24
 *
 * index 1:
 * exclude 2
 * 1 * 3 * 4 = 12
 *
 * index 2:
 * exclude 3
 * 1 * 2 * 4 = 8
 *
 * index 3:
 * exclude 4
 * 1 * 2 * 3 = 6
 */


/**
 * ------------------------------------------------------------
 * APPROACH 1 - BRUTE FORCE
 * ------------------------------------------------------------
 *
 * For every index:
 *
 * 1. Loop through the entire array.
 * 2. Multiply every number except the number at the current index.
 * 3. Push the result into answers.
 *
 *
 * Example:
 *
 * nums = [1, 2, 3, 4]
 *
 * For i = 0:
 *
 * skip nums[0]
 *
 * product =
 * 2 * 3 * 4
 * = 24
 *
 *
 * For i = 1:
 *
 * skip nums[1]
 *
 * product =
 * 1 * 3 * 4
 * = 12
 *
 *
 * ------------------------------------------------------------
 * WHY DOES PRODUCT START AT 1?
 * ------------------------------------------------------------
 *
 * 1 is the neutral value for multiplication.
 *
 * 1 * 5 = 5
 *
 * If we started at 0:
 *
 * 0 * 5 = 0
 *
 * and every answer would become 0.
 *
 *
 * ------------------------------------------------------------
 * TIME COMPLEXITY
 * ------------------------------------------------------------
 *
 * We have a loop inside another loop.
 *
 * Outer loop:
 * O(n)
 *
 * Inner loop:
 * O(n)
 *
 * Total:
 *
 * O(n²)
 *
 *
 * SPACE COMPLEXITY
 * ------------------------------------------------------------
 *
 * O(n)
 *
 * because we create the answers array.
 */

var productExceptSelfBruteForce = function(nums) {

    var answers = [];

    for (var i = 0; i < nums.length; i++) {

        var product = 1;

        for (var j = 0; j < nums.length; j++) {

            if (i !== j) {
                product = product * nums[j];
            }
        }

        answers.push(product);
    }

    return answers;
};


/**
 * ------------------------------------------------------------
 * APPROACH 2 - LEFT AND RIGHT PRODUCTS
 * ------------------------------------------------------------
 *
 * We can improve the solution by noticing that:
 *
 * answer[i]
 *
 * =
 *
 * product of everything LEFT of i
 *
 * *
 *
 * product of everything RIGHT of i
 *
 *
 * Example:
 *
 * nums = [1, 2, 3, 4]
 *
 *
 * At index 2:
 *
 * nums[2] = 3
 *
 * Everything on the left:
 *
 * 1 * 2 = 2
 *
 * Everything on the right:
 *
 * 4
 *
 * Therefore:
 *
 * 2 * 4 = 8
 *
 *
 * ------------------------------------------------------------
 * LEFT PASS
 * ------------------------------------------------------------
 *
 * First we build the product of everything to the LEFT
 * of each index.
 *
 * nums:
 *
 * [1, 2, 3, 4]
 *
 *
 * Left products:
 *
 * index 0:
 * nothing on the left
 * = 1
 *
 * index 1:
 * 1
 * = 1
 *
 * index 2:
 * 1 * 2
 * = 2
 *
 * index 3:
 * 1 * 2 * 3
 * = 6
 *
 *
 * So:
 *
 * answers = [1, 1, 2, 6]
 *
 *
 * We do not need to recalculate the product from scratch.
 *
 * Instead, we keep a running product.
 *
 *
 * Start:
 *
 * product = 1
 *
 *
 * i = 0
 *
 * answers.push(1)
 *
 * product = 1 * nums[0]
 * product = 1
 *
 *
 * i = 1
 *
 * answers.push(1)
 *
 * product = 1 * nums[1]
 * product = 2
 *
 *
 * i = 2
 *
 * answers.push(2)
 *
 * product = 2 * nums[2]
 * product = 6
 *
 *
 * i = 3
 *
 * answers.push(6)
 *
 *
 * Result after first pass:
 *
 * [1, 1, 2, 6]
 */


/**
 * ------------------------------------------------------------
 * RIGHT PASS
 * ------------------------------------------------------------
 *
 * Now we move from RIGHT to LEFT.
 *
 * Reset:
 *
 * product = 1
 *
 *
 * This time product represents everything to the RIGHT
 * of the current index.
 *
 *
 * Starting answers:
 *
 * [1, 1, 2, 6]
 *
 *
 * i = 3
 *
 * product = 1
 *
 * answers[3] =
 * 6 * 1
 * = 6
 *
 * Then update:
 *
 * product =
 * 1 * nums[3]
 * = 4
 *
 *
 * i = 2
 *
 * answers[2] =
 * 2 * 4
 * = 8
 *
 * update product:
 *
 * 4 * 3
 * = 12
 *
 *
 * i = 1
 *
 * answers[1] =
 * 1 * 12
 * = 12
 *
 * update product:
 *
 * 12 * 2
 * = 24
 *
 *
 * i = 0
 *
 * answers[0] =
 * 1 * 24
 * = 24
 *
 *
 * Final:
 *
 * [24, 12, 8, 6]
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
 * We have two separate loops:
 *
 * O(n) + O(n)
 *
 * =
 *
 * O(2n)
 *
 * Big-O ignores constants:
 *
 * O(n)
 *
 *
 * IMPORTANT:
 *
 * Two separate loops are still O(n).
 *
 * A loop inside another loop would be O(n²).
 *
 *
 * Space Complexity:
 *
 * O(1) extra space if the returned answers array is not counted,
 * which is how LeetCode describes this problem.
 *
 * We only use:
 *
 * - answers
 * - product
 * - loop variables
 *
 * We do NOT create separate left and right arrays.
 */

var productExceptSelf = function(nums) {

    var answers = [];

    var product = 1;


    // --------------------------------------------------------
    // PASS 1:
    // Store the product of everything to the LEFT
    // of each index.
    // --------------------------------------------------------

    for (var i = 0; i < nums.length; i++) {

        // product currently contains everything
        // to the left of index i.
        answers.push(product);

        // Include nums[i] for the next index.
        product = product * nums[i];
    }


    // --------------------------------------------------------
    // PASS 2:
    // Multiply in the product of everything to the RIGHT
    // of each index.
    // --------------------------------------------------------

    product = 1;

    for (var i = nums.length - 1; i >= 0; i--) {

        // answers[i] already contains the left product.
        //
        // Multiply it by the current right product.
        answers[i] = answers[i] * product;

        // Include nums[i] for the next index to the left.
        product = product * nums[i];
    }


    return answers;
};


/**
 * ------------------------------------------------------------
 * THINGS TO REMEMBER
 * ------------------------------------------------------------
 *
 * 1. Start multiplication with 1, not 0.
 *
 *
 * 2. The brute-force solution checks every other number
 *    for every index:
 *
 *    O(n²)
 *
 *
 * 3. The key observation is:
 *
 *    answer[i]
 *    =
 *    leftProduct[i] * rightProduct[i]
 *
 *
 * 4. You do not actually need separate left and right arrays.
 *
 *    The answers array can first store the left products.
 *
 *
 * 5. During the right-to-left pass, keep one running
 *    right-side product.
 *
 *
 * 6. Two separate loops:
 *
 *    O(n) + O(n)
 *
 *    is still:
 *
 *    O(n)
 *
 *
 * 7. Nested loops:
 *
 *    O(n * n)
 *
 *    become:
 *
 *    O(n²)
 *
 *
 * 8. This is a useful pattern to recognise:
 *
 *    PREFIX PRODUCT
 *         +
 *    SUFFIX PRODUCT
 *
 *
 * A prefix is information accumulated from the left.
 *
 * A suffix is information accumulated from the right.
 */