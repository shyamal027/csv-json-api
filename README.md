# csv-json-api
# CSV to JSON Converter API (Node.js + PostgreSQL)

This project is a backend API built using **Node.js**, **Express**, and **PostgreSQL**. It reads a CSV file, converts each row into a deeply nested JSON object, and inserts the data into a PostgreSQL table. It also calculates and prints the age-group distribution of the inserted users.

---

## 📦 Tech Stack

- Node.js (Express)
- PostgreSQL
- Custom CSV Parser (no external parsing libraries)
- dotenv for config management

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/csv-json-api.git
cd csv-json-api
