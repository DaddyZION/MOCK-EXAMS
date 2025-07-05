# Introduction to Programming Mock Exam

## Section A: Multiple Choice (20 Marks)

1.  Which of the following is a key feature of procedural programming?
    a) The use of objects and classes
    b) A focus on functions and the order of execution
    c) The use of declarative statements
    d) A focus on data and its relationships

2.  What is the purpose of testing in software development?
    a) To prove that the software is completely free of errors
    b) To find and fix all bugs before the software is released
    c) To ensure the software meets the specified requirements and to identify defects
    d) To slow down the development process

3.  Which of the following is NOT a fundamental programming construct in a procedural language?
    a) Sequence
    b) Inheritance
    c) Iteration (loops)
    d) Selection (if/else statements)

4.  What is meant by 'robust software'?
    a) Software that is easy to read and understand
    b) Software that can handle unexpected or invalid inputs gracefully
    c) Software that runs very quickly
    d) Software that has a lot of features

5.  Which of the following is an example of a procedural programming language?
    a) Haskell
    b) Java
    c) C
    d) Prolog

## Section B: Short Answer (30 Marks)

1.  What is the difference between a compiler and an interpreter?
2.  Describe the three main programming constructs in procedural programming.
3.  What is the importance of writing maintainable code?
4.  Explain the concept of a variable in programming.
5.  What is the purpose of a function or procedure in procedural programming?

## Section C: Long Answer (50 Marks)

1.  Write a simple program in a procedural language of your choice (e.g., Python, C) that takes two numbers as input from the user, adds them together, and then prints the result.
2.  Design a simple algorithm to find the largest number in a list of numbers. You can write this in pseudocode.
3.  Explain the difference between 'syntax errors' and 'logic errors' in programming. Provide an example of each.
4.  What are the benefits of using comments in your code? Provide at least three benefits.
5.  Describe the process of debugging a program. What are some common techniques used to find and fix bugs?

---

# Answers

## Section A

1.  b) A focus on functions and the order of execution
2.  c) To ensure the software meets the specified requirements and to identify defects
3.  b) Inheritance
4.  b) Software that can handle unexpected or invalid inputs gracefully
5.  c) C

## Section B

1.  A compiler translates the entire source code into machine code before execution, while an interpreter translates and executes the code line by line.
2.  The three main constructs are: Sequence (statements are executed in order), Selection (a choice is made between different blocks of code, e.g., if-else), and Iteration (a block of code is executed repeatedly, e.g., for/while loops).
3.  Maintainable code is important because it is easier to read, understand, and modify in the future, which saves time and effort, especially in large projects.
4.  A variable is a named storage location in a program that holds a value. The value of a variable can be changed during the execution of the program.
5.  A function or procedure is a block of organized, reusable code that is used to perform a single, related action. Functions help to break down a program into smaller, manageable parts.

## Section C

1.  (Example in Python)
    ```python
    num1 = float(input("Enter the first number: "))
    num2 = float(input("Enter the second number: "))
    sum = num1 + num2
    print("The sum is:", sum)
    ```
2.  (Pseudocode)
    ```
    function find_largest(list_of_numbers):
      if list_of_numbers is empty, return null
      largest = first number in list
      for each number in list_of_numbers:
        if number > largest:
          largest = number
      return largest
    ```
3.  A syntax error is a violation of the programming language's rules (e.g., a typo like `prnt` instead of `print`). A logic error is when the code runs without crashing, but produces an incorrect result (e.g., using `+` instead of `-` in a calculation).
4.  Benefits of comments include: explaining the purpose of code, making code easier for others (and your future self) to understand, and temporarily disabling code for testing purposes (commenting out).
5.  Debugging is the process of finding and resolving defects or problems within a computer program. Common techniques include: using a debugger to step through the code, printing the values of variables at different points in the program, and using a process of elimination to isolate the source of the bug.
