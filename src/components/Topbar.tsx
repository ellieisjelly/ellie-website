import { A } from "@solidjs/router";
import { createSignal } from "solid-js";
enum TopbarButtons {
    Home,
    About,
}

function TopbarButton(props: { name: string; href: string; active: boolean }) {
    const [active, setActive] = createSignal(props.active);
    return (
        <A
            href={props.href}
            class={`${
                active() ? "bg-crust" : "bg-mantle"
            } hover:bg-crust px-2 py-2`}
            onClick={() => setActive(true)}
        >
            {props.name}
        </A>
    );
}
function isActive(button: TopbarButtons, activeButton: TopbarButtons) {
    return button === activeButton;
}
export default function (props: { activeButton: TopbarButtons }) {
    return (
        <div class="bg-mantle backdrop-blur-sm border-b-crust w-full h-12 flex flex-row-reverse gap-4 sticky top-0">
            <TopbarButton
                name="Home"
                href="/home"
                active={isActive(TopbarButtons.Home, props.activeButton)}
            />
            <TopbarButton
                name="About"
                href="/about"
                active={isActive(TopbarButtons.About, props.activeButton)}
            />
        </div>
    );
}
export { TopbarButtons };
