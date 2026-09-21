/**
 * LeetCode 121 - Best Time to Buy and Sell Stock
 *
 * Problem:
 * You are given an array where each value represents the stock price
 * on a particular day.
 *
 * You can:
 *
 * - Buy once
 * - Sell once
 * - You MUST sell after you buy
 *
 * Return the maximum profit you can make.
 *
 * If no profit is possible, return 0.
 *
 *
 * Example:
 *
 * Input:
 * prices = [7, 1, 5, 3, 6, 4]
 *
 * Best transaction:
 *
 * Buy at 1
 * Sell at 6
 *
 * Profit:
 *
 * 6 - 1 = 5
 *
 * Output:
 *
 * 5
 *
 *
 * Example 2:
 *
 * prices = [7, 6, 4, 3, 1]
 *
 * The price only decreases.
 *
 * There is no profitable trade.
 *
 * Output:
 *
 * 0
 */


/**
 * ------------------------------------------------------------
 * APPROACH 1 - BRUTE FORCE
 * ------------------------------------------------------------
 *
 * The most straightforward approach is to try every possible
 * buy day with every possible sell day that comes after it.
 *
 *
 * Example:
 *
 * prices = [7, 1, 5, 3, 6, 4]
 *
 *
 * If we buy at index 0:
 *
 * Buy = 7
 *
 * Try selling at:
 *
 * 1 -> 1 - 7 = -6
 * 2 -> 5 - 7 = -2
 * 3 -> 3 - 7 = -4
 * 4 -> 6 - 7 = -1
 * 5 -> 4 - 7 = -3
 *
 *
 * Then move to index 1:
 *
 * Buy = 1
 *
 * Try selling at:
 *
 * 2 -> 5 - 1 = 4
 * 3 -> 3 - 1 = 2
 * 4 -> 6 - 1 = 5
 * 5 -> 4 - 1 = 3
 *
 *
 * The best result is:
 *
 * 5
 *
 *
 * IMPORTANT:
 *
 * The sell index must start at:
 *
 * i + 1
 *
 * because we must sell AFTER we buy.
 */


/**
 * Time Complexity:
 *
 * O(n²)
 *
 * because we have a nested loop.
 *
 * For every possible buy day, we check all later sell days.
 *
 *
 * Space Complexity:
 *
 * O(1)
 *
 * We only store a few variables.
 */

var maxProfitBruteForce = function(prices) {

    let bestProfit = 0;

    for (var i = 0; i < prices.length - 1; i++) {

        for (var j = i + 1; j < prices.length; j++) {

            let profit = prices[j] - prices[i];

            if (profit > bestProfit) {
                bestProfit = profit;
            }
        }
    }

    return bestProfit;
};


/**
 * ------------------------------------------------------------
 * APPROACH 2 - ONE PASS
 * ------------------------------------------------------------
 *
 * We do not actually need to compare every possible pair.
 *
 *
 * KEY OBSERVATION:
 *
 * When we arrive at a price, we only need to know:
 *
 * 1. What is the cheapest price we have seen BEFORE today?
 *
 * 2. What is the best profit we have seen so far?
 *
 *
 * If today's price is:
 *
 * prices[i]
 *
 * and the cheapest previous price is:
 *
 * cheapestPrice
 *
 * then the profit if we sold today is:
 *
 * prices[i] - cheapestPrice
 *
 *
 * We can therefore solve the problem in one pass.
 */


/**
 * ------------------------------------------------------------
 * WALKTHROUGH
 * ------------------------------------------------------------
 *
 * prices = [7, 1, 5, 3, 6, 4]
 *
 *
 * Start:
 *
 * cheapestPrice = 7
 * bestProfit = 0
 *
 *
 * ------------------------------------------------------------
 * Day 1
 * ------------------------------------------------------------
 *
 * Current price = 1
 *
 * Is 1 cheaper than 7?
 *
 * Yes.
 *
 * cheapestPrice = 1
 *
 * Profit if we sell today:
 *
 * 1 - 1 = 0
 *
 * bestProfit remains:
 *
 * 0
 *
 *
 * ------------------------------------------------------------
 * Day 2
 * ------------------------------------------------------------
 *
 * Current price = 5
 *
 * Is 5 cheaper than 1?
 *
 * No.
 *
 * Profit if we sell today:
 *
 * 5 - 1 = 4
 *
 * 4 > 0
 *
 * bestProfit = 4
 *
 *
 * ------------------------------------------------------------
 * Day 3
 * ------------------------------------------------------------
 *
 * Current price = 3
 *
 * cheapestPrice remains:
 *
 * 1
 *
 * Profit:
 *
 * 3 - 1 = 2
 *
 * bestProfit remains:
 *
 * 4
 *
 *
 * ------------------------------------------------------------
 * Day 4
 * ------------------------------------------------------------
 *
 * Current price = 6
 *
 * Profit:
 *
 * 6 - 1 = 5
 *
 * bestProfit = 5
 *
 *
 * ------------------------------------------------------------
 * Day 5
 * ------------------------------------------------------------
 *
 * Current price = 4
 *
 * Profit:
 *
 * 4 - 1 = 3
 *
 * bestProfit remains:
 *
 * 5
 *
 *
 * Final answer:
 *
 * 5
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
 * We scan through the prices once.
 *
 *
 * Space Complexity:
 *
 * O(1)
 *
 * We only store:
 *
 * - cheapestPrice
 * - bestProfit
 * - current profit
 *
 * The amount of extra memory does not grow with the size
 * of the input.
 */

var maxProfit = function(prices) {

    let bestProfit = 0;

    let cheapestPrice = prices[0];

    // Start at index 1 because prices[0] is already being used
    // as our initial cheapest price.
    for (var i = 1; i < prices.length; i++) {

        // If today's price is cheaper than anything we've seen
        // before, this becomes our new potential buy price.
        if (prices[i] < cheapestPrice) {

            cheapestPrice = prices[i];

        }

        // Work out the profit if we bought at the cheapest
        // price seen so far and sold today.
        let profit = prices[i] - cheapestPrice;

        // Keep the best profit we've found.
        if (profit > bestProfit) {

            bestProfit = profit;

        }
    }

    return bestProfit;
};


/**
 * ------------------------------------------------------------
 * THINGS TO REMEMBER
 * ------------------------------------------------------------
 *
 * 1. You must BUY before you SELL.
 *
 *
 * 2. The brute-force solution tries every valid pair:
 *
 *    O(n²)
 *
 *
 * 3. To improve it, ask:
 *
 *    "What information from the past do I actually need?"
 *
 *
 * 4. Here, we only need:
 *
 *    - cheapest price seen so far
 *    - best profit seen so far
 *
 *
 * 5. At every price:
 *
 *    profit if selling today
 *
 *    =
 *
 *    currentPrice - cheapestPrice
 *
 *
 * 6. If today's price is lower than cheapestPrice,
 *    update cheapestPrice.
 *
 *
 * 7. If today's possible profit is greater than bestProfit,
 *    update bestProfit.
 *
 *
 * 8. This gives:
 *
 *    Time:  O(n)
 *    Space: O(1)
 *
 *
 * ------------------------------------------------------------
 * PATTERN TO RECOGNISE
 * ------------------------------------------------------------
 *
 * This problem uses a very common interview pattern:
 *
 * TRACK THE BEST VALUE SEEN SO FAR
 *
 *
 * As you scan an array from left to right, keep only the
 * information from the past that is needed to make the
 * best decision at the current position.
 *
 *
 * In this problem:
 *
 * "best past value"
 *
 * =
 *
 * lowest price seen so far
 */