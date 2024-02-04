import { Router, Route } from "@solidjs/router";
import { Component } from "solid-js";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
const App: Component = () => {
    return (
        <Router>
            <Route path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/blog" component={Blog} />
        </Router>
    );
};

export default App;
