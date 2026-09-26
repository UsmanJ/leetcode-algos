# Interview Prep

This repository contains my notes and solutions for coding interview preparation.

The goal is not just to collect LeetCode answers, but to understand the common algorithm patterns, improve my problem-solving approach, and keep notes I can review later.

---

## Structure

```text
interview-prep/
├── arrays/
├── strings/
├── hash-maps/
├── two-pointers/
├── sliding-window/
├── stacks/
├── linked-lists/
├── trees/
├── graphs/
└── README.md
````

---

# Algorithm Patterns

## Hash Maps

Use when:

* I need fast lookup
* I need to know whether I have already seen a value
* I need to store a value and its index
* I need to count occurrences
* I need to find complements or matching values

Typical JavaScript structure:

```js
const map = new Map();

map.set(key, value);

map.has(key);

map.get(key);
```

Typical complexity:

* Lookup: O(1)
* Insert: O(1)
* Space: O(n)

If I only need to check whether a value has been seen (no need to store an
associated value), a `Set` is a better fit than a `Map`:

```js
const seen = new Set();

seen.add(value);

seen.has(value);
```

Problems:

* Two Sum
* Contains Duplicate (Set)
* Valid Anagram (frequency Map / frequency array)
* Group Anagrams (Map of sorted-string or frequency-array keys)
* Longest Consecutive Sequence (Set, check `num - 1` to find sequence starts)
* Majority Element (frequency Map approach; see also Boyer-Moore Voting below)

Key question to ask:

> Have I already seen the value I need?

---

## Brute Force

Brute force usually means checking all possible combinations.

Example:

```js
for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
        // compare nums[i] and nums[j]
    }
}
```

Typical complexity:

* Time: O(n²)
* Space: O(1)

Brute force is often a good starting point in interviews.

After finding a working solution, ask:

> Can I avoid repeatedly searching through the same data?

---

## Two Pointers

Use when:

* Working with sorted arrays
* Comparing values from both ends
* Looking for pairs
* Shrinking a search area
* Working with palindromes

Typical structure:

```js
let left = 0;
let right = nums.length - 1;

while (left < right) {
    // compare values

    left++;
    right--;
}
```

Variations:

* **Write pointer** – one pointer scans (`i`), another marks where the next kept value goes. Good for compacting / removing / moving values in place while preserving order.
* **Merge backwards** – two sorted inputs, one pointer each, plus a write pointer filling from the end so unprocessed values aren't overwritten.

Problems:

* Move Zeroes (write pointer, then fill the rest with 0)
* Merge Sorted Array (three pointers `i = m - 1`, `j = n - 1`, `k = m + n - 1`, merge from the back)

---

## Sliding Window

Use when:

* Working with contiguous arrays or strings
* Finding the longest or shortest sequence
* Tracking a running condition
* Looking for subarrays or substrings

Typical idea:

```text
Expand the right side of the window.

If the condition is broken,
move the left side forward.
```

Problems:

* TODO

---

## Stack

Use when:

* Matching opening and closing brackets
* Processing nested structures
* Need Last In, First Out behaviour
* Tracking previous states

Typical JavaScript structure:

```js
const stack = [];

stack.push(value);

stack.pop();

stack[stack.length - 1];
```

Problems:

* TODO

---

## Prefix / Suffix Products

Use when:

* I need the product (or sum) of every element except the current one
* A brute-force nested loop would be O(n²)
* I can't just divide by the current value (e.g. zeros in the array)

Typical idea:

```text
First pass (left to right):
Store the running product of everything to the LEFT of each index.

Second pass (right to left):
Multiply in the running product of everything to the RIGHT of each index.
```

Typical complexity:

* Time: O(n)
* Space: O(1) extra (excluding the output array)

Problems:

* Product of Array Except Self

Key question to ask:

> Can I precompute what's to the left and right of each index in two passes instead of recomputing it for every element?

---

## Greedy / One Pass

Use when:

* I need a running best/min/max while scanning once
* Each decision only depends on what I've seen so far, not the whole array
* A brute-force approach compares every pair (O(n²)) but the answer can be tracked incrementally

Typical structure:

```js
let best = 0;
let runningMin = nums[0];

