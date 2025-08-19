 import { LoginFormZod } from "./LoginFormZod";
import { LoginFormYup } from "./LoginFormYup";
import './App.css'

function App() {
 

  return (
    <>
    <div style={{ display: "flex", gap: "50px", padding: "20px" }}>
   <div>
    <h2>Yup Form</h2>
    <LoginFormYup/>
   </div>
   <hr></hr>
   <div>
   <h2>Zod Form</h2>
   <LoginFormZod/>
  </div>
  </div>
  </>
  )
}

export default App
