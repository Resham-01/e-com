import React, { useEffect, useState } from "react";

export const Count = (props) => {

    // hooks => useState, useEffect

    var [count, setCount] = useState(0)
    // var [email, setEmail] = useState("")

    useEffect(() => {
        alert("count value updated")
    }, [count])

    const incrementCount = (event) => {
        setCount(count + 1)
    }


    return (
        // empty fragment
        <React.Fragment>

            <div className="text-center">
                <h1>Count Value: {count}</h1>
                {
                    count < 10 &&
                    <button className="btn btn-primary me-4" onClick={incrementCount}>Increment Count By 1</button>
                }
                {
                    count > 0 &&
                    <button className="btn btn-primary ms-4" onClick={() => setCount(count - 1)}>Decrement Count By 1</button>
                }
            </div>
        </React.Fragment>

    )
}