import { useEffect, useState } from "react"
import { Button } from "../../../../../common/Button/Button.component"

export const CategoryForm = props => {
    const [data, setData] = useState({
        category_name: " "
    })


    useEffect(() => {
        if (props.UpdateCategory) {
            setData({
                category_name: props.UpdateCategory.category_name
            })
        }
    }, [props.UpdateCategory])

    const handleChange = e => {
        const { name, value } = e.target
        setData({
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        props.submitCallback(data)
    }

    return (
        <>
            <div className="form-container">
                <h5>{props.title}</h5>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="category_name">Category Name</label>
                        <input
                            name="category_name"
                            id="category_name"
                            required
                            className="form-control form-control-lg"
                            value={data.category_name}
                            onChange={handleChange} />
                    </div>

                    <Button
                        enabledLabel={props.enabledLabel}
                        disabledLabel={props.disabledLabel}
                        isSubmitting={props.isSubmitting}
                        isValidForm={props.isValidForm}
                    ></Button>
                </form>
            </div>
        </>
    )
}