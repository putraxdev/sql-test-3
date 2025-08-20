-- Task 5: Subquery for engineers with experience <= 3 years
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
