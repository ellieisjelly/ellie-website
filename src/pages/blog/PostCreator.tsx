import { createSignal, onCleanup, onMount } from "solid-js";
import Topbar, { TopbarButtons } from "../../components/Topbar";
import { renderPost } from "./PostViewer";
import { Post } from "../../components/BlogPost";
import { getPosts, getSHA256Hash, makePost, validatePassword } from "./Blog";
import { apiUrl } from "../../App";

export default function () {
    const [title, setTitle] = createSignal("");
    const [desc, setDesc] = createSignal("");
    const [image, setImage] = createSignal("");
    const [tags, setTags] = createSignal<string[]>([]);
    const [content, setContent] = createSignal("");

    onCleanup(() => {
        console.log("saving!");
        localStorage.setItem(
            "post-draft",
            JSON.stringify({
                title: title(),
                desc: desc(),
                image: image(),
                tags: tags(),
                content: content(),
            })
        );
    });
    onMount(() => {
        const val = localStorage.getItem("post-draft");
        if (val === null) return;
        const draft: Post | undefined = JSON.parse(val);
        if (draft === undefined) return;
        setTitle(draft.title);
        setDesc(draft.desc);
        if (draft.image === undefined) draft.image = "";
        setImage(draft.image);
        setTags(draft.tags);
        setContent(draft.content);

        (document.querySelector("#title") as HTMLInputElement).value =
            draft.title;
        (document.querySelector("#desc") as HTMLInputElement).value =
            draft.desc;
        (document.querySelector("#img") as HTMLInputElement).value =
            draft.image;
        (document.querySelector("#content") as HTMLTextAreaElement).value =
            draft.content;
        let tagString = "";
        for (const tag of draft.tags) {
            tagString += tag + ",";
        }
        tagString = tagString.substring(0, tagString.length - 1);
        (document.querySelector("#tags") as HTMLInputElement).value = tagString;
    });
    return (
        <div>
            <Topbar activeButton={TopbarButtons.Blog} />
            <div class="flex flex-row justify-center gap-12 px-12 py-8">
                <section class="w-2/5">
                    <h1 class="text-4xl text-center">Post Maker</h1>
                    <span>Title:</span>
                    <input
                        class="bg-surface0"
                        id="title"
                        onInput={(event) => {
                            setTitle(event.currentTarget.value);
                        }}
                    />
                    <br />
                    <span>Description:</span>
                    <input
                        class="bg-surface0"
                        id="desc"
                        onInput={(event) => {
                            setDesc(event.currentTarget.value);
                        }}
                    />
                    <br />
                    <span>
                        Image Link:
                        <input
                            class="bg-surface0"
                            id="img"
                            onInput={(event) => {
                                setImage(event.currentTarget.value);
                            }}
                        />
                    </span>
                    <br />
                    <span>
                        Tags{" "}
                        <span class="text-subtext1 subtext0">
                            (separated by commas)
                        </span>
                        :
                        <input
                            class="bg-surface0"
                            id="tags"
                            onInput={(event) => {
                                const tags = event.currentTarget.value
                                    .trim()
                                    .split(",");
                                setTags(tags);
                            }}
                        />
                    </span>
                    <br />
                    <br />
                    <textarea
                        class="resize-none w-full h-[60vh] bg-surface0 rounded-xl"
                        id="content"
                        onInput={(event) => {
                            if (event.currentTarget.value) {
                                setContent(event.currentTarget.value);
                            } else {
                                setContent("");
                            }
                        }}
                    />
                    <button
                        class="bg-red text-white px-4 py-2 my-2 mx-8 rounded-xl"
                        onClick={() => {
                            console.log("saving!");
                            localStorage.setItem(
                                "post-draft",
                                JSON.stringify({
                                    title: title(),
                                    desc: desc(),
                                    image: image(),
                                    tags: tags(),
                                    content: content(),
                                })
                            );
                            alert("Saved!");
                        }}
                    >
                        Save Draft
                    </button>
                    <button
                        class="bg-green text-white px-4 py-2 rounded-xl"
                        onClick={async () => {
                            // calculate post id
                            const postResponse: getPosts = await (
                                await fetch(apiUrl + "getPosts")
                            ).json();
                            const id = postResponse.post.length;

                            const password = localStorage.getItem("password");
                            if (!password) {
                                alert("No password found");
                                return;
                            }
                            const hashedPassword = await getSHA256Hash(
                                password
                            );

                            const json = JSON.stringify({
                                _id: id,
                                title: title(),
                                image: image(),
                                desc: desc(),
                                tags: tags(),
                                content: content(),
                                postDate: new Date(),
                                auth: hashedPassword,
                            });

                            const response: makePost = await (
                                await fetch(apiUrl + "publishPost", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: json,
                                })
                            ).json();
                            if (response.auth === false) {
                                alert(
                                    "Failed to publish post, likely an invalid password."
                                );
                            } else {
                                alert("Post published succesfully!");
                            }
                        }}
                    >
                        Submit
                    </button>
                </section>
                <section class="w-2/5">
                    <h1 class="text-4xl text-center">Preview</h1>
                    {renderPost(
                        {
                            _id: -1,
                            title: title(),
                            image: image(),
                            desc: desc(),
                            tags: tags(),
                            content: content(),
                            postDate: new Date(0),
                        },
                        true
                    )}
                </section>
            </div>
        </div>
    );
}
