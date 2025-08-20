-- All tasks combined for testing
BEGIN;

-- Show initial state
SELECT 'Initial Data:' as status;
SELECT * FROM employees ORDER BY id;

-- Task 1: Add Albert
INSERT INTO employees (name, position, join_date, release_date, years_of_experience, salary) 
VALUES ('Albert', 'Engineer', '2024-01-24', NULL, 2.5, 50);

SELECT 'After adding Albert:' as status;
SELECT * FROM employees WHERE name = 'Albert';

-- Task 2: Update Engineer salary
UPDATE employees 
SET salary = 85 
WHERE position = 'Engineer';

SELECT 'Engineers after salary update:' as status;
SELECT * FROM employees WHERE position = 'Engineer' ORDER BY name;

-- Task 3: Total salary for 2021
SELECT 'Total salary expenditure for 2021:' as status;
SELECT 
    SUM(salary) as total_salary_2021,
    COUNT(*) as active_employees_2021
FROM employees 
WHERE 
    join_date <= '2021-12-31' 
    AND (release_date IS NULL OR release_date > '2021-01-01');

-- Task 4: Top 3 by experience
SELECT 'Top 3 employees by experience:' as status;
SELECT 
    name,
    position,
    years_of_experience,
    salary
FROM employees 
ORDER BY years_of_experience DESC 
LIMIT 3;

-- Task 5: Engineers with <= 3 years experience (subquery)
SELECT 'Engineers with <= 3 years experience (subquery):' as status;
SELECT 
    name,
    position,
    years_of_experience,
    salary,
    join_date
FROM employees 
WHERE id IN (
    SELECT id 
    FROM employees 
    WHERE position = 'Engineer' 
    AND years_of_experience <= 3
)
ORDER BY years_of_experience;

COMMIT;
