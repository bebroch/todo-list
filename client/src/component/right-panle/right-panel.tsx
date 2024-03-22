import style from "./right-panel.module.css"
import Title from "./title/title"
import Tags from "./tags/tags"
import Status from "./status/status"
import Description from "./description/description"

type RightPanelType = {
    title: string
    tags: string[]
    status: string
    description: string
}

export default function RightPanel({ title, tags, status, description }: RightPanelType) {
    return (
        <div className={style.rightPanel}>
            <Title title={title} />

            <Tags tags={tags} />

            <Status status={status} />

            <Description description={description} />
        </div>
    )
}
