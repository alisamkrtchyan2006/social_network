import { useParams } from "react-router-dom";
import { Gallery } from "../../../components/gallery";
import { useEffect, useState } from "react";
import { IAccount } from "../../../lib/types";
import { handleGetUserById } from "../../../lib/api";

export const Account = () => {
    const { id } = useParams<{ id: string }>(); 
    const [account, setAccount] = useState<IAccount | null>(null); 
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        const userId = Number(id); 

        if (!isNaN(userId)) { 
            handleGetUserById(userId)
            .then(response => {
                if (response.payload) {
                    setAccount(response.payload as IAccount);
                    setError(null);
                } else {
                    setError("User not found."); 
                }
            })
            .catch(error => {
                console.error("Error fetching account", error);
                setError("Error fetching account."); 
            });
        } else {
            setError("Invalid user ID."); 
        }
    }, [id]);

    if (!account) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h3>{account.name} {account.surname}'s Account</h3>
            <p>Status: {account.isPrivate ? "Private" : "Public"}</p>

            {account.isPrivate ? (
                <p>This account is private.</p>
            ) : (
                <>
                    <h4>Posts</h4>
                    {account.posts && account.posts.length > 0 ? (
                        <Gallery posts={account.posts} />
                    ) : (
                        <p>No posts available.</p>
                    )}
                </>
            )}
        </div>
    );
};