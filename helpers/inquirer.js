const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: "1",
        name: "1. Agregar usuario",
      },
      {
        value: "2",
        name: "2. Listar usuarios",
      },
      {
        value: "3",
        name: "3. Eliminar usuario",
      },
      {
        value: "4",
        name: "4. Iniciar Broker",
      },
      {
        value: "5",
        name: "5. Salir",
      },
    ],
  },
];

const homeMenu = async () => {
  console.clear();

  console.log("========================".cyan);
  console.log(" Seleccione una opción ".cyan);
  console.log("========================\n".cyan);

  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
};

const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"Enter".red} para continuar..`,
    },
  ];

  console.log("\n");
  await inquirer.prompt(question);
};

module.exports = {
  homeMenu,
  pausa,
};
