const { executeSQL, pool } = require('./test.js');

// Individual task functions for modular testing
async function testTask1() {
    console.log('🧪 Testing Task 1: Adding Albert');
    const result = await executeSQL(
        "INSERT INTO employees (name, position, join_date, release_date, years_of_experience, salary) VALUES ('Albert', 'Engineer', '2024-01-24', NULL, 2.5, 50) RETURNING *",
        'Task 1: Add Albert'
    );
    return result.rows[0];
}

async function testTask2() {
    console.log('🧪 Testing Task 2: Update Engineer Salaries');
    const result = await executeSQL(
        "UPDATE employees SET salary = 85 WHERE position = 'Engineer' RETURNING *",
        'Task 2: Update Engineer Salaries'
    );
    return result.rows;
}

async function testTask3() {
    console.log('🧪 Testing Task 3: Calculate 2021 Salary Total');
    const result = await executeSQL(
        `SELECT 
            SUM(salary) as total_salary_2021,
            COUNT(*) as active_employees_2021
        FROM employees 
        WHERE 
            join_date <= '2021-12-31' 
            AND (release_date IS NULL OR release_date > '2021-01-01')`,
        'Task 3: 2021 Salary Calculation'
    );
    return result.rows[0];
}

async function testTask4() {
    console.log('🧪 Testing Task 4: Top 3 by Experience');
    const result = await executeSQL(
        `SELECT 
            name,
            position,
            years_of_experience,
            salary
        FROM employees 
        ORDER BY years_of_experience DESC 
        LIMIT 3`,
        'Task 4: Top 3 by Experience'
    );
    return result.rows;
}

async function testTask5() {
    console.log('🧪 Testing Task 5: Engineer Subquery');
    const result = await executeSQL(
        `SELECT 
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
        ORDER BY years_of_experience`,
        'Task 5: Engineer Subquery'
    );
    return result.rows;
}

// Validation functions
function validateTask1(result) {
    const checks = [
        { test: result.name === 'Albert', message: 'Name should be Albert' },
        { test: result.position === 'Engineer', message: 'Position should be Engineer' },
        { test: parseFloat(result.years_of_experience) === 2.5, message: 'Experience should be 2.5 years' },
        { test: result.salary === 50, message: 'Salary should be $50' }
    ];
    
    return checks.every(check => {
        if (!check.test) {
            console.error(`❌ ${check.message}`);
            return false;
        }
        return true;
    });
}

function validateTask2(results) {
    const allEngineersHave85 = results.every(emp => emp.salary === 85);
    if (!allEngineersHave85) {
        console.error('❌ Not all engineers have salary of $85');
        return false;
    }
    return true;
}

function validateTask3(result) {
    if (!result.total_salary_2021 || result.total_salary_2021 <= 0) {
        console.error('❌ Total salary should be greater than 0');
        return false;
    }
    return true;
}

function validateTask4(results) {
    if (results.length !== 3) {
        console.error('❌ Should return exactly 3 employees');
        return false;
    }
    
    // Check if sorted by experience descending
    for (let i = 0; i < results.length - 1; i++) {
        const currentExp = parseFloat(results[i].years_of_experience);
        const nextExp = parseFloat(results[i + 1].years_of_experience);
        if (currentExp < nextExp) {
            console.error('❌ Results should be sorted by experience descending');
            console.error(`Current: ${currentExp}, Next: ${nextExp}`);
            return false;
        }
    }
    return true;
}

function validateTask5(results) {
    const allEngineers = results.every(emp => emp.position === 'Engineer');
    const allLowExperience = results.every(emp => parseFloat(emp.years_of_experience) <= 3);
    
    if (!allEngineers) {
        console.error('❌ All results should be Engineers');
        return false;
    }
    
    if (!allLowExperience) {
        console.error('❌ All results should have ≤ 3 years experience');
        return false;
    }
    
    return true;
}

// Main validation test
async function runValidationTests() {
    try {
        console.log('\n🔬 Running Validation Tests');
        console.log('=' .repeat(50));
        
        let allPassed = true;
        
        // Reset database to initial state for clean testing
        await executeSQL('DELETE FROM employees WHERE name = \'Albert\'', 'Cleanup: Remove Albert if exists');
        await executeSQL('UPDATE employees SET salary = CASE WHEN position = \'Engineer\' THEN 80 ELSE salary END WHERE position = \'Engineer\'', 'Reset Engineer salaries');
        
        // Test Task 1
        console.log('\n1️⃣ Validating Task 1...');
        const task1Result = await testTask1();
        if (validateTask1(task1Result)) {
            console.log('✅ Task 1 validation passed');
        } else {
            console.log('❌ Task 1 validation failed');
            allPassed = false;
        }
        
        // Test Task 2
        console.log('\n2️⃣ Validating Task 2...');
        const task2Results = await testTask2();
        if (validateTask2(task2Results)) {
            console.log('✅ Task 2 validation passed');
        } else {
            console.log('❌ Task 2 validation failed');
            allPassed = false;
        }
        
        // Test Task 3
        console.log('\n3️⃣ Validating Task 3...');
        const task3Result = await testTask3();
        if (validateTask3(task3Result)) {
            console.log('✅ Task 3 validation passed');
            console.log(`💰 Total 2021 salary: $${task3Result.total_salary_2021}`);
        } else {
            console.log('❌ Task 3 validation failed');
            allPassed = false;
        }
        
        // Test Task 4
        console.log('\n4️⃣ Validating Task 4...');
        const task4Results = await testTask4();
        if (validateTask4(task4Results)) {
            console.log('✅ Task 4 validation passed');
        } else {
            console.log('❌ Task 4 validation failed');
            allPassed = false;
        }
        
        // Test Task 5
        console.log('\n5️⃣ Validating Task 5...');
        const task5Results = await testTask5();
        if (validateTask5(task5Results)) {
            console.log('✅ Task 5 validation passed');
        } else {
            console.log('❌ Task 5 validation failed');
            allPassed = false;
        }
        
        console.log('\n🏁 Validation Summary');
        console.log('=' .repeat(50));
        if (allPassed) {
            console.log('🎉 All validation tests PASSED!');
        } else {
            console.log('❌ Some validation tests FAILED!');
        }
        
    } catch (error) {
        console.error('❌ Validation test execution failed:', error.message);
    } finally {
        await pool.end();
    }
}

if (require.main === module) {
    runValidationTests();
}
