DROP DATABASE IF EXISTS business;
CREATE DATABASE business;
USE business;


CREATE TABLE department (
    id INTEGER NOT NULL AUTO_INCREMENT,
    label VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE roles (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);



CREATE TABLE employee (
     id INTEGER AUTO_INCREMENT PRIMARY KEY,
     first_name VARCHAR(30) NOT NULL,
     last_name VARCHAR(30) NOT NULL,
     role_id INT NOT NULL,
     manager_id INT,
     FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
     FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
     );