const contacts = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allUsers = await contacts.listContacts();
      console.table(allUsers);
      break;
      
    case "get":
        const oneUser = await contacts.getContactById(id);
        console.log(oneUser);
        break;
      
    case "add":
        const newUser = await contacts.addContact(name, email, phone);
        console.log(newUser);
        break;

    case "remove":
        const deletedUser = await contacts.removeContact(id);
        console.log(deletedUser);
        break;
    
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);