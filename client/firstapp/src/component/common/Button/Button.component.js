import React from "react";


export const Button = (props) => {
    const enabledLabel = props.enabledLabel || "submit"
    const disabledLabel = props.disabledLabel || "submitting"

    var button = props.isSubmitting
        ? <button disabled className="mt-2 btn btn-primary">{disabledLabel}</button>
        : <button disabled={!props.isValidForm} className="mt-2 btn btn-primary">{enabledLabel}</button>

    return button;
}