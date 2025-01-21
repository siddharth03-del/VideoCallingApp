import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PeerContext from "../Context/PeerContext";
import {LucideLoader2} from 'lucide-react';
function Home(){
    const navigate = useNavigate();
    const {ConnectToServer, userId} = useContext(PeerContext)
    const [entering, setEntering] = useState(false);
    function StartHandler(){
        setEntering(true);
        ConnectToServer();
    }
    useEffect(()=>{
        if(userId){
            setEntering(false)
            navigate('/start')
        }
    },[userId])
    return(
        <div>
            <div className=" mx-auto bg-white shadow-2xl w-10/12 border-2 h-[100px] rounded-2xl mt-10 border-solid border-black">
                <div className="">
                    <h1 className="px-2 py-1">
                        P2P Video Calling App
                    </h1>
                </div>
                <div className="flex flex-row">
                    <button className="text-black flex flex-row font-bold mt-4 ml-8 border-[1px] px-2 rounded-xl hover:shadow-2xl hover:shadow-black bg-gray-200 py-1 border-solid  border-black" onClick={()=>{StartHandler()}}>
                    {entering &&
                        <LucideLoader2 className="animate-spin"/>
                    }Start
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Home