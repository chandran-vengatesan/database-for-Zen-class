// ------------------------------------------
// Part 1: Database Design & Data Insertion
// ------------------------------------------

// 1. Users Collection
db.users.insertMany([
  { "_id": 1, "name": "Chandran", "email": "chandran@gmail.com", "mentor_id": 1 },
  { "_id": 2, "name": "Jasmin", "email": "jasmin@gmail.com", "mentor_id": 1 },
  { "_id": 3, "name": "Danny", "email": "danny@gmail.com", "mentor_id": 2 },
  { "_id": 4, "name": "Arun", "email": "arun@gmail.com", "mentor_id": 2 },
  { "_id": 5, "name": "Bobby", "email": "bobby@gmail.com", "mentor_id": 1 }
]);

// 2. Codekata Collection
db.codekata.insertMany([
  { "user_id": 1, "problems_solved": 50 },
  { "user_id": 2, "problems_solved": 85 },
  { "user_id": 3, "problems_solved": 20 },
  { "user_id": 4, "problems_solved": 100 },
  { "user_id": 5, "problems_solved": 5 }
]);

// 3. Mentors Collection
db.mentors.insertMany([
  { "_id": 1, "name": "Rupan", "mentee_count": 20 },
  { "_id": 2, "name": "jack", "mentee_count": 10 }
]);

// 4. Topics Collection
db.topics.insertMany([
  { "_id": 1, "topic_name": "HTML", "topic_date": ISODate("2020-10-01") },
  { "_id": 2, "topic_name": "CSS", "topic_date": ISODate("2020-10-10") },
  { "_id": 3, "topic_name": "Javascript", "topic_date": ISODate("2020-10-15") },
  { "_id": 4, "topic_name": "React", "topic_date": ISODate("2020-10-20") },
  { "_id": 5, "topic_name": "NodeJs", "topic_date": ISODate("2020-10-25") }
]);

// 5. Tasks Collection
db.tasks.insertMany([
  { "_id": 1, "topic_id": 1, "name": "HTML Page", "date": ISODate("2020-10-01") },
  { "_id": 2, "topic_id": 3, "name": "JS Logic", "date": ISODate("2020-10-15") },
  { "_id": 3, "topic_id": 4, "name": "React Hooks", "date": ISODate("2020-10-20") },
  { "_id": 4, "topic_id": 5, "name": "Node API", "date": ISODate("2020-10-25") }
]);

// 6. Company Drives Collection
db.company_drives.insertMany([
  { "company_name": "Google", "date": ISODate("2020-10-05"), "students_appeared": [1, 2, 3] },
  { "company_name": "Amazon", "date": ISODate("2020-10-20"), "students_appeared": [2, 3, 4] },
  { "company_name": "Tesla", "date": ISODate("2020-10-28"), "students_appeared": [1, 5] },
  { "company_name": "Tcs", "date": ISODate("2020-11-10"), "students_appeared": [1, 2] }
]);

// 7. Attendance Collection
db.attendance.insertMany([
  { "user_id": 1, "date": ISODate("2020-10-15"), "present": true, "task_submitted": true },
  { "user_id": 2, "date": ISODate("2020-10-15"), "present": false, "task_submitted": false },
  { "user_id": 1, "date": ISODate("2020-10-20"), "present": true, "task_submitted": false },
  { "user_id": 5, "date": ISODate("2020-10-20"), "present": false, "task_submitted": false }
]);


// ------------------------------------------
// Part 2: Solution Queries
// ------------------------------------------

// 1. Find all the topics and tasks which are thought in the month of October
db.topics.find({
    topic_date: { $gte: ISODate("2020-10-01"), $lt: ISODate("2020-11-01") }
});

db.tasks.find({
    date: { $gte: ISODate("2020-10-01"), $lt: ISODate("2020-11-01") }
});

// 2. Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020
db.company_drives.find({
    date: { $gte: ISODate("2020-10-15"), $lte: ISODate("2020-10-31") }
});

// 3. Find all the company drives and students who are appeared for the placement
db.company_drives.aggregate([
    {
        $lookup: {
            from: "users",
            localField: "students_appeared",
            foreignField: "_id",
            as: "student_details"
        }
    },
    {
        $project: {
            company_name: 1,
            date: 1,
            "student_details.name": 1,
            "student_details.email": 1
        }
    }
]);

// 4. Find the number of problems solved by the user in codekata
db.codekata.aggregate([
    {
        $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user_info"
        }
    },
    {
        $project: {
            "user_info.name": 1,
            problems_solved: 1
        }
    }
]);

// 5. Find all the mentors with who has the mentee's count more than 15
db.mentors.find({
    mentee_count: { $gt: 15 }
});

// 6. Find the number of users who are absent and task is not submitted between 15 oct-2020 and 31-oct-2020
db.attendance.find({
    date: { $gte: ISODate("2020-10-15"), $lte: ISODate("2020-10-31") },
    present: false,
    task_submitted: false
});