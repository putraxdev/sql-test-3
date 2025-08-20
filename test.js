const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Database configuration
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'employee_db',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'password123',
});

// Helper function to read SQL files
function readSQLFile(filename) {
    const filePath = path.join(__dirname, 'sql', filename);
    return fs.readFileSync(filePath, 'utf8');
}

// Helper function to execute SQL and return results
async function executeSQL(query, description) {
    try {
        console.log(`\n🔍 ${description}`);
        console.log('=' .repeat(50));
        
        const result = await pool.query(query);
        
        if (result.rows && result.rows.length > 0) {
            console.table(result.rows);
        } else {
            console.log(`✅ Query executed successfully. Rows affected: ${result.rowCount || 0}`);
        }
        
        return result;
    } catch (error) {
        console.error(`❌ Error in ${description}:`, error.message);
        throw error;
    }
}

// Wait for database to be ready
async function waitForDatabase(maxRetries = 30) {
    console.log('⏳ Waiting for database to be ready...');
    
    for (let i = 0; i < maxRetries; i++) {
        try {
            await pool.query('SELECT 1');
            console.log('✅ Database is ready!');
            return;
        } catch (error) {
            console.log(`⏳ Attempt ${i + 1}/${maxRetries}: Database not ready yet...`);
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
    
    throw new Error('❌ Database failed to become ready after maximum retries');
}

// Main test function
async function runTests() {
    try {
        await waitForDatabase();
        
        console.log('\n🚀 Starting SQL Tests');
        console.log('=' .repeat(60));
        
        // Show initial state
        await executeSQL(
            'SELECT * FROM employees ORDER BY id',
            'Initial Employee Data'
        );
        
        // Task 1: Add Albert
        console.log('\n📝 TASK 1: Adding Albert as Engineer');
        const task1SQL = readSQLFile('task_1_add_albert.sql');
        await executeSQL(task1SQL, 'Adding Albert');
        
        // Verify Albert was added
        await executeSQL(
            "SELECT * FROM employees WHERE name = 'Albert'",
            'Verify Albert was added'
        );
        
        // Task 2: Update Engineer salaries
        console.log('\n📝 TASK 2: Update Engineer Salaries to $85');
        const task2SQL = readSQLFile('task_2_update_engineer_salary.sql');
        await executeSQL(task2SQL, 'Updating Engineer Salaries');
        
        // Verify salary updates
        await executeSQL(
            "SELECT * FROM employees WHERE position = 'Engineer' ORDER BY name",
            'Verify Engineer Salary Updates'
        );
        
        // Task 3: Total salary for 2021
        console.log('\n📝 TASK 3: Calculate Total Salary Expenditure for 2021');
        const task3SQL = readSQLFile('task_3_total_salary_2021.sql');
        await executeSQL(task3SQL, 'Total Salary for 2021');
        
        // Task 4: Top 3 by experience
        console.log('\n📝 TASK 4: Top 3 Employees by Experience');
        const task4SQL = readSQLFile('task_4_top_3_experience.sql');
        await executeSQL(task4SQL, 'Top 3 by Experience');
        
        // Task 5: Engineers with <= 3 years experience (subquery)
        console.log('\n📝 TASK 5: Engineers with ≤ 3 Years Experience (Subquery)');
        const task5SQL = readSQLFile('task_5_engineer_subquery.sql');
        await executeSQL(task5SQL, 'Engineers with ≤ 3 Years Experience');
        
        // Final state
        console.log('\n📊 FINAL STATE: All Employees');
        await executeSQL(
            'SELECT * FROM employees ORDER BY years_of_experience DESC',
            'Final Employee Data (sorted by experience)'
        );
        
        console.log('\n🎉 All tests completed successfully!');
        console.log('=' .repeat(60));
        
    } catch (error) {
        console.error('❌ Test execution failed:', error.message);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

// Run the tests
if (require.main === module) {
    runTests();
}

module.exports = {
    pool,
    executeSQL,
    readSQLFile,
    runTests
};
