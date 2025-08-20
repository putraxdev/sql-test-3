const fs = require('fs');
const path = require('path');

// Demo script to show SQL queries without running database
function displaySQLQueries() {
    console.log('\n🎯 SQL Test 3 - Query Overview');
    console.log('=' .repeat(60));
    
    const sqlFiles = [
        { file: 'task_1_add_albert.sql', title: 'Task 1: Add Albert as Engineer' },
        { file: 'task_2_update_engineer_salary.sql', title: 'Task 2: Update Engineer Salaries' },
        { file: 'task_3_total_salary_2021.sql', title: 'Task 3: Calculate 2021 Total Salary' },
        { file: 'task_4_top_3_experience.sql', title: 'Task 4: Top 3 by Experience' },
        { file: 'task_5_engineer_subquery.sql', title: 'Task 5: Engineer Subquery (≤ 3 years)' }
    ];
    
    sqlFiles.forEach((item, index) => {
        try {
            const filePath = path.join(__dirname, 'sql', item.file);
            const content = fs.readFileSync(filePath, 'utf8');
            
            console.log(`\n${index + 1}️⃣ ${item.title}`);
            console.log('-' .repeat(50));
            console.log(content.trim());
        } catch (error) {
            console.error(`❌ Error reading ${item.file}:`, error.message);
        }
    });
    
    console.log('\n🏁 Setup Instructions:');
    console.log('-' .repeat(50));
    console.log('1. Run: npm install');
    console.log('2. Run: ./setup.sh (or npm run start)');
    console.log('3. Run: npm test');
    console.log('4. Visit: http://localhost:8080 (Adminer)');
    console.log('\n💡 Use ./setup.sh help for more options');
}

if (require.main === module) {
    displaySQLQueries();
}

module.exports = { displaySQLQueries };
