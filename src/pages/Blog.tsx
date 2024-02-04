import Topbar, { TopbarButtons } from "../components/Topbar";
import InConstruction from "./InConstruction";

export default function () {
    return (
        <div class="text-center">
            <Topbar activeButton={TopbarButtons.Blog} />
            <InConstruction />
        </div>
    );
}
