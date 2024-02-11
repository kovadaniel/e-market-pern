import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import './styles/App.css';
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./context";
import { check } from "./http/userAPI";
import Loader from "./components/Loader";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = observer(() => {
  const { store: { user } } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setIsLoading(false);
      return;
    };

    check().then(data => {
        user.setUser(data);
        user.setIsAuth(true);
    }).finally(() => {
      setIsLoading(false);
    }).catch((e) =>
      console.log("error with auth checking:", e.response?.data.message))
  }, []);
 
  if (isLoading) return <Loader full/>
  
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <AppRouter/>  
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
})

export default App;
