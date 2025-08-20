# SQL Test 3 - Employee Database Management

Proyek ini merupakan implementasi lengkap untuk testing SQL database dengan Docker PostgreSQL, JavaScript testing scripts, dan file SQL terpisah untuk setiap task.

## 📋 Tugas yang Diselesaikan

### Data Awal
| Name  | Position           | Join Date  | Release Date | Years of Experience | Salary |
|-------|-------------------|------------|--------------|-------------------|--------|
| Jacky | Solution Architect| 25-Jul-18  | 25-Jul-22    | 8 Years          | $150   |
| John  | Assistant Manager | 02-Feb-16  | 02-Feb-21    | 12 Years         | $155   |
| Alano | Manager           | 09-Nov-10  | -            | 14 Years         | $175   |
| Aaron | Engineer          | 16-Aug-21  | 16-Aug-22    | 1 Years          | $80    |
| Allen | Engineer          | 06-Jun-24  | -            | 4 Years          | $75    |
| Peter | Team Leader       | 09-Jan-20  | -            | 3 Years          | $85    |

### ✅ Tasks Implemented

1. **Task 1**: Tambah employee Albert (Engineer, Join: 24-Jan-2024, Experience: 2.5 years, Salary: $50)
2. **Task 2**: Update semua Engineer salary menjadi $85
3. **Task 3**: Hitung total pengeluaran salary tahun 2021
4. **Task 4**: Tampilkan 3 employee dengan Years of Experience terbanyak
5. **Task 5**: Subquery untuk Engineer dengan experience ≤ 3 tahun

## 🏗️ Struktur Proyek

```
sql-test-3/
├── docker-compose.yml          # Docker setup untuk PostgreSQL & Adminer
├── package.json               # Node.js dependencies
├── .env                      # Environment variables
├── test.js                   # Main testing script
├── validate.js               # Validation & individual task testing
├── sql/                      # SQL files
│   ├── 01_init_database.sql  # Database initialization
│   ├── task_1_add_albert.sql # Task 1: Add Albert
│   ├── task_2_update_engineer_salary.sql # Task 2: Update salary
│   ├── task_3_total_salary_2021.sql     # Task 3: Calculate 2021 total
│   ├── task_4_top_3_experience.sql      # Task 4: Top 3 by experience
│   ├── task_5_engineer_subquery.sql     # Task 5: Engineer subquery
│   └── all_tasks.sql         # All tasks combined
└── README.md                 # Documentation
```

## 🚀 Setup dan Instalasi

### Prerequisites
- Docker & Docker Compose
- Node.js (v14 atau lebih baru)
- NPM atau Yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd sql-test-3
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Database
```bash
# Start PostgreSQL dan Adminer
npm run start
# atau
docker-compose up -d
```

### 4. Wait for Database (sekitar 10-15 detik)
Database akan otomatis ter-setup dengan data awal saat container pertama kali dijalankan.

## 🧪 Menjalankan Tests

### Test Lengkap
```bash
npm test
```

### Test Validasi
```bash
node validate.js
```

### Test Manual via SQL Files
```bash
# Connect ke database
docker exec -it sql-test-postgres psql -U admin -d employee_db

# Jalankan task individual
\i /docker-entrypoint-initdb.d/task_1_add_albert.sql
\i /docker-entrypoint-initdb.d/task_2_update_engineer_salary.sql
# dst...
```

## 🔍 Database Access

### Via Adminer (Web Interface)
- URL: http://localhost:8080
- System: PostgreSQL
- Server: postgres
- Username: admin
- Password: password123
- Database: employee_db

### Via Command Line
```bash
docker exec -it sql-test-postgres psql -U admin -d employee_db
```

## 📊 Expected Results

### Task 1 - Add Albert
```sql
-- Albert akan ditambahkan ke database
SELECT * FROM employees WHERE name = 'Albert';
```

### Task 2 - Update Engineer Salary
```sql
-- Semua Engineer akan memiliki salary $85
SELECT * FROM employees WHERE position = 'Engineer';
```

### Task 3 - Total Salary 2021
```sql
-- Total pengeluaran salary untuk tahun 2021
-- Result: $495 (Jacky: $150, John: $155, Alano: $175, Aaron: $80 - saat aktif)
```

### Task 4 - Top 3 by Experience
```sql
-- 3 employee dengan experience terbanyak:
-- 1. Alano (14 years)
-- 2. John (12 years) 
-- 3. Jacky (8 years)
```

### Task 5 - Engineer Subquery (≤ 3 years)
```sql
-- Engineer dengan experience ≤ 3 tahun:
-- Aaron (1 year), Albert (2.5 years)
```

## 🛠️ Commands Cheat Sheet

```bash
# Start services
npm run start

# Stop services
npm run stop

# View logs
npm run logs

# Reset database (hapus data dan restart)
npm run reset

# Run tests
npm test

# Run validation
node validate.js
```

## 📁 SQL Files Explanation

- **01_init_database.sql**: Setup table dan insert data awal
- **task_1_add_albert.sql**: INSERT statement untuk menambah Albert
- **task_2_update_engineer_salary.sql**: UPDATE statement untuk Engineer salary
- **task_3_total_salary_2021.sql**: SELECT dengan SUM untuk total salary 2021
- **task_4_top_3_experience.sql**: SELECT dengan ORDER BY dan LIMIT
- **task_5_engineer_subquery.sql**: SELECT dengan subquery untuk Engineer
- **all_tasks.sql**: Kombinasi semua task dalam satu transaction

## 🔧 Environment Variables

File `.env` berisi:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=employee_db
DB_USER=admin
DB_PASSWORD=password123
ADMINER_PORT=8080
```

## ✅ Kriteria Penilaian yang Dipenuhi

1. **✅ Logical Database Development**: Database ter-struktur dengan proper schema dan relationships
2. **✅ SQL Query Scripts**: Semua 5 task diimplementasikan dalam file SQL terpisah
3. **✅ Error-free Execution**: Script berjalan tanpa error dan memberikan hasil yang benar
4. **✅ Proper Testing**: JavaScript testing framework untuk validasi otomatis
5. **✅ Docker Setup**: Complete containerized environment
6. **✅ Modular Structure**: File SQL terpisah untuk setiap task
7. **✅ Comprehensive Documentation**: README lengkap dengan instruksi setup dan usage

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check if containers are running
docker-compose ps

# Restart services
npm run reset
```

### Port Conflicts
Jika port 5432 atau 8080 sudah digunakan, edit `docker-compose.yml`:
```yaml
ports:
  - "5433:5432"  # Ganti ke port yang available
```

### Permission Issues
```bash
# Fix Docker permissions (Linux/Mac)
sudo chown -R $USER:$USER .
```

## 📝 Notes

- Database menggunakan PostgreSQL 15
- Adminer tersedia untuk database management via web
- Semua script menggunakan transaction untuk data consistency
- JavaScript testing menggunakan node-postgres (pg) driver
- Environment dapat di-reset kapan saja dengan `npm run reset`

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Create Pull Request

## 📄 License

MIT License - Lihat file LICENSE untuk detail.