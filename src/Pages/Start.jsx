import { useContext, useEffect, useState } from "react";
import ClipboardIcon from "../Components/Atoms/ClipboardIcon";
import CopyNotification from "../Components/Organisms/CopyNotification";
import { Input } from "@material-tailwind/react";
import PeerContext from "../Context/PeerContext";
import { useNavigate } from "react-router-dom";
function Start(){
    const [copied , setCopied] = useState(false);
    const {userId, setuserId, MakeConnection, connections, VideoCall} = useContext(PeerContext);
    const [inputId, setInputId] = useState('');
    const navigate = useNavigate();
    function CopyText(){
        navigator.clipboard.writeText(userId)
        setCopied(true);
    }
    function VideoCallHandler(id){
        navigate('/videocall');
        VideoCall(id)
    }
    useEffect(()=>{
        if(copied){
            setTimeout(()=>{
                setCopied(false);
            },2000)
        }
    },[copied])
    return (
        <>
        {
            copied && 
            <CopyNotification/>
        }
        <div className="border-2 border-gray-500 border-solid rounded-xl h-5/6 lg:w-5/12 md:w-8/12 w-11/12 mx-auto mt-10">
            <div className="border-2 py-4 mt-10  border-gray-200 border-solid rounded-xl">
                <h1 className="mx-auto h-fit w-fit">
                    P2P Video Calling App
                </h1>
            </div>
            <div className="border-2 border-gray-200 border-solid rounded-xl py-4 flex flex-row md:px-6 lg:px-6 px-6 mt-1">
                <h1 className="mx-auto h-fit w-fit text-sm md:text-base">
                    {`ID : ${userId}`}
                </h1>
                <button onClick={()=>{CopyText()}}>
                    <ClipboardIcon/>
                </button>
            </div>
            <div className="border-2  border-gray-200 border-solid rounded-xl py-6 flex flex-row ">
                <div className="w-3/5 ml-4">
                    <Input label="ID" className="" value={inputId} onChange={(e)=>{
                        setInputId(e.target.value)
                    }}/>
                </div>
                <div className="">
                    <button className="mt-[1px] h-fit w-fit border-[1px] border-black rounded-xl border-solid px-2 py-1 hover:text-blue-700 shadow-lg ml-4" onClick={()=>{MakeConnection(inputId)}}>
                        Connect
                    </button>
                </div>
            </div>
            <div className="border-2 border-gray-200 border-solid rounded-xl flex flex-col">
                <h1 className="font-bold lg:text-xl ml-3">
                    Connections
                </h1>
                <div className="ml-4 mt-5">
                    {
                        connections?.map((value)=>{
                            return (
                                <div key={value.peer} className="flex flex-row">
                                    <h1>{value.peer}</h1>
                                    <div>
                                        <button className="h-fit w-fit border-[1px] border-black rounded-xl border-solid px-2 py-1 hover:text-blue-700 shadow-lg ml-4" onClick={()=>{VideoCallHandler(value.peer)}}>
                                            VideoCall
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        </>
    )
}
export default Start;