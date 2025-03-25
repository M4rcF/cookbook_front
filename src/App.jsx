import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index.tsx";
import About from "./pages/About/index.tsx";
import Contact from "./pages/Contact/index.tsx";
import New from "./pages/New/index.tsx";
import Search from "./pages/Search/index.tsx";
import RecipeList from "./pages/RecipeList/index.tsx";
import Faq from "./pages/Faq/index.tsx";
import Layout from "./components/Layout/index.tsx";
import "./styles/global.scss";

function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/new" element={<New />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recipe_list" element={<RecipeList />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
