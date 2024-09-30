import { useOutletContext } from "react-router-dom";
import { EditLogin } from "../../../components/editLogin"
import { EditPassword } from "../../../components/editPwd"
import { IContextType } from "../../../lib/types";
import { useState } from "react";
import { handleSetAccountStatus } from "../../../lib/api";
import { CLOSED_LOCK_ICON, OPEN_LOCK_ICON } from "../../../lib/constant";

export const Settings = () => {


    const { account, setAccount } = useOutletContext<IContextType>();
    const [isPrivate, setIsPrivate] = useState<boolean>(account.isPrivate);

    const toggleAccountStatus = async () => {
        try {
            const response = await handleSetAccountStatus(!isPrivate);
            if (response.status === "ok") {
                setIsPrivate(!isPrivate);
                setAccount({ ...account, isPrivate: !isPrivate });
            } else {
                alert("Failed to update account status.");
            }
        } catch (error) {
            console.error("Error updating account status", error);
        }
    }


    return <div>
        <h1 className="settings-title">Settings</h1>
        <div className="edit-block">
            <div className="edit-pwd">
                <EditPassword/>
            </div>
            <div className="edit-login">
                <EditLogin/>
            </div>
        </div>

        <div className="account-status">
                <h5>Account Status</h5>
                <img
                    src={isPrivate ? CLOSED_LOCK_ICON : OPEN_LOCK_ICON}
                    alt={isPrivate ? "Private Account" : "Public Account"}
                    style={{ cursor: "pointer", width: 50 }}
                    onClick={toggleAccountStatus}
                />
                <p>{isPrivate ? "Your account is private" : "Your account is public"}</p>
            </div>

    </div> 
}