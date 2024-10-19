export function Modal(props) {
    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-content">
                <div className="box">
                    {props.children}
                </div>
            </div>
            <button className="modal-close is-large" aria-label="close"></button>
        </div>
    )
}