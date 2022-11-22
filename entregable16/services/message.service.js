module.exports = class MessageService {
  constructor (dao) {
    this.dao = dao;
  }
  getMessages = () => {
    return this.dao.getAll();
  }
  saveMessage = (message) => {
    return this.dao.save(message);
  }
}