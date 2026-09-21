/*
Problem: Contains Duplicate
LeetCode: #217

Given an integer array nums, return true if any value appears at least twice.
Return false if every element is distinct.

Example:
nums = [1, 2, 3, 1]
output = true

--------------------------------------------------
1. My first approach
--------------------------------------------------

Idea:
Use a Map to keep track of numbers I have already seen.

For each number:
- Check whether it already exists in the Map
- If it does, return true
- Otherwise store it

My original solution:

var containsDuplicate = function(nums) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        if (map.get(nums[i])) {
            return true;
        }

        map.set(nums[i], 1);
    }

    return false;
};

Time: O(n)
Space: O(n)

What was good:
- The overall approach was already efficient
- I avoided comparing every number with every other number
- I used fast lookup to check previously seen values

--------------------------------------------------
2. Improvement: use .has() instead of .get()
--------------------------------------------------

My original check was:

    map.get(nums[i])

This works because I always stored the value 1.

However, I am not interested in the stored value.
I only want to know whether the key exists.

Better:

    map.has(nums[i])

Useful distinction:

    map.has(key)  -> does this key exist?
    map.get(key)  -> what value is stored for this key?

--------------------------------------------------
3. Better data structure: Set
--------------------------------------------------

A Map stores:

    key -> value

For example, in Two Sum:

    number -> index

But in Contains Duplicate, I do not need to store any extra value.

I only need to ask:

    "Have I already seen this number?"

A Set is therefore a better fit.

A Set stores unique values and provides fast existence checks.

Time: O(n)
Space: O(n)

Pattern:
Hash Set / fast lookup

Key takeaway:

If I only need to know whether a value exists:
    -> use Set

If I need to associate a key with another value:
    -> use Map

Examples:

Contains Duplicate:
    "Have I seen this number?"
    -> Set

Two Sum:
    "Which index did I see this number at?"
    -> Map

Also remember:

    array.includes(value) -> O(n)
    set.has(value)        -> approximately O(1)
*/


function containsDuplicate(nums) {
    const seen = new Set();

    for (let i = 0; i < nums.length; i++) {
        if (seen.has(nums[i])) {
            return true;
        }

        seen.add(nums[i]);
    }

    return false;
}


// Quick checks
console.log(containsDuplicate([1, 2, 3, 1])); // true
console.log(containsDuplicate([1, 2, 3, 4])); // false
console.log(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])); // true