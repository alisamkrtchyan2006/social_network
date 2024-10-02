import { EditLogin } from "../../../components/editLogin"
import { EditPassword } from "../../../components/editPwd"
import { UpdatePrivacy } from "../../../components/updatePrivacy"

export const Settings = () => {

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
        <div>
            <UpdatePrivacy/>
        </div>
    </div> 
}