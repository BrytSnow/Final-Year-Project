import "./InputBox.css";

export default function InputBox({
    value,
    onChange,
    onSend,
    disabled
}) {

    const handleKeyDown = (event) => {

        // Send message with Enter
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            onSend();
        }

    };


    return (

        <div className="input-box">

            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your symptoms..."
                disabled={disabled}
                rows="1"
            />

            <button
                onClick={onSend}
                disabled={disabled}
            >
                ➤
            </button>

        </div>

    );
}