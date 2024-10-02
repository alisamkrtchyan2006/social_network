import { useNavigate, useParams } from "react-router-dom";
import { Gallery } from "../../../components/gallery";
import { useEffect, useState } from "react";
import { IAccount } from "../../../lib/types";
import { handleCancelRequest, handleGetAccount, handleSendFollow, handleUnfollow } from "../../../lib/api";
import { BACE_URL, DEFAULT_PIC, PRIVATE_ACCOUNT } from "../../../lib/constant";

export const Account = () => {
    const { id } = useParams<{ id: string }>(); 
    const [account, setAccount] = useState<IAccount | null>(null); 
    const [error, setError] = useState<string | null>(null); 
    const navigate = useNavigate()



    const handleRequest = () => {
        if(account) {
            if(account.connection.following) {
                unfollowUser()
            }else if(account.connection.requested) {
                cancelRequest()
            } else {
                followUser()
            }
        }
    }

    const followUser = () => {
        if(account && account.id) {
            handleSendFollow(account.id)
            .then(response => {
                if(response.status == "following") {
                    setAccount({
                        ...account,
                        connection: {...account.connection, following:true}
                    })
                }else if (response.status == "requested") {
                    setAccount({
                        ...account,
                        connection: {...account.connection, requested: true}
                    })
                }
            })
        }
    }

    const unfollowUser = () => {
        if(account && account.id) {
            setAccount({
                ...account,
                connection: { ...account.connection, following: false }
            }); 
            handleUnfollow(account.id)
            .then(response => {
                if(response.status === "unfollowed") {
                    setAccount({
                        ...account,
                        connection: { ...account.connection, following: false }
                    })
                }
            })
        }
    }
    const cancelRequest = () => {
        if(account && account.id) {
            setAccount({
                ...account,
                connection: { ...account.connection, requested: false }
            });
            handleCancelRequest(account.id)
            .then(response => {
                if(response.status === "request_cancelled") {
                    setAccount({
                        ...account,
                        connection: { ...account.connection, requested: false }
                    })
                }
            })
        }
    }

    useEffect(() => {
        if (id) { 
            handleGetAccount(id)
            .then(response => {
                if (response.payload) {
                    setAccount(response.payload as IAccount)
                } else {
                    navigate("/profile")
                }
            })
        }
    }, [id])

    if (!account) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div>
            <div className="account-pic">
                <img className="pic" src={account.picture ? BACE_URL + account.picture : DEFAULT_PIC}/>
            </div>
            <h3 className="account-name">{account.name} {account.surname}</h3>
            <div className="follow-btn">
                <button onClick={handleRequest}>
                    {
                        account.connection.following ?
                        "UNFOLLOW" :
                        account.connection.followsMe ?
                        "FOLLOW BACK" :
                        account.connection.requested ? 
                        "CANCEL REQUEST" :
                        "FOLLOW"
                    }
                </button>
            </div>
            {account.isPrivate? 
                <div className="private-pic">
                    <img src={PRIVATE_ACCOUNT}/>
                </div>
            : 
            <>
                <h4 className="public-post">Posts</h4>
                <p className="public-text">
                    {account.posts && account.posts.length > 0 ? (
                        <Gallery posts={account.posts} />
                    ) : (
                        <p>No posts available.</p>
                    )}
                </p>
            </>
            }

        </div>
    )
}