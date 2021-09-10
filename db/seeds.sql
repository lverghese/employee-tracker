INSERT INTO department (label)
VALUES  
    ('Engineering'),
    ('Finance'),
    ('Sales'),
    ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES 
    ('Lead Engineer', 150000, 1),
    ('Lawyer', 120000, 4),
    ('Sales Lead', 75000, 3),
    ('Sales Manager', 85000, 3),
    ('Software Engineer', 115000, 1),
    ('Sales Person', 50000, 3),
    ('Legal Team Lead', 140000, 4),
    ('Accountant', 110000, 2);
  

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 3, null),
  ('Virginia', 'Woolf', 5, null),
  ('Piers', 'Gaveston', 1, 2),
  ('Charles', 'LeRoi', 4, 2),
  ('Katherine', 'Mansfield', 5, null),
  ('Dora', 'Carrington', 6, null),
  ('Edward', 'Bellamy', 8, 3),
  ('Montague', 'Summers', 2, 6),
  ('Octavia', 'Butler', 7, 5),
  ('Unica', 'Zurn', 6, null);