for (let i = 1; i < nums.length; i++) {
    runningMin = Math.min(runningMin, nums[i]);
    best = Math.max(best, nums[i] - runningMin);
}
```

Typical complexity:

* Time: O(n)
* Space: O(1)

Problems:

* Best Time to Buy and Sell Stock

Key question to ask:

> Do I actually need to compare every pair, or can I track the best value seen so far in a single pass?

---

## Cancellation / Voting (Boyer-Moore)

Use when:

* One value is guaranteed to dominate the input (e.g. appears more than n/2 times)
* A frequency Map would work but uses O(n) extra space
* I want to avoid storing every count explicitly

Typical structure:

```js
let candidate;
let count = 0;

for (const num of nums) {
    if (count === 0) {
        candidate = num;
    }

    count += num === candidate ? 1 : -1;
}
```

Typical complexity:

* Time: O(n)
* Space: O(1)

Problems:

* Majority Element

Key question to ask:

> Can opposing values cancel each other out, leaving only the guaranteed majority behind?

---

## Counting (Fixed Value Range)

Use when:

* The possible values are known in advance
* There are only a small number of distinct values
* A general-purpose sort (O(n log n)) is overkill

Typical idea:

```text
First pass:
Count how many times each value appears.

Second pass:
Overwrite the array in order using those counts.
```

Typical complexity:

* Time: O(n)
* Space: O(1) (fixed number of counters)

Problems:

* Sort Colors (count 0s / 1s / 2s; one-pass alternative: Dutch National Flag)

Key question to ask:

> Is the set of possible values small enough to just count them and rebuild?

---

# Problems Completed

| Problem                          | Pattern                     |      Time | Space | Status |
| --------------------------------- | ---------------------------- | --------: | ----: | ------ |
| Two Sum                           | Hash Map                     |      O(n) |  O(n) | ✅      |
| Contains Duplicate                | Hash Set                     |      O(n) |  O(n) | ✅      |
| Valid Anagram                     | Frequency Map / Array        |      O(n) |  O(1) | ✅      |
| Group Anagrams                    | Hash Map (frequency key)     | O(n \* k) | O(n \* k) | ✅  |
| Product of Array Except Self      | Prefix / Suffix Products      |      O(n) |  O(1) | ✅      |
| Best Time to Buy and Sell Stock   | Greedy / One Pass             |      O(n) |  O(1) | ✅      |
| Longest Consecutive Sequence      | Hash Set                      |      O(n) |  O(n) | ✅      |
| Majority Element                  | Boyer-Moore Voting            |      O(n) |  O(1) | ✅      |
| Move Zeroes                       | Two Pointers (write pointer)  |      O(n) |  O(1) | ✅      |
| Merge Sorted Array                | Two Pointers (merge backwards) | O(m + n) |  O(1) | ✅      |
| Sort Colors                       | Counting                      |      O(n) |  O(1) | ✅      |

---

# My Process

For each problem:

1. Read the problem carefully.
2. Understand the inputs and expected output.
3. Think of a simple brute-force solution first.
4. Write the solution myself.
5. Work out the time and space complexity.
6. Submit it on LeetCode.
7. Look for a more efficient solution.
8. Understand why the improved approach works.
9. Rewrite the improved solution from memory.
10. Save both the original and improved approach locally.
11. Record the algorithm pattern.
12. Revisit the problem later without looking at the answer.

---

# Complexity Cheat Sheet

## O(1)

Constant time.

Example:

```js
map.get(key);
```

---

## O(n)

Loop through the input once.

Example:

```js
for (let i = 0; i < nums.length; i++) {
}
```

---

## O(n²)

Usually nested loops over the same input.

Example:

```js
for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
    }
}
```

---

## O(log n)

The problem size is reduced significantly on every step.

Common example:

* Binary search

---

## O(n log n)

Common with efficient sorting algorithms.

Example:

```js
nums.sort((a, b) => a - b);
```

---

# Key Things To Remember

Do not memorise individual solutions.

Instead, try to recognise patterns.

For example:

```text
Need fast lookup?
→ Hash Map

Sorted array and looking for a pair?
→ Two Pointers

Contiguous substring or subarray?
→ Sliding Window

Nested brackets or previous state?
→ Stack

Search a sorted collection?
→ Binary Search
```

The goal is to eventually recognise the likely pattern before writing the code.