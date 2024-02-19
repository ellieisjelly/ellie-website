import { useParams } from "@solidjs/router";
import Topbar, { TopbarButtons } from "../../components/Topbar";
import { Suspense, createEffect, createResource } from "solid-js";
import { apiUrl } from "../../App";
import { dateToString, type Post } from "../../components/BlogPost";
import { marked } from "marked";
import hljs from "highlight.js/lib/common";
import "./blogpost.css";
import "@catppuccin/highlightjs/css/catppuccin-mocha.css";
export type getPost = {
    post: Post | null;
};
export function renderPost(post?: Post, noPadding?: boolean) {
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
    document
        .querySelector("#post-markdown")
        ?.querySelectorAll("code")
        .forEach((element) => {
            hljs.highlightElement(element);
        });
    createEffect(() => {
        document
            .querySelector("#post-markdown")
            ?.querySelectorAll("code")
            .forEach((element) => {
                hljs.highlightElement(element);
            });
    });
    return (
        <div class={!noPadding ? "px-4 py-12 md:px-96" : ""} id="post-markdown">
            <h1 class="text-2xl text-center">{post.title}</h1>
            <img src={post.image} class="rounded-3xl w-[90%] m-auto py-2" />
            <div class="text-xl flex gap-2 items-center my-4 justify-center">
                {post.desc}{" "}
                <div class="bg-surface0 min-w-[2px] min-h-8 mx-[8px]" />
                <span class="text-overlay1 text-sm">
                    {dateToString(post.postDate)}
                </span>
            </div>
            <hr class="py-4" />
            {/*eslint-disable-next-line solid/no-innerhtml*/}
            <section innerHTML={parsedContent()} id="post-content" />
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
        if (response.post) {
            response.post.postDate = new Date(response.post.postDate);
            return response.post;
        }
    });
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
