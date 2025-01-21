import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Start from "../Pages/Start";
import { Rotate3D } from "lucide-react";
import VideoCall from "../Pages/VideoCall";
function Routing(){
    return (
        <div className="h-full w-full">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/start" element={<Start/>}/>
                <Route path="/videocall" element={<VideoCall/>}/>
            </Routes>
        </div>
    )
}
export default Routing;