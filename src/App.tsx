import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Redirection from "./component/account/Redirection";
import { RecoilRoot } from "recoil";
import LoadingSpinner from "./component/LoadingSpinner";

function App() {
  return (
    <RecoilRoot>
      <LoadingSpinner/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/kakao" element={<Redirection />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
