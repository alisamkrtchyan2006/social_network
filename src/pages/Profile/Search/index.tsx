import { useEffect, useState } from "react"
import { IUser } from "../../../lib/types"
import { handleSearch } from "../../../lib/api"
import { BACE_URL, DEFAULT_COVER, DEFAULT_PIC } from "../../../lib/constant"

export const Search = () => {

    const [users, setUsers] = useState<IUser[]>([])
    const [text, setText] = useState<string>("")

    useEffect(() => {
        if(!text.trim()) {
            setUsers([])
        }else {
            handleSearch(text) 
            .then(response => {
                setUsers(response.payload as IUser[])
            })
        }
    }, [text])

    return <div style={{padding:10}}>
        <h3>Search</h3>
        <input
            placeholder="Search for a friends..."
            className="form-control"
            value={text}
            onChange={e => setText(e.target.value)}
        />
        {users.length > 0 && <small>{users.length} users found</small>}
        <div className="post-block">
            {
                users.map(user => 
                    <div>
                        <img
                            className="post-picture"
                            src={user.picture? BACE_URL + user.picture : DEFAULT_PIC}
                        />
                        <p>{user.name} {user.surname}</p>
                    </div>
                )
            }
        </div>
    </div>
}