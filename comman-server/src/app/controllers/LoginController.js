const db = require("../../config/db");

class LoginController {
  access(req, res) {
    const { user_name, password } = req.body;

    db.query(
      `SELECT * FROM employee WHERE user_name = '${user_name}' and password = '${password}'`,
      (err, result) => {
        if (err || result.length == 0) {
          res.status(404).send({
            message: "Login Fail :((",
            err,
          });
          console.log(err || "Login Fail :((");
        } else {
          const user = result[0];
          res.status(200).send({
            message: "Login Successful",
            user,
          });
        }
      }
    );
  }
}

module.exports = new LoginController();
