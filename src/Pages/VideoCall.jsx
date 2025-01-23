import { useContext, useEffect, useRef, useState } from "react";
import PeerContext from "../Context/PeerContext";
import PhoneHangupIcon from "../Components/Atoms/PhoneHangupIcon";
function VideoCall(){
    const {remoteStream, closeCall, callObject, setCallObject} = useContext(PeerContext);
    const localStream = useRef(null);
    const remoteVideo = useRef(null);
    useEffect(()=>{
        const getMedia = async()=>{
            try{
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video : {facingMode : 'user'},
                    audio : true
                })
                localStream.current.srcObject = mediaStream;
            }catch(err){
                console.log("Error getting media stream: " + err);
            }
        }
        getMedia();
    })
    useEffect(()=>{
        if(remoteStream){
            remoteVideo.current.srcObject = remoteStream;
        }
    },[remoteStream])
    useEffect(()=>{
        if(callObject){
            callObject.on('close', ()=>{
                closeCall(localStream);
            })
        }
    })
    return(
        <div className="w-screen h-screen">
            <div className="flex flex-col md:flex-row h-5/6 w-full">
                <div className="flex flex-col h-1/2 md:h-full md:w-full">
                    <div className="mx-auto h-1/5">
                        <h1 className="py-2 px-2">
                            Local Stream
                        </h1>
                    </div>
                    <div className="mx-auto h-4/5">
                        <video ref={localStream} autoPlay playsInline className="h-full w-4/5 mx-auto">
                        </video>
                    </div>
                </div>
                <div className="flex flex-col h-1/2 md:h-full md:w-full">
                    <div className="mx-auto h-1/5">
                        <h1 className="py-2 px-2 ">
                            Remote Stream
                        </h1>
                    </div>
                    <div className="mx-auto h-4/5">
                        <video  ref={remoteVideo} autoPlay playsInline className="h-full w-4/5 mx-auto"></video>
                    </div>
                </div>
            </div>
            <div className="h-1/6">
                <div className="border-0 rounded-xl bg-red-600 w-fit h-fit px-8 py-2 hover:cursor-pointer hover:bg-red-900 mx-auto" onClick={()=>{closeCall(localStream)}}>
                    <PhoneHangupIcon/>
                </div>
            </div>
        </div>
    )
}
export default VideoCall;