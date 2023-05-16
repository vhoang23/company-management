const db = require("../../config/db");

class EmployeeController {
  getAllEmployee(req, res) {
    const user = req.user;

    db.query(
      `SELECT * FROM employee
        INNER JOIN department
        ON employee.dep_id = department.dep_id
        ${
          !user?.dep_id
            ? ""
            : `WHERE employee.dep_id = ${user?.dep_id} AND employee.emp_id <> ${user?.emp_id}`
        }`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  }

  getEmployeeInfo(req, res) {
    const user = req.user;
    const { emp_id } = req.query;

    const promise = () => {
      return new Promise((resolve, reject) => {
        let sql = "";

        if (user?.role === "Director") {
          sql = `SELECT employee.*, department.dep_name FROM employee
          LEFT JOIN  department
          ON employee.dep_id = department.dep_id
          WHERE emp_id = ${emp_id}`;
        } else {
          sql = `SELECT employee.*, department.dep_name FROM employee
          LEFT JOIN  department
          ON employee.dep_id = department.dep_id
          WHERE emp_id = ${emp_id} and department.manager_id = ${user?.emp_id}`;
        }

        db.query(sql, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result[0]);
          }
        });
      });
    };

    promise()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  getAllManager(req, res) {
    const user = req.user;

    let sql = "";

    if (user?.role == "Director") {
      return;
    } else {
      sql = `SELECT * FROM employee
      LEFT JOIN department
      ON employee.dep_id = department.dep_id
      WHERE (employee.role = "Manager" or employee.dep_id is null) AND employee.emp_id <> ${user?.emp_id}`;
    }

    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  }

  postEmployee(req, res) {
    const {
      phone_num,
      emp_name,
      sex,
      role,
      user_name,
      password,
      salary,
      email,
      dep_id,
      birth_date,
      joining_date,
      about,
      degree,
      education,
      experience,
      address,
      citizen_identification,
    } = JSON.parse(req.body.userData);

    const user = req.user;

    const promise = () => {
      return new Promise((resolve, reject) => {
        const imgsrc =
          "http://127.0.0.1:5000/user_avatars/" + req.file?.filename;
        const query = `INSERT INTO employee (citizen_identification, emp_name, role, address, phone_num, birth_date, sex, salary, user_name, password, avatar, degree, email, joining_date, about, education, experience, dep_id)
       VALUES ('${citizen_identification}', '${emp_name}', '${role}', '${address}', '${phone_num}', '${birth_date}', ${sex}, ${salary}, '${user_name}', '${password}', '${imgsrc}', '${degree}', '${email}', '${joining_date}', '${about}', '${education}', '${experience}', '${dep_id}');`;

        db.query(query, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    };

    promise()
      .then((result) => {
        return new Promise((resolve, reject) => {
          if (role === "Manager") {
            const sql = `
              UPDATE department
                SET manager_id = ${result.insertId}
                WHERE dep_id = ${dep_id}`;
            db.query(sql, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          } else {
            resolve(result);
          }
        });
      })
      .then((result) => {
        res.status(200).send("Successfully!!!");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  }

  updateEmployee(req, res) {
    const {
      emp_id,
      phone_num,
      emp_name,
      sex,
      role,
      user_name,
      password,
      salary,
      email,
      dep_id,
      birth_date,
      joining_date,
      about,
      degree,
      education,
      experience,
      address,
      citizen_identification,
    } = JSON.parse(req.body.userData);

    const user = req.user;

    const promise = () => {
      return new Promise((resolve, reject) => {
        const imgsrc =
          "http://127.0.0.1:5000/user_avatars/" + req.file?.filename;

        const query = `
        UPDATE employee
          SET
            emp_name = '${emp_name}',
            role = '${role}',
            address = '${address}',
            phone_num = '${phone_num}',
            birth_date = '${birth_date}',
            sex = ${sex},
            salary = ${salary},
            user_name = '${user_name}',
            password = '${password}',
            ${req.file ? `avatar = '${imgsrc}',` : ""}
            degree = '${degree}',
            email = '${email}',
            joining_date = '${joining_date}',
            about = '${about}',
            education = '${education}',
            experience = '${experience}',
            dep_id = '${dep_id}'
          WHERE 
            emp_id = '${emp_id}';
            ${
              role === "Manager"
                ? `UPDATE department 
              SET 
                manager_id = ${emp_id}
              WHERE
                dep_id = ${dep_id}    
            `
                : ""
            }
             `;
        db.query(query, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    };

    promise()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  }

  getEmployeeByDepartment(req, res) {
    const user = req.user;

    const { dep_id } = req.query;

    db.query(
      `SELECT * FROM employee
        LEFT JOIN department
        ON employee.dep_id = department.dep_id
        ${
          !dep_id
            ? "WHERE employee.dep_id is null"
            : `WHERE employee.dep_id = ${dep_id}`
        }`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  }

  updatePersonalProfile(req, res) {
    const user = req.user;
    const { phone_num, password, email, birth_date, address } = JSON.parse(
      req.body.userData
    );

    const promise = () => {
      return new Promise((resolve, reject) => {
        const imgsrc =
          "http://127.0.0.1:5000/user_avatars/" + req.file?.filename;

        const query = `
        UPDATE employee
          SET
            address = '${address}',
            phone_num = '${phone_num}',
            birth_date = '${birth_date}',
            password = '${password}',
            ${req.file ? `avatar = '${imgsrc}',` : ""}
            email = '${email}'
          WHERE 
            emp_id = ${user?.emp_id}
             `;
        db.query(query, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    };

    promise()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  deleteEmployee(req, res) {
    const user = req.user;
    const { emp_id } = req.body;

    if (user?.role !== "Director" && user?.role !== "Manager") {
      return;
    }

    let sql = `
        DELETE FROM employee WHERE emp_id = ${emp_id} AND dep_id = ${user?.dep_id}
    `;

    if (user?.role === "Director") {
      sql = `DELETE FROM employee WHERE emp_id = ${emp_id}`;
    }

    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  }
}

module.exports = new EmployeeController();
