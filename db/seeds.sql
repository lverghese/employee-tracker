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
  ('Ronald', 'Firbank', 1, null),
  ('Virginia', 'Woolf', 3, null),
  ('Piers', 'Gaveston', 4, null),
  ('Charles', 'LeRoi', 7, null),
  ('Katherine', 'Mansfield', 2, 4),
  ('Dora', 'Carrington', 2, 4),
  ('Edward', 'Bellamy', 5, 1),
  ('Montague', 'Summers', 5, 1),
  ('Octavia', 'Butler', 6, 3),
  ('Unica', 'Zurn', 8, null);