import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { ILoginUpdate, IPasswordUpdate } from "../lib/types"
import { handleUpdateLogin } from "../lib/api"

export function EditLogin () {

    const [error, setError] = useState<string>("")
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<IPasswordUpdate & ILoginUpdate>()

    const handleUpdateLog = (data: ILoginUpdate) => {
        handleUpdateLogin(data)
            .then(response => {
                if (response.status == "error" && response.message) {
                    setError(response.message)
                } else {
                    navigate("/profile")
                }
            })
    }


    return <>

        <div>
            <h3 className="update-title">Update Login</h3>
            <h3>{error}</h3>
            <form onSubmit={handleSubmit(handleUpdateLog)} >
                <input
                    className="edit-input"
                    type="text"
                    placeholder="your password"
                    {...register("password", {
                        required: "You forgot to fill in your password"
                    })}
                />
                {errors.password && <p className="text-danger">{errors.password.message}</p>}
                <input
                    className="edit-input"
                    type="text"
                    placeholder="new Login"
                    {...register("login", {
                        required: "You forgot to fill in your new login"
                    })}
                />
                {errors.login && <p className="text-danger">{errors.login.message}</p>}
                <button className="update-button">Update Login</button>
            </form>
        </div>
    </>
}