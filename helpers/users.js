const inquirer = require("inquirer");
require("colors");

const addUser = async () => {
  let question = [
    {
      type: "input",
      name: "username",
      message: "Usuario:",
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor".red;
        }
        return true;
      },
    },
  ];

  const { username } = await inquirer.prompt(question);

  question = [
    {
      type: "input",
      name: "password",
      message: "Contraseña:",
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor".red;
        }
        return true;
      },
    },
  ];

  const { password } = await inquirer.prompt(question);
  return `${username}:${password}`;
};

const listUsers = (arr) => {
  console.clear();

  console.log("========================".cyan);
  console.log(" Listado de usuarios ".cyan);
  console.log("========================\n".cyan);

  for (let i = 0; i < arr.length; i++) {
    let username = arr[i].split(":")[0].toString();
    let password = arr[i].split(":")[1].toString();
    let spaces = "  ";
    for (let j = 0; j < (i + 1).toString().split("").length; j++) {
      spaces += " ";
    }
    if (i == 0) {
      console.log("************************".grey);
    }
    console.log(
      `${i + 1}. ` +
        "Usuario   : ".cyan +
        username +
        `\n${spaces}Contraseña: `.cyan +
        password
    );
    console.log("************************".grey);
  }

  console.log("");
  console.log("Total: ".bold + arr.length.toString().green);
};

const delUser = async (arr) => {
  const question = [
    {
      type: "input",
      name: "username",
      message: "Usuario:",
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor".red;
        }
        return true;
      },
    },
  ];

  const { username } = await inquirer.prompt(question);

  let idx = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].split(":")[0] === username) {
      idx = i;
      break;
    }
  }

  if (idx > -1) {
    delete arr[idx];
    arr = arr.filter((x) => x != null);
  }
  console.log(arr);

  return arr;
};

module.exports = {
  addUser,
  listUsers,
  delUser,
};
