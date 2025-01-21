import { useContext, useEffect, useRef } from "react";
import PeerContext from "../Context/PeerContext";
function VideoCall(){
    const {remoteStream} = useContext(PeerContext);
    const localStream = useRef(null);
    const remoteVideo = useRef(null);
    useEffect(()=>{
        const getMedia = async()=>{
            try{
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video : {facingMode : 'user'},
                    audio : true
                });
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
    return(
        <div className="flex flex-col">
            <div className="flex flex-col">
                <div className="mt-2">
                    <h1 className="py-2 px-2">
                        Local Stream
                    </h1>
                </div>
                <div>
                    <video ref={localStream} autoPlay playsInline className="h-[200px] w-[200px]">
                    </video>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="mt-2">
                    <h1 className="py-2 px-2">
                        Remote Stream
                    </h1>
                </div>
                <div>
                    <video  ref={remoteVideo} autoPlay playsInline className="h-[200px] w-[200px]"></video>
                </div>
            </div>
        </div>
    )
}
export default VideoCall;