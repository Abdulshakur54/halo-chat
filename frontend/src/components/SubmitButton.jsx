import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function SubmitButton({ loading, className, text }) {
    if (loading) {
        return (
            <button
                type="submit"
                className={className}
                disabled
            >
                <FontAwesomeIcon icon={faSpinner} spin /> {text}
            </button>
        )
    } else {
        return (<button
            type="submit"
            className={className}
        >
            {text}
        </button>)
    }
}

export default SubmitButton