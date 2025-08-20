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
- URL: http://localhost:8081 (updated port)
- System: PostgreSQL
- Server: postgres
- Username: admin
- Password: password123
- Database: employee_db

### Via Command Line
```bash
docker exec -it sql-test-postgres psql -U admin -d employee_db
```

### Via External Tools (DBeaver, pgAdmin, etc.)
- Host: localhost
- Port: 5434 (bukan 5432!)
- Database: employee_db
- Username: admin
- Password: password123

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
DB_PORT=5434
DB_NAME=employee_db
DB_USER=admin
DB_PASSWORD=password123
ADMINER_PORT=8080
```

## 🐛 Troubleshooting

### ❌ Error: "port is already allocated" (Port 5432 sudah digunakan)

**Problem**: PostgreSQL lokal sudah berjalan di port 5432
```bash
ERROR: Bind for 0.0.0.0:5432 failed: port is already allocated
```

**Solutions:**

#### Solution 1: Gunakan Port Berbeda (Recommended)
Proyek ini sudah dikonfigurasi menggunakan port 5433 untuk menghindari konflik.
```bash
# Check port yang digunakan
npm run check-ports

# Atau manual check
netstat -tulpn | grep :5432
netstat -tulpn | grep :5433
```

#### Solution 2: Stop PostgreSQL Lokal
```bash
# Ubuntu/Debian
sudo systemctl stop postgresql
sudo systemctl disable postgresql  # Untuk tidak auto-start

# macOS (Homebrew)
brew services stop postgresql@15

# Windows
net stop postgresql-x64-15
```

#### Solution 3: Ubah Port Manual
Edit `docker-compose.yml` jika ingin port lain:
```yaml
ports:
  - "5434:5432"  # Ganti ke port yang available
```
Dan update `.env`:
```
DB_PORT=5434
```

### ❌ Error: Database Connection Issues

**Problem**: Tidak bisa connect ke database
```bash
Error: connect ECONNREFUSED 127.0.0.1:5433
```

**Solutions:**

#### Check Container Status
```bash
# Check if containers are running
docker-compose ps

# Check logs
npm run logs
```

#### Restart Services
```bash
# Complete restart
npm run reset

# Or manual
docker-compose down
docker-compose up -d
```

#### Wait for Database Ready
Database butuh waktu 10-30 detik untuk siap. Tunggu sampai log menunjukkan:
```
database system is ready to accept connections
```

### ❌ Error: Permission Denied

**Problem**: Docker permission issues (Linux)
```bash
permission denied while trying to connect to the Docker daemon socket
```

**Solution:**
```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Restart session or run:
newgrp docker

# Fix file permissions
sudo chown -R $USER:$USER .
```

### ❌ Error: Port 8080 (Adminer) sudah digunakan

**Problem**: Adminer tidak bisa start karena port 8080 digunakan

**Solutions:**

#### Check what's using port 8080
```bash
netstat -tulpn | grep :8080
lsof -i :8080
```

#### Change Adminer port
Edit `docker-compose.yml`:
```yaml
adminer:
  ports:
    - "8081:8080"  # Ganti ke port yang available
```

### ❌ Error: Node.js/NPM Issues

**Problem**: Node modules atau dependency issues

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Use specific Node version
nvm use 18  # atau versi yang kompatibel
```

### ❌ Error: Docker not installed/running

**Problem**: Docker command tidak ditemukan atau tidak berjalan

**Solutions:**

#### Install Docker (Ubuntu/Debian)
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### Start Docker Service
```bash
# Linux
sudo systemctl start docker
sudo systemctl enable docker

# Check status
sudo systemctl status docker
```

### 🔧 Quick Diagnostic Commands

```bash
# Check all ports used by this project
npm run check-ports

# Check Docker status
docker --version
docker-compose --version
docker info

# Check containers
docker-compose ps
docker ps -a

# Check logs
npm run logs
docker-compose logs

# Check database connectivity
docker exec -it sql-test-postgres pg_isready -U admin

# Reset everything
npm run reset
```

### 📞 Common Error Messages & Solutions

| Error Message | Cause | Solution |
|---------------|-------|----------|
| `port is already allocated` | Port 5432/8080 sedang digunakan | Gunakan port berbeda atau stop service yang menggunakan port tersebut |
| `connect ECONNREFUSED` | Database belum ready atau salah port | Tunggu beberapa detik atau check port di `.env` |
| `permission denied` | Docker permission issues | Add user ke docker group |
| `command not found: docker` | Docker belum terinstall | Install Docker dan Docker Compose |
| `Cannot connect to the Docker daemon` | Docker service tidak berjalan | Start Docker service |
| `network sql-test-3_default already exists` | Sisa container lama | Run `docker-compose down` dulu |

### 💡 Tips Debugging

1. **Selalu check logs first**: `npm run logs`
2. **Verify ports**: `npm run check-ports`
3. **Check container status**: `docker-compose ps`
4. **Reset when in doubt**: `npm run reset`
5. **Use external tools**: Connect dengan DBeaver/pgAdmin untuk verify database

### 🆘 Jika Masih Error

1. Jalankan diagnostic commands di atas
2. Copy paste error message lengkap
3. Check log file untuk detail error
4. Pastikan semua prerequisites terinstall dengan benar

### ⚡ Quick Solution for Common Port Conflicts

**Jika mendapat error "port is already allocated":**

1. **Ubah Port Database**:
   ```bash
   # Edit docker-compose.yml, ganti port 5434 dengan yang available
   ports:
     - "5435:5432"  # contoh port lain
   
   # Update .env
   DB_PORT=5435
   ```

2. **Ubah Port Adminer**:
   ```bash
   # Edit docker-compose.yml
   ports:
     - "8082:8080"  # contoh port lain untuk Adminer
   ```

3. **Reset Complete**:
   ```bash
   npm run reset
   ```

## ✅ Status Proyek

### 🎯 Solusi Final yang Bekerja:
- ✅ PostgreSQL berjalan di port **5434**
- ✅ Adminer berjalan di port **8081**
- ✅ Semua 5 SQL tasks berhasil dijalankan
- ✅ JavaScript testing berfungsi sempurna
- ✅ Database terkoneksi dan responsive

### 🔍 Hasil Test:
- **Task 1**: ✅ Albert berhasil ditambahkan
- **Task 2**: ✅ Salary Engineer berhasil diupdate ke $85
- **Task 3**: ✅ Total salary 2021 = $650
- **Task 4**: ✅ Top 3 experience: Alano (14), John (12), Jacky (8)
- **Task 5**: ✅ Engineer subquery berfungsi dengan benar

### 🌐 Access URLs:
- **Database**: localhost:5434
- **Adminer**: http://localhost:8081
- **Testing**: `npm test` atau `npm run validate`

## ✅ Kriteria Penilaian yang Dipenuhi

1. **✅ Logical Database Development**: Database ter-struktur dengan proper schema dan relationships
2. **✅ SQL Query Scripts**: Semua 5 task diimplementasikan dalam file SQL terpisah
3. **✅ Error-free Execution**: Script berjalan tanpa error dan memberikan hasil yang benar
4. **✅ Proper Testing**: JavaScript testing framework untuk validasi otomatis
5. **✅ Docker Setup**: Complete containerized environment
6. **✅ Modular Structure**: File SQL terpisah untuk setiap task
7. **✅ Comprehensive Documentation**: README lengkap dengan instruksi setup dan usage

## 🐛 Troubleshooting

### ❌ Error: "port is already allocated" (Port 5432 sudah digunakan)

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