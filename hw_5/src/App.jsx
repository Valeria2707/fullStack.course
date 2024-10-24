import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Heroes from "./pages/Heroes/Heroes";
import About from "./pages/About/About";
import Hero from "./pages/Hero/Hero";
import Page404 from "./pages/Page404/Page404";
import { useTheme } from "./context/ThemeContext";
import { StyledAppContainer, StyledAppContent } from "./AppStyles";

function App() {
  const { mode } = useTheme();
  return (
    <Router>
      <StyledAppContainer mode={mode}>
        <Navbar />
        <StyledAppContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/heroes" element={<Heroes />} />
            <Route path="/heroes/:id" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </StyledAppContent>
      </StyledAppContainer>
    </Router>
  );
}

export default App;
