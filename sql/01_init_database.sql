-- Create employees table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    join_date DATE NOT NULL,
    release_date DATE,
    years_of_experience DECIMAL(3,1) NOT NULL,
    salary INTEGER NOT NULL
);

-- Insert initial data
INSERT INTO employees (name, position, join_date, release_date, years_of_experience, salary) VALUES
('Jacky', 'Solution Architect', '2018-07-25', '2022-07-25', 8.0, 150),
('John', 'Assistant Manager', '2016-02-02', '2021-02-02', 12.0, 155),
('Alano', 'Manager', '2010-11-09', NULL, 14.0, 175),
('Aaron', 'Engineer', '2021-08-16', '2022-08-16', 1.0, 80),
('Allen', 'Engineer', '2024-06-06', NULL, 4.0, 75),
('Peter', 'Team Leader', '2020-01-09', NULL, 3.0, 85);

-- Display initial data
SELECT * FROM employees ORDER BY id;
