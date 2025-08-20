-- Task 4: Display top 3 employees with most years of experience
SELECT 
    name,
    position,
    years_of_experience,
    salary
FROM employees 
ORDER BY years_of_experience DESC 
LIMIT 3;
