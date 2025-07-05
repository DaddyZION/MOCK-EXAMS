# Programming Language Paradigms Mock Exam

## Section A: Multiple Choice (20 Marks)

1.  Which of the following is a key characteristic of functional programming?
    a) The use of mutable state
    b) A focus on how to perform tasks (imperative)
    c) The use of pure functions
    d) A focus on objects and classes

2.  What is a 'pure function' in the context of functional programming?
    a) A function that has no side effects and its output depends only on its inputs
    b) A function that can modify variables outside of its scope
    c) A function that does not return a value
    d) A function that is written in a purely functional language

3.  Which of the following is a functional programming language?
    a) C++
    b) Python
    c) Haskell
    d) Java

4.  What is the main difference between imperative and functional programming?
    a) Imperative programming uses functions, while functional programming does not.
    b) Imperative programming focuses on describing how to achieve a result, while functional programming focuses on describing what the result should be.
    c) Functional programming is older than imperative programming.
    d) There is no significant difference between the two paradigms.

5.  What is a common technique used in functional programming to handle repetitive tasks?
    a) For loops
    b) While loops
    c) Recursion
    d) GOTO statements

## Section B: Short Answer (30 Marks)

1.  What are the two main programming paradigms discussed in the module?
2.  What is a higher-order function?
3.  Explain the concept of 'immutability' in functional programming.
4.  What is the primary focus of the functional programming paradigm?
5.  What is a side effect in programming?

## Section C: Long Answer (50 Marks)

1.  Write a simple function in Haskell that takes a list of integers and returns a new list containing only the even numbers from the original list.
2.  Explain the benefits of using pure functions in your code. Discuss at least three benefits.
3.  Compare and contrast the imperative and functional programming paradigms. Discuss their strengths and weaknesses.
4.  What is recursion? Write a recursive function in a language of your choice to calculate the factorial of a non-negative integer.
5.  Describe a common idiom or technique used in functional programming to solve a specific type of problem (e.g., map, filter, reduce).

---

# Answers

## Section A

1.  c) The use of pure functions
2.  a) A function that has no side effects and its output depends only on its inputs
3.  c) Haskell
4.  b) Imperative programming focuses on describing how to achieve a result, while functional programming focuses on describing what the result should be.
5.  c) Recursion

## Section B

1.  The two main programming paradigms are imperative programming and functional programming.
2.  A higher-order function is a function that either takes one or more functions as arguments, or returns a function as its result.
3.  Immutability means that once a value is created, it cannot be changed. In functional programming, this helps to avoid side effects and makes programs easier to reason about.
4.  The primary focus of the functional paradigm is on the evaluation of functions, and avoiding state and mutable data.
5.  A side effect is any effect of a function that is observable outside the returning of a value from the function. Examples include modifying a global variable or printing to the console.

## Section C

1.  (Haskell)
    ```haskell
    filterEven :: [Int] -> [Int]
    filterEven xs = [x | x <- xs, even x]
    ```
2.  Benefits of pure functions include: they are easier to test and debug, they are easier to reason about and understand, and they are more predictable, as their output is always the same for the same input.
3.  (Answer should discuss the differences in their approach to state, control flow, and data. Strengths of imperative programming include its performance and familiarity, while strengths of functional programming include its expressiveness and safety.)
4.  Recursion is a technique where a function calls itself in its own definition. (Example in Python)
    ```python
    def factorial(n):
      if n == 0:
        return 1
      else:
        return n * factorial(n-1)
    ```
5.  (Answer could describe `map`, which applies a function to every element of a list; `filter`, which creates a new list of elements that satisfy a predicate; or `reduce`, which combines the elements of a list into a single value.)
