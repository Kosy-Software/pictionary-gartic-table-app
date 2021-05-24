(()=>{"use strict";(()=>{function e(e,t){let s=document.querySelector("#viewing").content.firstElementChild.cloneNode(!0),i=s.querySelector("iframe");if(i.style.height="100vh",i.style.width="100vw",i.src=`${e.gameRoomUrl}`,e.currentClient.clientUuid==e.initializer.clientUuid){let e=s.querySelector("#dialog");e.style.display="flex",e.querySelector("button").onclick=t=>{e.style.display="none"}}return s}function t(e){return e&&e.match("https://([w.-]+.)?gartic.io")}function s(e,s){let i=document.querySelector("#picking").content.cloneNode(!0),n=i.querySelector("input"),a=i.querySelector("#start-game");document.querySelector("#viewing").hidden=!0;let o=i.querySelector("#error");return n.oninput=e=>{const s=n.value;n.classList.remove("invalid"),n.classList.remove("valid"),a.classList.remove("valid"),t(s)?(a.removeAttribute("disabled"),o.innerHTML="",o.style.marginBottom="0",o.style.marginTop="0",n.style.color="black",a.classList.add("valid"),n.classList.add("valid")):(o.innerHTML="This is an invalid game room url",o.style.marginBottom="16px",o.style.marginTop="5px",a.setAttribute("disabled","disabled"),n.classList.add("invalid"),n.style.color="red")},a.onclick=e=>{let t=n.value;s({type:"game-room-url-changed",payload:t})},i}function i(e,t){let s=document.querySelector("#waiting").content.firstElementChild.cloneNode(!0);return s.querySelector("h3").innerHTML=`${e.initializer.clientName} is setting up a game`,s}class n{constructor(e){this.kosyClient=window.parent,this.latestMessageNumber=0,this.kosyApp=e}startApp(){return this.initialInfoPromise=new Promise(((e,t)=>{window.addEventListener("message",(t=>{let s=t.data;switch(s.type){case"receive-initial-info":e(s.payload),this.latestMessageNumber=s.latestMessageNumber;break;case"client-has-joined":this.kosyApp.onClientHasJoined(s.clientInfo);break;case"client-has-left":this.kosyApp.onClientHasLeft(s.clientUuid);break;case"get-app-state":const t=this.kosyApp.onRequestState();this._sendMessageToKosy({type:"receive-app-state",state:t,clientUuids:s.clientUuids,latestMessageNumber:this.latestMessageNumber});break;case"set-app-state":this.kosyApp.onProvideState(s.state),this.latestMessageNumber=s.latestMessageNumber;break;case"receive-message-as-host":this._handleReceiveMessageAsHost(s);break;case"receive-message-as-client":this._handleReceiveMessageAsClient(s)}})),this._sendMessageToKosy({type:"ready-and-listening"})})),this.initialInfoPromise}stopApp(){this._sendMessageToKosy({type:"stop-app"})}relayMessage(e){this._sendMessageToKosy({type:"relay-message-to-host",message:e})}_sendMessageToKosy(e){this.kosyClient.postMessage(e,"*")}_handleReceiveMessageAsClientRecursive(e,t,s){this.latestMessageNumber===e.messageNumber-(t.currentClientUuid===e.sentByClientUuid?0:1)?(this.kosyApp.onReceiveMessageAsClient(e.message),this.latestMessageNumber=e.messageNumber):s<50&&this.latestMessageNumber<e.messageNumber&&setTimeout((()=>this._handleReceiveMessageAsClientRecursive(e,t,s+1)),100)}_handleReceiveMessageAsClient(e){this.initialInfoPromise.then((t=>{this._handleReceiveMessageAsClientRecursive(e,t,0)}))}_handleReceiveMessageAsHost(e){this.initialInfoPromise.then((t=>{const s=this.kosyApp.onReceiveMessageAsHost(e.message);s&&this._sendMessageToKosy({type:"relay-message-to-clients",sentByClientUuid:t.currentClientUuid,message:s,messageNumber:++this.latestMessageNumber})}))}}var a;!function(a){var o;(function(a){class o{constructor(){this.state={gameRoomUrl:null},this.kosyApi=new n({onClientHasJoined:e=>this.onClientHasJoined(e),onClientHasLeft:e=>this.onClientHasLeft(e),onReceiveMessageAsClient:e=>this.processMessage(e),onReceiveMessageAsHost:e=>e,onRequestState:()=>this.getState(),onProvideState:e=>this.setState(e)})}start(){var e,t,s,i,n;return t=this,s=void 0,n=function*(){let t=yield this.kosyApi.startApp();this.initializer=t.clients[t.initializerClientUuid],this.currentClient=t.clients[t.currentClientUuid],this.state=null!==(e=t.currentAppState)&&void 0!==e?e:this.state,this.renderComponent(),window.addEventListener("message",(e=>{this.processComponentMessage(e.data)}))},new((i=void 0)||(i=Promise))((function(e,a){function o(e){try{l(n.next(e))}catch(e){a(e)}}function r(e){try{l(n.throw(e))}catch(e){a(e)}}function l(t){var s;t.done?e(t.value):(s=t.value,s instanceof i?s:new i((function(e){e(s)}))).then(o,r)}l((n=n.apply(t,s||[])).next())}))}setState(e){this.state=e,this.renderComponent()}getState(){return this.state}onClientHasJoined(e){}onClientHasLeft(e){}processMessage(e){switch(e.type){case"receive-game-room-url":t(e.payload)&&(this.state.gameRoomUrl=`${e.payload}`,this.renderComponent())}}processComponentMessage(e){switch(e.type){case"game-room-url-changed":this.kosyApi.relayMessage({type:"receive-game-room-url",payload:e.payload})}}renderComponent(){!function(t,n){let a,o=document.getElementById("root");a=(null==t?void 0:t.gameRoomUrl)?e:t.currentClient.clientUuid==t.initializer.clientUuid?s:i;var r=o.cloneNode(!1);o.parentNode.replaceChild(r,o),r.appendChild(a(t,n))}({gameRoomUrl:this.state.gameRoomUrl,currentClient:this.currentClient,initializer:this.initializer},(e=>this.processComponentMessage(e)))}log(...e){var t,s;console.log(`${null!==(s=null===(t=this.currentClient)||void 0===t?void 0:t.clientName)&&void 0!==s?s:"New user"} logged: `,...e)}}a.App=o,(new o).start()})((o=a.Integration||(a.Integration={})).Gartic||(o.Gartic={}))}(a||(a={}))})()})();