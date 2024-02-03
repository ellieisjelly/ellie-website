import Topbar, { TopbarButtons } from "../components/Topbar";
export default function () {
    return (
        <div>
            <Topbar activeButton={TopbarButtons.Home} />
            <div class="text-center py-12">
                <h1 class="text-4xl text-lavender">Hi, I'm Ellie!</h1>
            </div>
        </div>
    );
}
