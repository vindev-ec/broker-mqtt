const inquirer = require("inquirer");
require("colors");

const defaultPort = 1883;
const defaultPortHttp = 9001;

const addConfig = async () => {
  let question = [
    {
      type: "input",
      name: "host",
      message: "Host:",
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor".red;
        }
        return true;
      },
    },
  ];

  const { host } = await inquirer.prompt(question);

  question = [
    {
      type: "input",
      name: "port",
      message: "Puerto (Default => " + defaultPort.toString().red + "):",
    },
  ];

  const { port } = await inquirer.prompt(question);

  question = [
    {
      type: "input",
      name: "portHttp",
      message:
        "Puerto Http (Default => " + defaultPortHttp.toString().red + "):",
    },
  ];

  const { portHttp } = await inquirer.prompt(question);

  const config = {
    port: parseInt(port === "" ? defaultPort : port),
    host,
    http: {
      port: parseInt(portHttp === "" ? defaultPortHttp : portHttp),
    },
  };

  return config;
};

module.exports = {
  addConfig,
};
