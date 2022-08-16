export default class UserInfo {
  constructor({ nameUserSelector, descriptionUserSelector, userAvatar }) {
    this._nameUserSelector = document.querySelector(nameUserSelector);
    this._descriptionUserSelector = document.querySelector(descriptionUserSelector);
    this._userAvatar = document.querySelector(userAvatar);
  }

  getUserInfo() {
    const userInfo = {
      nameUserSelector: this._nameUserSelector.textContent,
      descriptionUserSelector: this._descriptionUserSelector.textContent,
      userId: this._userId,
    }
    return userInfo
  }

  setUserInfo(evt) {
    this._nameUserSelector.textContent = evt.name;
    this._descriptionUserSelector.textContent = evt.about;
  }

  setUserAvatar(data) {
    this._userAvatar.src = data.avatar;
    this._userAvatar.alt = data.name;
  }
}