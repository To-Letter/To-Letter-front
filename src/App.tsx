import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Redirection from "./component/account/Redirection";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
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
