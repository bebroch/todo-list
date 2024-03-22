import style from "./description.module.css"

export default function Status({ description }: { description: string }) {
    return (
        <div className={style.descriptionBlock}>
            <h4 className={style.title}>Описание:</h4>
            <p className={style.description}>{description}</p>
        </div>
    )
}
