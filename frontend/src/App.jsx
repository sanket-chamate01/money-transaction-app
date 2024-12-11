import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/SignUp"
import { Dashboard } from "./pages/Dashboard"
import { Signin } from "./pages/SignIn"
import { SendMoney } from "./pages/SendMoney"
import { UpdateProfile } from "./pages/UpdateInfo"

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/signin" element={<Signin></Signin>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/send" element={<SendMoney></SendMoney>}></Route>
          {/* <Route path="/updateProfile" element={<UpdateProfile></UpdateProfile>}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
