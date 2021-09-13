Insert into departments(department_name)
Values 
('Engineering'),
('Sales'),
('Finance'),
('Accounts'),
('Machine Learning');

Insert into roles (job_title, department_id,salary)
Values 
('CEO', 1, 100000.0),
('HR', 2, 2300.999),
('Software Engineer',3, 5000.00),
('Marketing Manager',4, 3200.00),
('Finance Manager',5, 2900.00);

Insert into employees(first_name,last_name,role_id,manager_name)
Values
('Mehak', 'Zehra', 1, 'Abbas Rizvi'),
('Heidi', 'Lee', 2, 'Mary Tsang'),
('Jacob', 'Bratsman',3, 'Dayne Brats'),
('Nora', 'Fitz', 4, 'Andrew Grauer'),
('Eve', 'Hee', 5, 'Josh Tyler');