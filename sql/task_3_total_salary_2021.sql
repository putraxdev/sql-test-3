-- Task 3: Calculate total salary expenditure for year 2021
SELECT 
    SUM(salary) as total_salary_2021,
    COUNT(*) as active_employees_2021
FROM employees 
WHERE 
    join_date <= '2021-12-31' 
    AND (release_date IS NULL OR release_date > '2021-01-01');
