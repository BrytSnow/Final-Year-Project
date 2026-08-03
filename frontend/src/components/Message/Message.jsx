import "./Message.css";

export default function Message({ sender, children }) {
    return (
        <div className={`message ${sender}`}>
            <div className="message__bubble">
                {children}
            </div>
        </div>
    );
}