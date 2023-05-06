const fs = require("fs/promises")
const path = require("path")
const { nanoid } = require("nanoid")

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
    const dbContacts = await fs.readFile(contactsPath);
    return JSON.parse(dbContacts);
  }

  async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(user => user.id === contactId);
    return contact|| null
  }
    
  async function removeContact(contactId) {
    const contacts = await listContacts();
    const selectedContact = contacts.findIndex(user => user.id === contactId);
    if(selectedContact === -1){
        return null;
    }
    const removeUser = contacts.splice(selectedContact, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removeUser;
  }
  
  async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContacts = {
        id: nanoid(),
        name,
        email,
        phone
    }
    contacts.push(newContacts);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContacts;
  }

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  }