import Home from './Home.js';
import Signup from './Components/Auth/SignUp.js'
import Login from './Components/Auth/Login.js'
import ForgotPassword from "./Components/Auth/ForgotPassword.js";
import { useSelector } from "react-redux";
import ForgotUsername from './Components/Auth/ForgotUsername.js';

function App() {

  const openLoginTab = useSelector(state => state.mainSlice.showLoginTab)
  const showRegistrationTab = useSelector(state => state.mainSlice.showRegisterTab)
  const showForgotPasswordTab = useSelector(state => state.mainSlice.showForgotPasswordTab)
  const showForgotUsernameModal = useSelector(state => state.mainSlice.showForgotUsernameTab)

  return (
    <div>
      {showForgotUsernameModal && <ForgotUsername />}
      {openLoginTab && <Login />}
      {showRegistrationTab && <Signup />}
      {showForgotPasswordTab && <ForgotPassword />}
      <Home />
    </div>
  )
}

export default App;
