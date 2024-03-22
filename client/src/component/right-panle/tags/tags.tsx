import style from "./tags.module.css"

export default function Tags({ tags }: { tags: string[] }) {
    return (
        <div className={style.tagBlock}>
            <h4 className={style.title}>Теги:</h4>

            <ul className={style.list}>
                {tags.map((tag) => (
                    <li className={style.listItem}>{tag}</li>
                ))}
            </ul>
        </div>
    )
}
