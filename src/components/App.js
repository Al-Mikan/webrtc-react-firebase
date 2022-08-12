import React from 'react';
import InputFormLocal from "./InputFormLocal"
import InputFormRemote from "./InputFormRemote"
import { useState } from "react";


const getMedia = async()=> {
  const constraints = {audio: true, video:true};

  try {
    return await navigator.mediaDevices.getUserMedia(constraints);
    /* ストリームを使用 */
  } catch(err) {
    /* エラーを処理 */
    console.log(err)
  }
}
getMedia();
const App = () => {
  const [localPeerName,setlocalPeerName]= useState('');
  const [remotePeerName,setremotePeerName]= useState('');

  return(
    <>
      <InputFormLocal
      localPeerName={localPeerName}
      setlocalPeerName={setlocalPeerName}
      />
      <InputFormRemote
      remotePeerName={remotePeerName}
      setremotePeerName={setremotePeerName}
      />
    </>

  );
}

export default App;
