import { createEffect } from "solid-js";
import Topbar, { TopbarButtons } from "../components/Topbar";

export default function () {
    createEffect(() => {
        let isPlaying = false;
        setInterval(() => {
            if (!isPlaying) {
                console.log("chance");
                if (Math.random() > 0.98) {
                    console.log("playing");
                    isPlaying = true;
                    const doge = document.getElementById("doge");
                    if (doge) {
                        if (window.innerWidth < 1280) {
                            doge.className = "doge playFast";
                        } else {
                            doge.className = "doge play";
                        }
                        setTimeout(() => {
                            isPlaying = false;
                            doge.className = "doge";
                        }, 4000);
                    }
                }
            }
        }, 100);
    });
    return (
        <div class="fade">
            <Topbar activeButton={TopbarButtons.Home} />
            <section class="text-center py-12">
                <h1 class="text-8xl" id="name">
                    Hi, I'm Ellie!
                </h1>
                <p class="py-2 text-xl">
                    You can find a lot of cool stuff here!
                    <br />
                    <span class="text-overlay0">...</span>
                    <br />
                    <span class="text-overlay0 text-sm">Not a lot here..</span>
                </p>
                <p class="py-8">Check back later for more!</p>
                <img
                    src="/doge.webp"
                    height={256}
                    width={256}
                    alt="doge"
                    id="doge"
                    class="doge"
                />
            </section>
        </div>
    );
}
