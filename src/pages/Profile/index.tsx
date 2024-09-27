import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { handleLogout, handleVerify } from "../../lib/api"
import { IWideUser } from "../../lib/types"
import NavLinkPolyfill from "./NavLink"

export const Profile = () => {

    const navigate = useNavigate()
    const [account, setAccount] = useState<IWideUser | null>(null)

    useEffect(() => {
        handleVerify()
        .then(response => {
            if(!response.user) {
                navigate("/login")
            }else {
                setAccount(response.user)
            }
        })
    }, [])


    const onLogout = async () => {
        try {
            const response = await handleLogout()
            if(response.status == "ok") {
                setAccount(null)
                navigate('/login')
            } else {
                alert("Logout failed")
            }
        } catch (error) {
            console.error ("Logout error", error)
        }
    }


    return account && <>
        <nav>
            <NavLinkPolyfill to="/profile" end>Profile</NavLinkPolyfill>
            <NavLinkPolyfill to="/profile/settings">Settings</NavLinkPolyfill>
            <NavLinkPolyfill to="/profile/search">Search</NavLinkPolyfill>
            <NavLinkPolyfill to="/profile/posts">Posts</NavLinkPolyfill>
            <NavLinkPolyfill to="/profile/followers">Followers</NavLinkPolyfill>
            <NavLinkPolyfill to="/profile/followers">Followers</NavLinkPolyfill>
            
            <button onClick={onLogout}>Logout</button>
        </nav>

        <Outlet
            context={{account, setAccount}}
        />
    </>
}