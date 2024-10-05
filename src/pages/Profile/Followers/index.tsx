import { useEffect, useState } from "react"
import { IUser } from "../../../lib/types"
import { handleGatFollowers } from "../../../lib/api"
import { BACE_URL, DEFAULT_PIC } from "../../../lib/constant"

export const Followers = () => {


    const [followers, setFollowers] = useState<IUser[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        handleGatFollowers()
        .then(response => {
            if(response.status == "ok") {
                setFollowers(response.payload as IUser[])
            } else {
                setError(response.message || "Faild to load followers")
            }
        })
    }, [])


    return <>
        <h3 className="follow">Followers</h3>
        {followers.length > 0 ? (
            <div>
                {followers.map(follower => (
                    <div className="followers" key={follower.id}>
                        <img className="follower-pic" src={follower.picture? BACE_URL + follower.picture : DEFAULT_PIC}/>
                        {follower.name} {" " + follower.surname}
                    </div>
                ))}
            </div>
        ): (
            <p>No followers length</p>
        )}
    </>
}