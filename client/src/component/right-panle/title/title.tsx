import style from "./title.module.css"

export default function Title({ title }: { title: string }) {
    return (
        <div className={style.titleBlock}>
            <h1 className={style.title}>{title}</h1>
        </div>
    )
}
