import { useEffect, useState } from "react"
import { IUser } from "../../../lib/types"
import { handleGetFollowing } from "../../../lib/api"
import { BACE_URL, DEFAULT_PIC } from "../../../lib/constant"

export const Following = () => {


    const [following, setFollowing] = useState<IUser[]>([])
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        handleGetFollowing()
        .then(response => {
            if(response.status == "ok") {
                setFollowing(response.payload as IUser[])
            } else {
                setError(response.message || "Faild to load following list")
            }
        })
    }, [])

    return <>
        <h3 className="follow">Following</h3>
        {following.length > 0 ? (
            <div>
                {following.map(user => (
                    <div className="followers" key={user.id}>
                        <img className="follower-pic" src={user.picture ? BACE_URL + user.picture : DEFAULT_PIC}/>
                        {user.name} {" " + user.surname}
                    </div>
                ))}
            </div>
        ) : (
            <p>You are not following anyone</p>
        )}
    </>
}