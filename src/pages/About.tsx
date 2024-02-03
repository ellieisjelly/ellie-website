import InConstruction from "./InConstruction";
import Topbar, { TopbarButtons } from "../components/Topbar";

export default function () {
    return (
        <div class="fade text-center">
            <Topbar activeButton={TopbarButtons.About} />
            <InConstruction />
        </div>
    );
}
