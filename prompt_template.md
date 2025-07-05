### Prompt for Generating Compatible Mock Exams

Please generate a mock exam on the topic of **`[Your Topic Here]`**. The exam must be structured in a specific Markdown format to be compatible with my parsing script.

The entire output must be a single block of Markdown text. Please ensure the final output can be saved as a `.md` file.

**Formatting Rules:**

1.  **Main Title:** The exam must begin with a level 1 heading for the title, like `# [Your Topic Here] Mock Exam`.

2.  **Question Sections:**
    *   The exam should have exactly 3 sections: Section A, Section B, and Section C.
    *   Each section header must be a level 2 heading with point values, like `## Section A: Multiple Choice (20 Marks)`.
    *   Each section must contain exactly 5 questions.
    *   **ALL questions must be multiple choice with exactly 4 options (a, b, c, d).**
    *   Each question must be numbered (e.g., `1.`, `2.`, `3.`, `4.`, `5.`).
    *   Multiple-choice options must be on new lines, starting with a letter and parenthesis followed by a space (e.g., `a) Option text`, `b) Option text`).

3.  **Answer Separator:**
    *   After all the questions and before the answers, there **must** be a `---` horizontal rule on its own line.

4.  **Answers and Explanations:**
    *   After the separator, there must be a level 1 heading for the answers: `# Answers`.
    *   The answers should be organized in sections matching the question sections (e.g., `## Section A`, `## Section B`, `## Section C`).
    *   Each answer **must** be on a single line and follow this exact format:
        `[Question Number].  [Correct Option Letter]) [Answer Text] || **Explanation:** [Detailed explanation of why this answer is correct]`

**Crucial Formatting Details:**

*   The `||` separator between the answer and the explanation is essential for the script to work.
*   The explanation must begin with `**Explanation:**` (including the bold markdown).
*   Each answer must start with the question number, followed by the correct option letter and closing parenthesis.
*   Ensure each section has exactly 5 questions and 5 corresponding answers.

---

### Example of the Required Format:

```markdown
# Biology Mock Exam

## Section A: Multiple Choice (20 Marks)

1.  Which of the following is the basic unit of life?
    a) Atom
    b) Cell
    c) Tissue
    d) Organ

2.  What is the process by which plants make their own food?
    a) Respiration
    b) Photosynthesis
    c) Digestion
    d) Absorption

## Section B: Multiple Choice (30 Marks)

1.  Which organelle is responsible for energy production in the cell?
    a) Nucleus
    b) Ribosome
    c) Mitochondria
    d) Golgi apparatus

## Section C: Multiple Choice (50 Marks)

1.  What is the scientific name for humans?
    a) Homo sapiens
    b) Homo erectus
    c) Homo habilis
    d) Homo neanderthalensis

---

# Answers

## Section A

1.  b) Cell || **Explanation:** The cell is the basic structural and functional unit of all living organisms. All life forms, from single-celled bacteria to complex multicellular organisms, are composed of cells.
2.  b) Photosynthesis || **Explanation:** Photosynthesis is the process by which plants convert light energy, usually from the sun, into chemical energy stored in glucose. This process uses carbon dioxide and water as raw materials.

## Section B

1.  c) Mitochondria || **Explanation:** Mitochondria are known as the "powerhouses" of the cell because they produce ATP (adenosine triphosphate), which is the primary energy currency of the cell through cellular respiration.

## Section C

1.  a) Homo sapiens || **Explanation:** Homo sapiens is the scientific name for modern humans. The binomial nomenclature system uses genus (Homo) and species (sapiens) to classify organisms.
```

**Important Notes:**
- Make sure all questions are genuinely multiple choice with 4 options each
- Ensure explanations are detailed and educational
- Keep the exact formatting structure shown above
- Each section should have exactly 5 questions
- Total of 15 questions per exam`
