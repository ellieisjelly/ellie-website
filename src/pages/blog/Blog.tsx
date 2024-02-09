import Topbar, { TopbarButtons } from "../../components/Topbar";
import BlogPost, { Post } from "../../components/BlogPost";
import { createResource, For, Suspense } from "solid-js";
import { apiUrl } from "../../App";

type getPosts = {
    post: Array<Post>;
};
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
    return (
        <div class="fade text-left">
            <Topbar activeButton={TopbarButtons.Blog} />
            <Suspense
                fallback={
                    <h1 class="py-12 px-4 text-center text-2xl">Loading...</h1>
                }
            >
                <div class="max-w-2/3 lg:max-w-1/2 right-0 left-0 m-auto">
                    <div class="flex flex-wrap flex-col lg:flex-row py-12 gap-4 px-12 justify-center">
                        <For each={posts()}>
                            {(post: Post) => <BlogPost post={post} />}
                        </For>
                    </div>
                </div>
            </Suspense>
        </div>
    );
}
