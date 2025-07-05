# Calculus 1 Mock Exam

## Section A: Multiple Choice (20 Marks)

1.  What is the limit of the function f(x) = 2x + 5 as x approaches 3?
    a) 7
    b) 11
    c) 8
    d) 1

2.  What is the derivative of f(x) = x^3?
    a) 3x
    b) 3x^2
    c) x^2
    d) 3x^3

3.  What is the integral of f(x) = 4x?
    a) 2x^2 + C
    b) 4x^2 + C
    c) 4 + C
    d) x^2 + C

4.  The derivative of a function at a point represents:
    a) The area under the curve
    b) The slope of the tangent line at that point
    c) The length of the curve
    d) The average value of the function

5.  Which of the following functions is continuous everywhere?
    a) f(x) = 1/x
    b) f(x) = tan(x)
    c) f(x) = |x|
    d) f(x) = ln(x)

## Section B: Short Answer (30 Marks)

1.  State the formal definition of a limit.
2.  Find the derivative of f(x) = (x^2 + 1)(x - 5) using the product rule.
3.  Find the integral of f(x) = e^x + sin(x).
4.  State the Fundamental Theorem of Calculus (Part 1).
5.  What does it mean for a function to be continuous at a point c?

## Section C: Long Answer (50 Marks)

1.  Find the equation of the tangent line to the curve y = x^3 - 2x + 1 at the point (2, 5).
2.  A particle moves along a straight line with its position at time t given by s(t) = t^3 - 6t^2 + 9t. Find the velocity and acceleration of the particle at time t. When is the particle at rest?
3.  Calculate the area of the region bounded by the curve y = x^2, the x-axis, and the lines x = 1 and x = 3.
4.  Use the chain rule to find the derivative of f(x) = (2x^2 + 3)^4.
5.  Evaluate the definite integral of f(x) = 1/x from x = 1 to x = e.

---

# Answers

## Section A

1.  b) 11 || **Explanation:** To find the limit of f(x) = 2x + 5 as x approaches 3, you substitute 3 into the function: 2(3) + 5 = 6 + 5 = 11.
2.  b) 3x^2 || **Explanation:** Using the power rule for differentiation, d/dx(x^n) = nx^(n-1), the derivative of x^3 is 3x^2.
3.  a) 2x^2 + C || **Explanation:** To find the integral of 4x, we use the power rule for integration, ∫x^n dx = (x^(n+1))/(n+1) + C. So, ∫4x dx = 4 * (x^2/2) + C = 2x^2 + C.
4.  b) The slope of the tangent line at that point || **Explanation:** The derivative of a function at a specific point gives the instantaneous rate of change, which is geometrically interpreted as the slope of the tangent line to the function's graph at that point.
5.  c) f(x) = |x| || **Explanation:** The absolute value function f(x) = |x| is continuous for all real numbers. The other functions have points of discontinuity: 1/x at x=0, tan(x) at x = π/2 + nπ, and ln(x) for x ≤ 0.

## Section B

1.  Let f(x) be a function defined on an open interval containing c (except possibly at c) and let L be a real number. The statement lim(x->c) f(x) = L means that for each ε > 0 there exists a δ > 0 such that if 0 < |x - c| < δ, then |f(x) - L| < ε. || **Explanation:** This is the formal epsilon-delta definition of a limit, which provides a rigorous way to define the concept of a function approaching a value.
2.  f'(x) = 3x^2 - 10x + 1. || **Explanation:** Using the product rule, (uv)' = u'v + uv', with u = x^2 + 1 and v = x - 5. u' = 2x and v' = 1. So, f'(x) = 2x(x - 5) + (x^2 + 1)(1) = 2x^2 - 10x + x^2 + 1 = 3x^2 - 10x + 1.
3.  ∫(e^x + sin(x)) dx = e^x - cos(x) + C. || **Explanation:** The integral of e^x is e^x, and the integral of sin(x) is -cos(x). The constant of integration, C, is added because the derivative of a constant is zero.
4.  If f is a continuous function on a closed interval [a, b], then the function F defined by F(x) = ∫[a,x] f(t) dt for x in [a, b] is continuous on [a, b] and differentiable on (a, b), and F'(x) = f(x). || **Explanation:** This part of the theorem connects differentiation and integration, showing that they are inverse processes. It states that the derivative of an integral function is the original function.
5.  A function f is continuous at a point c if the following three conditions are met: 1. f(c) is defined. 2. lim(x->c) f(x) exists. 3. lim(x->c) f(x) = f(c). || **Explanation:** These three conditions ensure that the function has no interruptions, jumps, or holes at the point c. The function's value at the point must equal the value it approaches at that point.

## Section C

1.  y = 10x - 15. || **Explanation:** First, find the derivative of y = x^3 - 2x + 1, which is y' = 3x^2 - 2. Then, evaluate the slope at the point (2, 5) by plugging in x=2: y'(2) = 3(2)^2 - 2 = 10. Finally, use the point-slope form of a line: y - y1 = m(x - x1), which gives y - 5 = 10(x - 2), simplifying to y = 10x - 15.
2.  Velocity v(t) = 3t^2 - 12t + 9. Acceleration a(t) = 6t - 12. The particle is at rest at t = 1 and t = 3. || **Explanation:** Velocity is the first derivative of the position function s(t), and acceleration is the second derivative (or the derivative of velocity). The particle is at rest when its velocity is zero, so we solve v(t) = 0 for t.
3.  26/3. || **Explanation:** The area is calculated by the definite integral of the function from x=1 to x=3. Area = ∫[1,3] x^2 dx = [x^3/3] from 1 to 3. Evaluating this gives (3^3/3) - (1^3/3) = 9 - 1/3 = 26/3.
4.  f'(x) = 16x(2x^2 + 3)^3. || **Explanation:** Use the chain rule, (f(g(x)))' = f'(g(x)) * g'(x). Let the outer function be u^4 and the inner function be u = 2x^2 + 3. The derivative of the outer function is 4u^3, and the derivative of the inner function is 4x. Multiplying them gives 4(2x^2 + 3)^3 * 4x = 16x(2x^2 + 3)^3.
5.  1. || **Explanation:** The definite integral of 1/x is ln|x|. Evaluating this from 1 to e gives ln(e) - ln(1). Since ln(e) = 1 and ln(1) = 0, the result is 1 - 0 = 1.
