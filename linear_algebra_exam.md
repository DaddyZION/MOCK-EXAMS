# Linear Algebra Mock Exam

## Section A: Multiple Choice (20 Marks)

1.  Which of the following is NOT a vector space?
    a) The set of all 2x2 matrices with real entries.
    b) The set of all polynomials of degree at most 3.
    c) The set of all integers.
    d) The set of all continuous functions on the interval [0, 1].

2.  What is the determinant of the matrix [[2, 1], [4, 3]]?
    a) 2
    b) 10
    c) -2
    d) 6

3.  A linear mapping T: V -> W is a function such that for all u, v in V and all scalars c:
    a) T(u + v) = T(u) + T(v) and T(cu) = cT(u)
    b) T(u + v) = T(u) * T(v) and T(cu) = cT(u)
    c) T(u + v) = T(u) + T(v) and T(cu) = T(u)
    d) T(u + v) = T(u) + T(v) and T(cu) = c + T(u)

4.  What is the result of the multiplication of a matrix A by its inverse A^-1?
    a) The zero matrix
    b) The identity matrix
    c) A
    d) A^2

5.  An eigenvector of a square matrix A is a non-zero vector v such that Av = λv for some scalar λ. What is λ called?
    a) Eigenvalue
    b) Eigenvector
    c) Determinant
    d) Eigenspace

## Section B: Multiple Choice (30 Marks)

1.  What are the three properties that a set V must satisfy to be a vector space?
    a) Closure under addition, closure under scalar multiplication, and the existence of a zero vector
    b) Closure under multiplication, associativity, and commutativity
    c) Linear independence, spanning property, and finite dimension
    d) Orthogonality, normalization, and completeness

2.  Solve the following system of linear equations using Gaussian elimination: x + y = 5, 2x - y = 1
    a) x = 2, y = 3
    b) x = 3, y = 2
    c) x = 1, y = 4
    d) x = 4, y = 1

3.  What are the eigenvalues of the matrix [[1, 2], [2, 1]]?
    a) 3 and -1
    b) 1 and 2
    c) 2 and 0
    d) 4 and -2

4.  What is the definition of a complex number?
    a) A number that can be expressed in the form a + bi, where a and b are real numbers and i is the imaginary unit
    b) A number that is greater than zero
    c) A number that has both real and rational parts
    d) A number that cannot be expressed as a fraction

5.  What is Cramer's Rule used for?
    a) Solving systems of linear equations
    b) Finding eigenvalues of matrices
    c) Computing determinants
    d) Performing matrix multiplication

## Section C: Multiple Choice (50 Marks)

1.  What is the inverse of the matrix [[1, 2, 3], [0, 1, 4], [5, 6, 0]]?
    a) [[-24, 18, 5], [20, -15, -4], [-5, 4, 1]]
    b) [[1, -2, 3], [0, 1, -4], [-5, 6, 0]]
    c) [[0, 6, 5], [20, -15, -4], [-5, 4, 1]]
    d) [[1, 0, 0], [0, 1, 0], [0, 0, 1]]

2.  Let T: R^2 -> R^2 be a linear transformation such that T(1, 0) = (2, 3) and T(0, 1) = (4, 5). What is T(x, y)?
    a) (2x + 4y, 3x + 5y)
    b) (x + 2y, 3x + y)
    c) (2x + 3y, 4x + 5y)
    d) (x + y, 2x + 3y)

3.  What is a basis for the vector space spanned by the vectors (1, 2, 3), (4, 5, 6), and (7, 8, 9)?
    a) {(1, 2, 3), (4, 5, 6)}
    b) {(1, 2, 3), (4, 5, 6), (7, 8, 9)}
    c) {(1, 0, 0), (0, 1, 0), (0, 0, 1)}
    d) {(1, 1, 1), (2, 2, 2)}

4.  Which property is NOT required for a set to be a vector space?
    a) Closure under addition
    b) Existence of additive inverse
    c) Closure under matrix multiplication
    d) Distributive property of scalar multiplication

5.  What are the eigenvectors of the matrix [[1, 2], [2, 1]]?
    a) (1, 1) and (1, -1)
    b) (1, 0) and (0, 1)
    c) (2, 1) and (1, 2)
    d) (1, 2) and (2, 1)

