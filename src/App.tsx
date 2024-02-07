import { Router, Route } from "@solidjs/router";
import { Component } from "solid-js";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/blog/Blog";
import PostViewer from "./pages/blog/PostViewer";
const App: Component = () => {
    return (
        <Router>
            <Route path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/blog" component={Blog} />
            <Route path="/blog/post/:id" component={PostViewer} />
        </Router>
    );
};

const apiUrl = "https://blog-backend-e4wmb1z8y94h.deno.dev/";

export { apiUrl };
export default App;
