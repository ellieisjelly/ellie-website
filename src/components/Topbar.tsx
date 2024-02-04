import { A } from "@solidjs/router";
import { createSignal } from "solid-js";
enum TopbarButtons {
    Home,
    About,
    Blog,
}

function TopbarButton(props: { name: string; href: string; active: boolean }) {
    const [active, setActive] = createSignal(props.active); // eslint-disable-line solid/reactivity
    return (
        <A
            href={props.href}
            class={`hover:text-sky px-3 py-3
            ${active() ? "text-sky" : "text-blue"}`}
            onClick={() => setActive(true)}
        >
            {props.name}
        </A>
    );
}
function Separator() {
    return <div class="bg-surface0 min-w-[2px] min-h-8 mx-[8px]" />;
}
function isActive(button: TopbarButtons, activeButton: TopbarButtons) {
    return button === activeButton;
}
export default function (props: { activeButton: TopbarButtons }) {
    return (
        <div class="bg-mantle backdrop-blur-sm border-b-crust w-full h-12 flex flex-row-reverse gap-2 items-center sticky top-0 pr-2">
            <TopbarButton
                name="Blog"
                href="/blog"
                active={isActive(TopbarButtons.Blog, props.activeButton)}
            />
            <Separator />
            <TopbarButton
                name="About"
                href="/about"
                active={isActive(TopbarButtons.About, props.activeButton)}
            />
            <Separator />
            <TopbarButton
                name="Home"
                href="/home"
                active={isActive(TopbarButtons.Home, props.activeButton)}
            />
        </div>
    );
}
export { TopbarButtons };
