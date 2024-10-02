import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Redirection from "./component/account/Redirection";
import { MenuProvider } from "./context/MenuContext";

function App() {
  return (
    <MenuProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/kakao" element={<Redirection />} />
        </Routes>
      </BrowserRouter>
    </MenuProvider>
  );
}

export default App;
