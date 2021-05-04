require("colors");
const mosca = require("mosca");

const { homeMenu, pausa } = require("./helpers/inquirer");
const { addUser, listUsers, delUser } = require("./helpers/users");
const { addConfig } = require("./helpers/broker");

let users = [];
let broker;

const main = async () => {
  console.clear();
  let opt = "";

  do {
    opt = await homeMenu();
    switch (opt) {
      case "1":
        //Crear
        const add = await addUser();
        users.push(add);
        break;
      case "2":
        //Listar
        listUsers(users);
        break;
      case "3":
        //Eliminar
        const del = await delUser(users);
        users = del;
        break;
      case "4":
        //Broker
        const config = await addConfig();
        await startBroker(config);
        break;
    }
    if (opt !== "5") await pausa();
  } while (opt !== "5");

  if (broker) {
    broker.close();
  }

  console.clear();
  console.log("========================".cyan);
  console.log(" ¡Hasta luego! ".cyan);
  console.log("========================\n".cyan);
};

const startBroker = async (config) => {
  if (broker) {
    broker.close();
  }

  broker = new mosca.Server(config);

  broker.on("ready", async () => {
    console.clear();
    console.log("========================".cyan);
    console.log(" Broker Listo ".cyan);
    console.log("========================\n".cyan);

    console.log("Host: " + config.host.toString().green);
    console.log("Port: " + config.port.toString().green);
    console.log("Http: " + config.http.port.toString().green);

    await pausa();
  });

  broker.authenticate = (client, username, password, callback) => {
    let valid = false;

    if (users.length === 0) {
      valid = true;
      client.user = username;
    } else {
      for (let i = 0; i < users.length; i++) {
        if (
          users[i].split(":")[0] === username &&
          users[i].split(":")[1] === password.toString("ascii")
        ) {
          valid = true;
          client.user = username;
        }
      }
    }
    callback(null, valid);
  };

  broker.on("subscribed", (topic, client) => {
    const msg = {
      topic,
      payload: `Ingreso => ${client.id} | ${client.user}`,
      qos: 0,
      retain: false,
    };
    broker.publish(msg);
  });

  broker.on("unsubscribed", (topic, client) => {
    const msg = {
      topic,
      payload: `Salida => ${client.id} | ${client.user}`,
      qos: 0,
      retain: false,
    };
    broker.publish(msg);
  });
};

main();
