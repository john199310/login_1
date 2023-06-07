import Signin from "./component/sign-in-side";
import Login from './component/log_in';
import Page from './component/page';
import Todo from "./component/Todo";
// import {
//   Routes,
//   Route,
//   Outlet,
//   Link,
//   useLocation,
//   useNavigate,
//   useParams,
// } from "react-router-dom";

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  // let location = useLocation();
  // let state = location.state as { backgroundLocation?: Location };
  return (


    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />}></Route>
          
         <Route path="Signin" element={<Signin />} />
          
         <Route path="Login" element={<Login />} />
         <Route path= "todo" element={<Todo />} />
         <Route path="*" element={<Page />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
