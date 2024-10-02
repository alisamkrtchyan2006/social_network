import { BACE_URL } from "../lib/constant"
import { IPost } from "../lib/types"

interface IProps {
    posts: IPost[]
}

export const Gallery:React.FC<IProps> = ({posts}) => {
    return <>
        <p className="posts-length">You have {posts.length} posts</p>
        <div className="post-block">
            {
                posts.map(post => 
                    <div key={post.id}>
                        <img className="post-picture"
                            src={BACE_URL + post.picture}
                        />
                        <p>{post.title}</p>
                    </div>
                )
            }
        </div>
    </>
}