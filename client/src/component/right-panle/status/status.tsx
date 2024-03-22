import style from "./status.module.css"

export default function Status({ status }: { status: string }) {
    return (
        <div className={style.statusBlock}>
            <h4 className={style.title}>Статус:</h4>
            <p className={style.status}>{status}</p>
        </div>
    )
}
