import Topbar, { TopbarButtons } from "../../components/Topbar";
import BlogPost, { Post } from "../../components/BlogPost";
import { createResource, For, Show, Suspense } from "solid-js";
import { A } from "@solidjs/router";
import { apiUrl } from "../../App";

export async function getSHA256Hash(input: string) {
    const textAsBuffer = new TextEncoder().encode(input);
    const hashBuffer = await window.crypto.subtle.digest(
        "SHA-256",
        textAsBuffer
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray
        .map((item) => item.toString(16).padStart(2, "0"))
        .join("");
    return hash;
}

export async function validatePassword(pass: string) {
    const response: validatePassword = await (
        await fetch(apiUrl + "validatePassword", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                auth: await getSHA256Hash(pass),
            }),
        })
    ).json();
    return response.auth;
}
export type validatePassword =
    | {
          auth: true;
      }
    | {
          auth: false;
          error: string;
      };

export type getPosts = {
    post: Array<Post>;
};
export type makePost = validatePassword;
export default function () {
    const [posts] = createResource(async () => {
        const postList: getPosts = await (
            await fetch(apiUrl + "getPosts")
        ).json();
        for (const post of postList.post) {
            post.postDate = new Date(post.postDate);
        }
        const sortedPostList = postList.post.sort((post1, post2) => {
            return post1 > post2 ? -1 : 1;
        });
        return sortedPostList;
    });
    const [isAdmin] = createResource(async () => {
        const pass = localStorage.getItem("password");
        if (!pass) return false;
        return validatePassword(pass);
    });
    return (
        <div class="fade text-left">
            <Topbar activeButton={TopbarButtons.Blog} />
            <Suspense
                fallback={
                    <h1 class="py-12 px-4 text-center text-2xl">Loading...</h1>
                }
            >
                <div class="max-w-2/3 lg:max-w-1/2 right-0 left-0 m-auto">
                    <Show when={isAdmin() === true}>
                        <section class="text-center">
                            <A class="" href="/blog/createPost">
                                Create a Post
                            </A>
                        </section>
                    </Show>
                    <section class="flex flex-wrap flex-col-reverse lg:flex-row py-12 gap-4 px-12 justify-center">
                        <For each={posts()}>
                            {(post: Post) => <BlogPost post={post} />}
                        </For>
                    </section>
                </div>
            </Suspense>
        </div>
    );
}
