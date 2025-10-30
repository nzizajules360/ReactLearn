-- Migration script to populate database from JSON files
-- Run this after starting the server to migrate existing data

-- This file is for reference - the actual migration should be done through an API endpoint
-- or a Node.js script that reads the JSON files and inserts into the database

-- Example course insert:
-- INSERT INTO courses (title, description, category, level, duration, price, instructor, topics, learning_objectives, requirements, thumbnail)
-- VALUES ('IoT Fundamentals', '...', 'iot', 'Beginner', '6 weeks', 99.00, 'Dr. Sarah Chen', 
--         '["Sensor Networks", "Data Analytics"]', 
--         '["Understand IoT basics"]',
--         '{"prerequisites": [], "materials": []}',
--         'http://localhost:3001/uploads/thumbnail/course1.jpg');

-- Example lesson insert:
-- INSERT INTO lessons (course_id, title, description, duration, type, order_num, video_url, resources)
-- VALUES (1, 'Introduction to IoT', '...', '30 min', 'video', 1, 
--         'http://localhost:3001/uploads/video/lesson1.mp4',
--         '[{"id": 1, "name": "Slides", "type": "pdf", "url": "http://localhost:3001/uploads/pdf/slides1.pdf"}]');

-- Example community team insert:
-- INSERT INTO community_teams (name, category, members, active_projects, description)
-- VALUES ('IoT Innovators', 'IoT Development', 45, 12, 'Building next-gen IoT solutions');

-- Example community task insert:
-- INSERT INTO community_tasks (team_id, title, description, difficulty, points, time_estimate)
-- VALUES (1, 'Build a Temperature Monitor', '...', 'Beginner', 100, '2-3 hours');
