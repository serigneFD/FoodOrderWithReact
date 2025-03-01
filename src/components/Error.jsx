export default function Error({title, message}) {
    return (
        <div>
            <h2 className="error">{title}</h2>
            <p>{message}</p>
        </div>
    )
}