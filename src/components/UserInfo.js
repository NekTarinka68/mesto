export default class UserInfo {
  constructor({ nameUserSelector, descriptionUserSelector }) {
    this._nameUserSelector = document.querySelector(nameUserSelector);
    this._descriptionUserSelector = document.querySelector(descriptionUserSelector);
  }

  getUserInfo() {
    const userInfo = {
      nameUserSelector: this._nameUserSelector.textContent,
      descriptionUserSelector: this._descriptionUserSelector.textContent,
    }
    return userInfo
  }

  setUserInfo(data) {
    this._nameUserSelector.textContent = data.nameuser;
    this._descriptionUserSelector.textContent = data.description;
  }
}