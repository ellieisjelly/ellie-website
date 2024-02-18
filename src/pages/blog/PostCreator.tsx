import { onMount, createSignal } from "solid-js";
import Topbar, { TopbarButtons } from "../../components/Topbar";
import { renderPost } from "./PostViewer";

export default function () {
    let previewEl;

    const [title, setTitle] = createSignal("");
    const [desc, setDesc] = createSignal("");
    const [image, setImage] = createSignal("");
    const [tags, setTags] = createSignal<string[]>([]);
    const [content, setContent] = createSignal("");

    return (
        <div>
            <Topbar activeButton={TopbarButtons.Blog} />
            <div class="flex flex-row justify-center gap-12 px-12 py-8">
                <section class="w-2/5">
                    <h1 class="text-4xl text-center">Post Maker</h1>
                    <span>Title:</span>
                    <input
                        class="bg-surface0"
                        onInput={(event) => {
                            setTitle(event.currentTarget.value);
                        }}
                    />
                    <br />
                    <span>Description:</span>
                    <input
                        class="bg-surface0"
                        onInput={(event) => {
                            setDesc(event.currentTarget.value);
                        }}
                    />
                    <br />
                    <span>
                        Image Link:
                        <input
                            class="bg-surface0"
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
                        onInput={(event) => {
                            setContent(event.currentTarget.value);
                        }}
                    />
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
