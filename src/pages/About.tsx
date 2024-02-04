import Topbar, { TopbarButtons } from "../components/Topbar";

export default function () {
    return (
        <div class="fade text-center">
            <Topbar activeButton={TopbarButtons.About} />
            <h1 class="font-bold text-6xl py-12">About Me</h1>
            <div class="flex flex-row justify-center py-16">
                <div class="text-lg md:text-2xl md:tracking-wide max-w-[77%] lg:max-w-[50%] text-left">
                    Hi! I'm Ellie, a{" "}
                    <span class="text-subtext0 text-xs">bad</span>
                    Programmer interested in software development, hardware
                    engineering and generally anything tech-related.
                    <br />
                    <br />
                    I've had an interest in the field for years, since a child
                    wondering how my favorite games were made and now I've come
                    to make my own!
                    <br />
                    <br />
                    I'm not a very creative person, but I do love messing around
                    in FL Studio or playing instruments every once in a while,
                    it's a good break from the norm.
                    <br />
                    <br />
                    I'm always open to talk, if you have any questions you can
                    reach out to my email at{" "}
                    <a href="mailto:ellie@ellieis.me" target="_blank">
                        ellie@ellieis.me
                    </a>{" "}
                    or my Discord at{" "}
                    <a
                        href="https://discord.com/users/723642065082253314"
                        target="_blank"
                    >
                        ellie_is_jelly
                    </a>
                </div>
                <img
                    src="pfp.png"
                    height="348"
                    width="348"
                    class="rounded-full min-h-[87px] max-h-[87px] min-w-[87px] max-w-[87px] md:min-h-[174px] md:max-h-[174px] md:min-w-[174px] md:max-w-[174px] lg:min-h-[348px] lg:max-h-[348px] lg:min-w-[348px] lg:max-w-[348px]"
                />
            </div>
        </div>
    );
}
