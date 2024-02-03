import Topbar, { TopbarButtons } from "../components/Topbar";
export default function () {
    return (
        <div>
            <Topbar activeButton={TopbarButtons.Home} />
        </div>
    );
}
