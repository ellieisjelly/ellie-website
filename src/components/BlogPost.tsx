import { A } from "@solidjs/router";

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
export default function (props: { post: Post }) {
    return (
        <A
            class="bg-base border-surface0 border-2 px-4 py-2 rounded-2xl shrink-0 grow-0 basis-3/12 lg:basis-1/6"
            href={"/blog/post/" + props.post._id}
        >
            <h2 class="text-2xl text-center">{props.post.title}</h2>

            <p>{props.post.desc}</p>
            <p class="text-sm text-subtext0 text-right">
                {dateToString(props.post.postDate)}
            </p>
        </A>
    );
}
