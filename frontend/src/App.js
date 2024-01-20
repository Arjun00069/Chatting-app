
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import  LoginSignup from './components/LoginSignup';
import {Toaster} from "react-hot-toast"
import ChatPage from "./pages/ChatPage";

function App() {
  



  return (
   <Router>
    <Routes>
      <Route path='/' element={<LoginSignup/>}/>
      <Route path='/chats' element={<ChatPage/>}/>

    </Routes>
    <Toaster/>
   </Router>
  );
}

export default App;
