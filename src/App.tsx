import { Router, Route } from "@solidjs/router";
import { Component, lazy } from "solid-js";
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/blog/Blog"));
const PostViewer = lazy(() => import("./pages/blog/PostViewer"));
const PostCreator = lazy(() => import("./pages/blog/PostCreator"));
import "./bg.css";
const App: Component = () => {
    return (
        <Router>
            <Route path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/blog" component={Blog} />
            <Route path="/blog/post/:id" component={PostViewer} />
            <Route path="/blog/createPost/:id?" component={PostCreator} />
        </Router>
    );
};

const apiUrl = "https://api.ellieis.me/";

export { apiUrl };
export default App;
