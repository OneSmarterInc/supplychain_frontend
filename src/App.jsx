import { ToastContainer } from "react-toastify";
import MainRoutes from "./Routes/MainRoutes";

function App() {
  return (
    <div className="bg-white h-full ">
      <MainRoutes />
      <ToastContainer
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
