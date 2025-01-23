import { createContext, useEffect, useState } from "react";
import {Peer} from "peerjs";
import { useNavigate } from "react-router-dom";
const PeerContext = createContext(null);
export const PeerContextProvider = ({children})=>{
    const [peer, setPeer] = useState(null);
    const [userId, setuserId] = useState(null);
    const [connections, setConnections] = useState([]);
    const [remoteStream, setRemoteStream] = useState(null);
    const [callObject, setCallObject] = useState(null);
    const [openDialog, setOpenDialog] = useState(null);
    const navigate = useNavigate();
    function ConnectToServer(){
        const newPeer = new Peer();
        setPeer(newPeer);
        newPeer.on('open', (id)=>{
            console.log(id);
            setuserId(id);
        })
        newPeer.on('connection', (conn)=>{
            conn.on('data', (data)=>{
                console.log(data);
            })
            conn.on('open', ()=>{
                console.log(conn);
                console.log(conn.peer);
                setConnections([...connections, conn]);
            })
        })
        newPeer.on('call', (call) => {
            
            setCallObject(call);
            console.log("answering a call");
            navigator.mediaDevices.getUserMedia({
              video: true,
              audio: true
            })
            .then((stream) => {
              if(callObject){
                throw new Error("User is on other call");
              }
              call.answer(stream);
              call.on("stream", (remoteStream) => {
                console.log(remoteStream)
                console.log("Hey I am streaming!");
                navigate('/videocall');
                setRemoteStream(remoteStream);
                // Set the video source here
              });
            })
            .catch((err) => {
              console.log("failed to get remote stream:", err);
            });
          });
      }
    function MakeConnection(id){
        console.log(id);
        const new_connecton = peer.connect(id);
        console.log(new_connecton);
        new_connecton.on('open', ()=>{
            new_connecton.send('hi');
            console.log('connection opened', new_connecton)
            console.log('id', new_connecton.peer)
            setConnections([...connections, new_connecton]);
        })
        return;
    }
    function handleUserAction(action){
      return new Promise((resolve, reject)=>{
        if(action == 'answer'){
          navigator.mediaDevices.getUserMedia(
            {
              video : true,
              audio : true
            }
          )
          .then((stream)=>{
            resolve(stream);
          })
          .catch(()=>{
            reject(new Error('Not able to get user media'));
          })
        }else{
          reject(new Error("User rejected the call"));
        }
      })
    }
    function VideoCall(id) {
        console.log("calling video call");
        navigator.mediaDevices.getUserMedia({
          video: {facingMode : 'user'},
          audio: true
        })
        .then((stream) => {
          console.log(stream);
          const call = peer.call(id, stream);
          console.log("I have made the call");
          setCallObject(call);
          call.on('stream', (remoteStream) => {
            console.log("Hey I am streaming");
            console.log(remoteStream);
            // Set the video source here
            setRemoteStream(remoteStream);
          });
        })
        .catch((err) => {
          console.log("Failed to get local stream", err);
        });
      }
      function closeCall(localStreamComponent){
        if(localStreamComponent.current.srcObject){
            console.log("Stopping local stream: ")
            localStreamComponent.current.srcObject.getTracks().forEach(track => {
                track.stop();
            })
            localStreamComponent.current.srcObject = null;
        }
        if(callObject){
            callObject.close();
            console.log("Closing the call");
            setCallObject(null);
        }
        navigate('/start');
      }
    return(
        <PeerContext.Provider value={{userId, setuserId, peer, setPeer, connections, setConnections, ConnectToServer, MakeConnection, VideoCall, remoteStream, closeCall, callObject, setCallObject}}>
            {children}
        </PeerContext.Provider>
    )
}
export default PeerContext;