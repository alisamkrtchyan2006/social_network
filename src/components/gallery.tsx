import { useState } from "react"
import { handlePostReaction } from "../lib/api"
import { BACE_URL } from "../lib/constant"
import { IPost } from "../lib/types"
import { Post } from "./post"

interface IProps {
    posts: IPost[]
    onUpdatePost?: (id:number) => void
    onDeletePost?: (id: number) => void    

}

export const Gallery:React.FC<IProps> = ({posts, onUpdatePost, onDeletePost}: IProps) => {

    const [currentPost, setCurrentPost] = useState<number>(-1)

    const reactPost = (id:number) => {
        handlePostReaction(id)
            .then(() => {
                if(onUpdatePost) {
                    onUpdatePost(id)
                }
            })
    }
    return <>
        <p className="posts-length">You have {posts.length} posts</p>
        <div className="post-block">
            {
                posts.map(post => 
                    <div key={post.id} className="post">
                        <img className="post-picture post-img"
                            src={BACE_URL + post.picture}
                        />
                        <div onClick={() => setCurrentPost(post.id)} className="cover"></div>
                        <img
                            onClick={() => reactPost(post.id)}
                            className="like-btn"
                            src={
                                post.isLiked ?
                                "https://cdn0.iconfinder.com/data/icons/sweets/128/heart_love_pink.png"
                                :
                                "https://cdn0.iconfinder.com/data/icons/sweets/128/heart_love_white.png"
                                }
                        />
                        <button className="delete" onClick={() => onDeletePost?.(post.id)}>delete</button>
                    </div>
                )
            }
        </div>
        {currentPost != -1 && <Post handleClose={() => setCurrentPost(-1)} postId={currentPost}/>}
    </>
}