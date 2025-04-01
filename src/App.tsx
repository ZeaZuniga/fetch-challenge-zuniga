import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import NotFound from "./pages/NotFound/NotFound";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loginpage from "./pages/LoginPage/Loginpage";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route index path="/" element={<Loginpage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
