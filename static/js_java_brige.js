


//js端发送配置好的Wi-Fi信息给android端
function js_to_java_sendWifiMsg(sendValue){
  androidApp.sendMsgToDevice(sendValue);
}

function java_to_js_successSendMsgToDevice(status) {
  java_sendSuccess_to_js()
}


//js端，获取Wi-Fi列表,调用Android方法
function js_to_java_gainWifiList() {
  androidApp.gainWifiList();
}


function java_to_jsWifiList(value) {
  wifiListFromAndroid = value
}
