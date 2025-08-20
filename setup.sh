#!/bin/bash

# SQL Test 3 - Setup Script
# This script helps setup and manage the SQL testing environment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_step() {
    echo -e "${BLUE}==== $1 ====${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker first."
        exit 1
    fi
    print_success "Docker is running"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    print_success "Node.js is installed ($(node --version))"
}

# Install dependencies
install_deps() {
    print_step "Installing Node.js dependencies"
    npm install
    print_success "Dependencies installed"
}

# Start services
start_services() {
    print_step "Starting Docker services"
    docker-compose up -d
    print_success "Services started"
    
    print_warning "Waiting for database to be ready (30 seconds)..."
    sleep 30
}

# Run tests
run_tests() {
    print_step "Running SQL tests"
    npm test
}

# Show status
show_status() {
    print_step "Service Status"
    docker-compose ps
    
    echo ""
    print_step "Access Information"
    echo -e "${GREEN}🌐 Adminer (Database UI): ${NC}http://localhost:8080"
    echo -e "${GREEN}🗄️  Database: ${NC}localhost:5432"
    echo -e "${GREEN}📊 Database Name: ${NC}employee_db"
    echo -e "${GREEN}👤 Username: ${NC}admin"
    echo -e "${GREEN}🔑 Password: ${NC}password123"
}

# Main script
main() {
    echo -e "${BLUE}"
    echo "  ____   ___  _       _____         _   _____ "
    echo " / ___| / _ \| |     |_   _|__  ___| |_|___ / "
    echo " \___ \| | | | |       | |/ _ \/ __| __| |_ \ "
    echo "  ___) | |_| | |___    | |  __/\__ \ |_ ___) |"
    echo " |____/ \___/|_____|   |_|\___||___/\__|____/ "
    echo ""
    echo -e "${NC}"
    echo "SQL Database Testing Project Setup"
    echo "=================================="
    
    check_docker
    check_node
    install_deps
    start_services
    run_tests
    show_status
    
    echo ""
    print_success "Setup completed successfully!"
    echo ""
    print_step "Next Steps:"
    echo "1. Visit http://localhost:8080 for database management"
    echo "2. Run 'npm test' to run tests again"
    echo "3. Run 'node validate.js' for validation tests"
    echo "4. Run 'npm run stop' to stop services"
}

# Handle script arguments
case "${1:-}" in
    "start")
        check_docker
        start_services
        show_status
        ;;
    "stop")
        print_step "Stopping services"
        docker-compose down
        print_success "Services stopped"
        ;;
    "reset")
        print_step "Resetting database"
        docker-compose down -v
        docker-compose up -d
        print_warning "Waiting for database to be ready (30 seconds)..."
        sleep 30
        print_success "Database reset completed"
        ;;
    "test")
        run_tests
        ;;
    "status")
        show_status
        ;;
    "help"|"-h"|"--help")
        echo "Usage: $0 [command]"
        echo ""
        echo "Commands:"
        echo "  start   - Start Docker services"
        echo "  stop    - Stop Docker services"
        echo "  reset   - Reset database (removes all data)"
        echo "  test    - Run SQL tests"
        echo "  status  - Show service status"
        echo "  help    - Show this help message"
        echo ""
        echo "If no command is provided, full setup will be performed."
        ;;
    *)
        main
        ;;
esac
