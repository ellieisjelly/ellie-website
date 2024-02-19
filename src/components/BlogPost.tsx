import { A } from "@solidjs/router";
import { Icon } from "solid-heroicons";
import { trash, pencilSquare } from "solid-heroicons/outline";
import { Show } from "solid-js";
import { apiUrl } from "../App";
import { getSHA256Hash, makePost } from "../pages/blog/Blog";

type Post = {
    _id: number;
    title: string;
    image?: string;
    desc: string;
    tags: string[];
    content: string;
    postDate: Date;
};
export type { Post };

function dateToString(date: Date, relative?: boolean) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (relative) {
        const rtf1 = new Intl.RelativeTimeFormat("en", { style: "short" });
        if (new Date().getFullYear() - year > 0) {
            return rtf1.format(-(new Date().getFullYear() - year), "year");
        } else if (new Date().getMonth() + 1 - month > 0) {
            return rtf1.format(-(new Date().getMonth() + 1 - month), "month");
        } else if (new Date().getDate() - day > 0) {
            return rtf1.format(-(new Date().getDate() - day), "day");
        } else if (new Date().getHours() - date.getHours() > 0) {
            return rtf1.format(
                -(new Date().getHours() - date.getHours()),
                "hour"
            );
        } else {
            return rtf1.format(
                -(new Date().getMinutes() - date.getMinutes()),
                "minute"
            );
        }
    }
    return `${month}/${day}/${year}`;
}

export { dateToString };
export default function (props: {
    post: Post;
    adminControls?: boolean;
    onDelete?: () => void;
}) {
    let thing: HTMLAnchorElement | undefined;
    return (
        <A
            class="bg-base border-surface0 border-2 px-4 py-2 rounded-2xl shrink-0 grow-0 basis-3/12 lg:basis-1/6"
            href={"/blog/post/" + props.post._id}
            ref={thing}
        >
            <h2 class="text-2xl text-center">{props.post.title}</h2>
            <p>{props.post.desc}</p>
            <div class="flex flex-row-reverse gap-x-2">
                <p class="text-sm text-subtext0">
                    {dateToString(props.post.postDate)}
                </p>
                <Show when={props.adminControls}>
                    {/* 
                    This is kind of jank, but I don't know a better way to do it
                    Whenever you press the button, it also navigates to the link,
                    I stop that by setting the href to void
                    */}
                    <button
                        class="px-1 py-1 rounded-full bg-red"
                        onClick={async () => {
                            thing!.href = "javascript:void(0)";
                            const response: makePost = await (
                                await fetch(apiUrl + "removePost", {
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    method: "POST",
                                    body: JSON.stringify({
                                        _id: props.post._id,
                                        auth: await getSHA256Hash(
                                            localStorage.getItem("password")!
                                        ),
                                    }),
                                })
                            ).json();
                            thing!.href = "/blog/post/" + props.post._id;
                            if (response.auth) {
                                alert("Deleted post.");
                                if (props.onDelete) {
                                    props.onDelete();
                                }
                            } else {
                                alert(
                                    "Could not delete post due to " +
                                        response.error
                                );
                            }
                        }}
                    >
                        <Icon path={trash} class="w-4 text-white" />
                    </button>
                    <A
                        href={"/blog/createPost/" + props.post._id}
                        class="px-1 py-1 rounded-full bg-lavender"
                    >
                        <Icon path={pencilSquare} class="w-4 text-white" />
                    </A>
                </Show>
            </div>
        </A>
    );
}
