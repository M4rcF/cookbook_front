import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/index.tsx";
import { SnackbarProvider } from "./context/SnackbarContext.tsx";
import "./styles/global.scss";
import Home from "./pages/Home/index.tsx";
import About from "./pages/About/index.tsx";
import Contact from "./pages/Contact/index.tsx";
import New from "./pages/New/index.tsx";
import Search from "./pages/Search/index.tsx";
import RecipeList from "./pages/RecipeList/index.tsx";
import Faq from "./pages/Faq/index.tsx";
import Login from "./pages/Auth/login.tsx";
import Register from "./pages/Auth/register.tsx";

function App() {

  return (
    <Router>
      <SnackbarProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/new" element={<New />} />
            <Route path="/search" element={<Search />} />
            <Route path="/recipe_list" element={<RecipeList />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Layout>
      </SnackbarProvider>
    </Router>
  );
}

export default App;
