import LeftPanel from "./component/left-panel/left-panel"
import RightPanel from "./component/right-panle/right-panel"
import style from "./styles/app.module.css"
import "./styles/global.css"

function App() {
    return (
        <div className={style.main}>
            <LeftPanel tasks={["asdsad", "asdsad"]} />
            <RightPanel title={"ghfgh"} tags={["hjg"]} status={"gfhfgh"} description={"fghfghfg"} />
        </div>
    )
}

export default App
