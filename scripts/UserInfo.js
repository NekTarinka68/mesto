import {nameInput, infoInput} from "./index.js";

export default class UserInfo {
  constructor(nameProfile, descriptionProfile) {
    this._nameProfile = nameProfile;
    this._descriptionProfile = descriptionProfile;
  }

  getUserInfo() {
    this._userInfo = {
      inputName: this._nameProfile.textContent,
      inputInfo: this._descriptionProfile.textContent,
    }
    return this._userInfo
  }

  setUserInfo() {
    this._nameProfile.textContent = nameInput.value;
    this._descriptionProfile.textContent = infoInput.value;
  }
}