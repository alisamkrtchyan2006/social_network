import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { ILoginUpdate, IPasswordUpdate } from "../lib/types"
import { handleUpdatePassword } from "../lib/api"

export function EditPassword () {

    const [error, setError] = useState<string>("")
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<IPasswordUpdate & ILoginUpdate>()


    const handleUpdatePass = (data: IPasswordUpdate) => {
        handleUpdatePassword(data)
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
            <h3 className="update-title">Update Password</h3>
            <h3>{error}</h3>
            <form onSubmit={handleSubmit(handleUpdatePass)} >
                <input
                    className="edit-input"
                    type="text"
                    placeholder="old password"
                    {...register("old", {
                        required: "You forgot to fill in your old password"
                    })}
                />
                {errors.old && <p className="text-danger">{errors.old.message}</p>}
                <input
                    className="edit-input"
                    type="text"
                    placeholder="new password"
                    {...register("newpwd", {
                        required: "You forgot to fill in your new password"
                    })}
                />
                {errors.newpwd && <p className="text-danger">{errors.newpwd.message}</p>}
                <button className="update-button">Update Password</button>
            </form>
        </div>
    </>
}