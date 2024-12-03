import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Redirection from "./component/account/Redirection";
import { RecoilRoot } from "recoil";
import LoadingSpinner from "./component/LoadingSpinner";
import DeleteRedirection from "./component/myPage/DeleteRedirection";
import ErrorPage from "./pages/errorPage";

function App() {
  return (
    <RecoilRoot>
      <LoadingSpinner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/users/kakao" element={<Redirection />} />
          <Route path="/users/deleteKakao" element={<DeleteRedirection />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
