
import { AppContextProvider } from "./Context/AppContext";
import Routing from "./Routing/Routing";
function App(){
  return (
    <div>
      <AppContextProvider>
        <Routing/>
      </AppContextProvider>
    </div>
  )
}
export default App;