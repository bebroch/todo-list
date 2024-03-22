import style from "./left-panel.module.css"

export default function LeftPanel({ tasks }: { tasks: string[] }) {
    return (
        <div className={style.leftPanel}>
            <div className={style.titleBlock}>
                <h1 className={style.title}>Задачи</h1>
            </div>
            <ul className={style.list}>
                {tasks.map((task) => {
                    return (
                        <li className={style.listItem}>
                            <button className={style.task}>{task}</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
