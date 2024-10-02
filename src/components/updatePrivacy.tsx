import { useOutletContext } from "react-router-dom"
import { IContextType } from "../lib/types"
import { useState } from "react"
import { handleSetAccountStatus } from "../lib/api"
import { CLOSED_LOCK_ICON, OPEN_LOCK_ICON } from "../lib/constant"

export const UpdatePrivacy = () => {
    const { account, setAccount } = useOutletContext<IContextType>();
    const [isPrivate, setIsPrivate] = useState<boolean>(account.isPrivate)

    const toggleAccountStatus = async () => {
        try {
            const response = await handleSetAccountStatus(!isPrivate)
            if (response.status === "ok") {
                setIsPrivate(!isPrivate);
                setAccount({ ...account, isPrivate: !isPrivate })
            } else {
                alert("Failed to update account status.")
            }
        } catch (error) {
            console.error("Error updating account status", error)
        }
    }


    return <>
        <div className="account-status">
                <h5>Account Status</h5>
                <div className="lock">
                    <img
                        src={isPrivate ? CLOSED_LOCK_ICON : OPEN_LOCK_ICON}
                        alt={isPrivate ? "Private Account" : "Public Account"}
                        style={{ cursor: "pointer", width: 50 }}
                        onClick={toggleAccountStatus}
                    />
                </div>
                <p>{isPrivate ? "Your account is private" : "Your account is public"}</p>
        </div>
    </>
}