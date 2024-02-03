import Topbar, { TopbarButtons } from "../components/Topbar";

export default function () {
    return (
        <div>
            <Topbar activeButton={TopbarButtons.Home} />
            <div class="text-center py-12">
                <h1 class="text-8xl text-lavender" id="name">
                    Hi, I'm Ellie!
                </h1>
                <p class="py-2 text-xl">
                    You can find a lot of cool stuff here!
                    <br />
                    <span class="text-overlay0">...</span>
                    <br />
                    <span class="text-overlay0 text-sm">Not a lot here</span>
                </p>
            </div>
        </div>
    );
}
