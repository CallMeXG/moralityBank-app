"use strict";
import store from '../src/store/store';
  let objUser = localStorage.getItem("loginMsg")
if (objUser !== undefined && objUser !== null) {
  store.state.userData = JSON.parse(objUser)
}

export default {


}