---

# Answers

## Section A

1.  c) The set of all integers. || **Explanation:** The set of all integers is not a vector space because it lacks closure under scalar multiplication. For example, multiplying the integer 1 by the scalar 0.5 gives 0.5, which is not an integer.
2.  a) 2 || **Explanation:** The determinant of a 2x2 matrix [[a, b], [c, d]] is calculated as ad - bc. For [[2, 1], [4, 3]], it's (2)(3) - (1)(4) = 6 - 4 = 2.
3.  a) T(u + v) = T(u) + T(v) and T(cu) = cT(u) || **Explanation:** A linear mapping must satisfy two properties: additivity (the function of a sum equals the sum of functions) and homogeneity (the function of a scalar multiple equals the scalar multiple of the function).
4.  b) The identity matrix || **Explanation:** By definition, the inverse of a matrix A is the matrix A^(-1) such that A × A^(-1) = I, where I is the identity matrix. The identity matrix has 1's on the diagonal and 0's elsewhere.
5.  a) Eigenvalue || **Explanation:** In the equation Av = λv, where A is a matrix and v is a non-zero vector, λ (lambda) is called the eigenvalue. It represents the scaling factor by which the eigenvector v is stretched or compressed.

## Section B

1.  a) Closure under addition, closure under scalar multiplication, and the existence of a zero vector || **Explanation:** These are three of the fundamental properties that define a vector space. A set must be closed under addition and scalar multiplication, and must contain a zero vector that acts as the additive identity.
2.  a) x = 2, y = 3 || **Explanation:** Using Gaussian elimination: From x + y = 5 and 2x - y = 1, we can add the equations to get 3x = 6, so x = 2. Substituting back: 2 + y = 5, so y = 3.
3.  a) 3 and -1 || **Explanation:** To find eigenvalues, solve det(A - λI) = 0. For [[1, 2], [2, 1]], this gives det([[1-λ, 2], [2, 1-λ]]) = (1-λ)² - 4 = λ² - 2λ - 3 = 0, which factors as (λ-3)(λ+1) = 0.
4.  a) A number that can be expressed in the form a + bi, where a and b are real numbers and i is the imaginary unit || **Explanation:** Complex numbers extend the real number system by including the imaginary unit i, where i² = -1. Every complex number can be written as a + bi where a is the real part and b is the imaginary part.
5.  a) Solving systems of linear equations || **Explanation:** Cramer's Rule provides a method for solving systems of linear equations using determinants. It states that if the system has a unique solution, each variable equals a ratio of determinants.

## Section C

1.  a) [[-24, 18, 5], [20, -15, -4], [-5, 4, 1]] || **Explanation:** To find the inverse of a 3x3 matrix, we use the formula A^(-1) = (1/det(A)) × adj(A), where adj(A) is the adjugate matrix. This involves calculating cofactors and transposing the cofactor matrix.
2.  a) (2x + 4y, 3x + 5y) || **Explanation:** A linear transformation is determined by where it sends the basis vectors. Since T(1,0) = (2,3) and T(0,1) = (4,5), we have T(x,y) = xT(1,0) + yT(0,1) = x(2,3) + y(4,5) = (2x + 4y, 3x + 5y).
3.  a) {(1, 2, 3), (4, 5, 6)} || **Explanation:** The vector (7, 8, 9) = 2(4, 5, 6) - (1, 2, 3), so it's linearly dependent on the first two vectors. The first two vectors are linearly independent, so they form a basis for the span.
4.  c) Closure under matrix multiplication || **Explanation:** Vector spaces require closure under addition and scalar multiplication, but not under matrix multiplication. Matrix multiplication is not even defined for all vectors in a general vector space.
5.  a) (1, 1) and (1, -1) || **Explanation:** For eigenvalue λ = 3: (A - 3I)v = 0 gives [[-2, 2], [2, -2]]v = 0, so v = (1, 1). For eigenvalue λ = -1: (A + I)v = 0 gives [[2, 2], [2, 2]]v = 0, so v = (1, -1).
