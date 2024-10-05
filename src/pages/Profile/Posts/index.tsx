import { useEffect, useRef, useState } from "react"
import { handelPostCreation, handleDeletePost, handleGetPosts } from "../../../lib/api"
import { IPost } from "../../../lib/types"
import { Gallery } from "../../../components/gallery"

export const Posts = () => {

    const [list, setList] = useState<IPost[]> ([])
    const [text, setText] = useState<string>('')

    const photo = useRef<HTMLInputElement | null>(null)

    const handleUpload = () => {
        if(photo.current) {
            const file = photo.current.files?.[0]
            if (file) {
                const form = new FormData()
                form.append('photo', file)
                form.append('content', text)

                handelPostCreation(form)
                .then(response => {
                    setList([...list, response.payload as IPost])
                })
            }
        }
    }


    const handleDelete = (id: number) => {
        handleDeletePost(id)
            .then(() => {
                setList(list.filter(post => post.id !== id))
            })
    }

    useEffect(() => {
        handleGetPosts()
        .then(response => {
            console.log(response.payload)
            setList(response.payload as IPost[])
        })
    }, [])

    return <>
        <h3 className="posts">Posts</h3>

        <input
            type="file"
            style={{display:'none'}}
            ref={photo}
            onChange={handleUpload}
        />

        <input
            className="form-control"
            placeholder="what's on your mind?"
            value={text}
            onChange={e => setText(e.target.value)}
        />
        <div className="upload-block">
            <button onClick={() => photo.current?.click()}>Upload</button>
        </div>

        <Gallery 
            posts={list}
            onDeletePost={handleDelete}
        />
    </>
}