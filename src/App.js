import{ BrowserRouter as Router,Routes,Route,Link} from "react-router-dom"
import EmpList  from "./EmpList.js";
import EmpForm from "./EmpForm.js";
import EmpEdit from "./EmpEdit.js";
import EmpDetails from "./EmpDetails.js";

function App(){
    return(
        <div>
    <Router>
<Routes>
    <Route path="/" element={<EmpList/>}></Route>
    <Route path="/form" element={<EmpForm/>}></Route>
    <Route path="/empedit/:empid" element={<EmpEdit/>}></Route>
    <Route path="/empdetails/:empid" element={<EmpDetails/>}></Route>
</Routes>
    </Router>
        </div>
    )
}
export default App;