import { useParams } from "@solidjs/router";
import Topbar, { TopbarButtons } from "../../components/Topbar";
import { Suspense, createResource } from "solid-js";
import { apiUrl } from "../../App";
import type { Post } from "../../components/BlogPost";
import { marked } from "marked";
import "./blogpost.css";
type getPost = {
    post: Post;
};
function renderPost(post?: Post) {
    if (!post) {
        return (
            <div class="text-center py-12" id="post-markdown">
                <h1>Post not found!</h1>
            </div>
        );
    }
    const [parsedContent] = createResource(async () => {
        return await marked.parse(post.content);
    });
    return (
        <div class="px-4 py-12 md:px-96" id="post-markdown">
            <h1 class="text-2xl text-center">{post.title}</h1>
            <img src={post.image} class="rounded-3xl w-[90%] m-auto py-2" />

            <hr class="py-4" />
            {/*eslint-disable-next-line solid/no-innerhtml*/}
            <section innerHTML={parsedContent()} />
        </div>
    );
}
export default function () {
    const params = useParams();
    const [post] = createResource(async () => {
        const response: getPost = await (
            await fetch(apiUrl + "getPost", {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({ _id: params.id }),
            })
        ).json();
        console.log(response);
        return response.post;
    });
    console.log(post());
    return (
        <div>
            <Topbar activeButton={TopbarButtons.Blog} />
            <Suspense
                fallback={
                    <h1 class="py-12 px-4 text-center text-2xl">Loading...</h1>
                }
            >
                {renderPost(post())}
            </Suspense>
        </div>
    );
}
