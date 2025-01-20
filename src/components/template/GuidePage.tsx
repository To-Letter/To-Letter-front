import Slide from "../organisms/guide/Slide";
import CSRGuidePage from "./CSRGuidePage";
import "@/style/guide-loading.css";

const GuidePage = () => {
  return (
    <div>
      <Slide />
      <CSRGuidePage />
    </div>
  );
};

export default GuidePage;
