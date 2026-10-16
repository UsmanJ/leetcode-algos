/**
 * LeetCode 155 - Min Stack
 *
 * Pattern:
 * Stack / Auxiliary Stack
 *
 * Problem:
 * Design a stack that supports:
 *
 * push(value)
 * pop()
 * top()
 * getMin()
 *
 * All operations must run in O(1) time.
 */


/**
 * ------------------------------------------------------------
 * THE PROBLEM
 * ------------------------------------------------------------
 *
 * A normal stack can easily do:
 *
 * push()
 * pop()
 * top()
 *
 * in O(1).
 *
 *
 * But finding the minimum would normally require:
 *
 * scanning the whole stack
 *
 * which would be:
 *
 * O(n)
 *
 *
 * We want:
 *
 * getMin()
 *
 * to also be:
 *
 * O(1)
 */


/**
 * ------------------------------------------------------------
 * KEY IDEA
 * ------------------------------------------------------------
 *
 * Maintain TWO stacks:
 *
 * stack
 *
 * stores the real values.
 *
 *
 * minStack
 *
 * stores the minimum value seen up to each position.
 *
 *
 * Example:
 *
 * Push:
 *
 * 5
 * 3
 * 7
 * 2
 *
 *
 * stack:
 *
 * [5, 3, 7, 2]
 *
 *
 * minStack:
 *
 * [5, 3, 3, 2]
 *
 *
 * Notice that both stacks always have the same length.
 *
 *
 * At every index:
 *
 * minStack[i]
 *
 * tells us the minimum value in:
 *
 * stack[0...i]
 */


/**
 * ------------------------------------------------------------
 * WHY THIS WORKS
 * ------------------------------------------------------------
 *
 * Suppose:
 *
 * stack:
 *
 * [5, 3, 7, 2]
 *
 * minStack:
 *
 * [5, 3, 3, 2]
 *
 *
 * getMin():
 *
 * returns the top of minStack:
 *
 * 2
 *
 *
 * Now pop:
 *
 * stack:
 *
 * [5, 3, 7]
 *
 * minStack:
 *
 * [5, 3, 3]
 *
 *
 * The old minimum 2 disappears automatically.
 *
 * The previous minimum:
 *
 * 3
 *
 * is now restored.
 */


/**
 * ------------------------------------------------------------
 * CONSTRUCTOR
 * ------------------------------------------------------------
 */

var MinStack = function() {

    this.stack = [];

    this.minStack = [];
};


/**
 * ------------------------------------------------------------
 * PUSH
 * ------------------------------------------------------------
 *
 * Add the value to the normal stack.
 *
 * Then add the current minimum to minStack.
 *
 *
 * Example:
 *
 * Current minimum = 3
 * New value = 7
 *
 * New minimum remains:
 *
 * 3
 *
 *
 * Current minimum = 3
 * New value = 2
 *
 * New minimum becomes:
 *
 * 2
 */

MinStack.prototype.push = function(value) {

    this.stack.push(value);


    // First value pushed.
    if (this.minStack.length === 0) {

        this.minStack.push(value);

        return;
    }


    var currentMin =
        this.minStack[this.minStack.length - 1];


    this.minStack.push(
        Math.min(currentMin, value)
    );
};


/**
 * ------------------------------------------------------------
 * POP
 * ------------------------------------------------------------
 *
 * Both stacks must stay aligned.
 *
 * So whenever we remove from stack,
 * we also remove from minStack.
 */

MinStack.prototype.pop = function() {

    this.stack.pop();

    this.minStack.pop();
};


/**
 * ------------------------------------------------------------
 * TOP
 * ------------------------------------------------------------
 *
 * Return the most recently added value.
 */

MinStack.prototype.top = function() {

    return this.stack[this.stack.length - 1];
};


/**
 * ------------------------------------------------------------
 * GET MINIMUM
 * ------------------------------------------------------------
 *
 * The current minimum is always stored at
 * the top of minStack.
 */

MinStack.prototype.getMin = function() {

    return this.minStack[this.minStack.length - 1];
};


/**
 * ------------------------------------------------------------
 * EXAMPLE
 * ------------------------------------------------------------
 *
 * var minStack = new MinStack();
 *
 * minStack.push(-2);
 * minStack.push(0);
 * minStack.push(-3);
 *
 *
 * stack:
 *
 * [-2, 0, -3]
 *
 * minStack:
 *
 * [-2, -2, -3]
 *
 *
 * minStack.getMin();
 *
 * -> -3
 *
 *
 * minStack.pop();
 *
 *
 * stack:
 *
 * [-2, 0]
 *
 * minStack:
 *
 * [-2, -2]
 *
 *
 * minStack.top();
 *
 * -> 0
 *
 *
 * minStack.getMin();
 *
 * -> -2
 */


/**
 * ------------------------------------------------------------
 * COMPLEXITY
 * ------------------------------------------------------------
 *
 * push():
 *
 * O(1)
 *
 *
 * pop():
 *
 * O(1)
 *
 *
 * top():
 *
 * O(1)
 *
 *
 * getMin():
 *
 * O(1)
 *
 *
 * Space:
 *
 * O(n)
 *
 * because minStack grows alongside stack.
 */


/**
 * ------------------------------------------------------------
 * REMEMBER
 * ------------------------------------------------------------
 *
 * Main idea:
 *
 * Store extra information while pushing so that
 * you don't need to recalculate it later.
 *
 *
 * Normal stack:
 *
 * stores actual values
 *
 *
 * Min stack:
 *
 * stores minimum-so-far at every position
 *
 *
 * Every push:
 *
 * push value to normal stack
 * push min(currentMin, value) to minStack
 *
 *
 * Every pop:
 *
 * pop both stacks
 *
 *
 * getMin:
 *
 * return top of minStack
 */