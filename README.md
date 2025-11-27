# Zen Class Programme - Database Design (MongoDB) 🍃

This repository contains the **Database Design and Solution Queries** for the Zen Class Programme management system using **MongoDB**.

## 📂 Project Overview
The goal of this project is to design a NoSQL database schema to manage student learning progress, attendance, mentorship, and placement activities.

### 🗂 Database Schema (Collections)
The database `zen_class` consists of the following collections:
1. **users**: Stores student details and assigned mentors.
2. **codekata**: Tracks the number of problems solved by each user.
3. **attendance**: Manages daily attendance and task submission status.
4. **topics**: List of topics covered in the curriculum (e.g., HTML, CSS, React).
5. **tasks**: Daily tasks assigned based on topics.
6. **company_drives**: Details of placement drives and students who appeared.
7. **mentors**: Mentor details and their mentee counts.

## 🚀 Key Features & Queries Solved
The script includes advanced MongoDB queries using **Aggregation Pipelines** (`$lookup`, `$project`, `$match`) to solve the following scenarios:

- ✅ Find all topics and tasks taught in the month of **October**.
- ✅ Find company drives between **15-Oct-2020 and 31-Oct-2020**.
- ✅ Fetch company drives along with the **list of students** who appeared.
- ✅ Calculate the number of **problems solved** by each user in Codekata.
- ✅ Identify mentors with a **mentee count greater than 15**.
- ✅ Find the count of users who were **absent and did not submit tasks** during a specific period.

## 🛠 How to Run
1. Clone this repository or copy the script from `zen_class_task.js`.
2. Open **MongoDB Compass** or **Mongo Playground**.
3. Run the insertion scripts first to populate the data.
4. Execute the queries one by one to see the results.
