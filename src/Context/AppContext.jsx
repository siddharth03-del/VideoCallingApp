import combineContext from "../Utils/CombineContext";
import { PeerContextProvider } from "./PeerContext";
export const AppContextProvider = combineContext(PeerContextProvider);