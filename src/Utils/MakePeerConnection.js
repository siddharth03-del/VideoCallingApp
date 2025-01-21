import PeerContext from "../Context/PeerContext";
import { useContext } from "react";
export function MakeConnection(id){
    const {connections, setConnections, peer} = useContext(PeerContext);
    const new_connecton = peer.connect(id);
    new_connecton.on('open', ()=>{
        new_connecton.send('hi');
        console.log('connection opened', new_connecton)
        setConnections([...connections, new_connecton]);
    })
    return;
}