export default class UserInfo {
  constructor({ nameuser, description }) {
    this._nameuser = document.querySelector(nameuser);
    this._description = document.querySelector(description);
  }

  getUserInfo() {
    const userInfo = {
      nameuser: this._nameuser.textContent,
      description: this._description.textContent,
    }
    return userInfo
  }

  setUserInfo(data) {
    this._nameuser.textContent = data.nameuser;
    this._description.textContent = data.description;
  }
}