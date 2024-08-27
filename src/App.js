import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./Pages/Home/Home";
import DreamList from "./Pages/DreamList/DreamList";
import DreamFavourites from "./Pages/DreamFavourites/DreamFavourites";
import DreamGenerate from "./Pages/DreamGenerate/DreamGenerate";
import NavBottom from "./Components/Navigations/NavBottom/NavBottom";
import NavTop from "./Components/Navigations/NavTop/NavTop";
import AppBg from "./Components/AppBg/AppBg";
import Login from "./Pages/Login/Login";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import BuyCredits from "./Pages/BuyCredits/BuyCredits";
import Profile from "./Pages/Profile/Profile";
import SuccessPage from "./Pages/SuccessPage/SuccesPage";

function App() {
  const [loading, setLoading] = useState(false); // Starea pentru loading

  return (
    <div className="App">
      <BrowserRouter>
        <NavTop></NavTop>
        <AppBg></AppBg>
        <Routes>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/list"
            element={<PrivateRoute element={<DreamList />} />}
          ></Route>
          <Route
            path="/favourites"
            element={<PrivateRoute element={<DreamFavourites />} />}
          ></Route>
          <Route
            path="/buy-credits"
            element={<PrivateRoute element={<BuyCredits />} />}
          ></Route>
          <Route
            path="/profile"
            element={<PrivateRoute element={<Profile />} />}
          ></Route>
          <Route
            path="/generate"
            element={
              <PrivateRoute
                element={
                  <DreamGenerate setLoading={setLoading} loading={loading} />
                }
              />
            }
          ></Route>
          <Route
            path="/success"
            element={<PrivateRoute element={<SuccessPage />} />}
          />
        </Routes>
        <NavBottom disableNav={loading} /> {/* Transmiterea stării loading */}
      </BrowserRouter>
    </div>
  );
}

export default App;
