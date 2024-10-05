import axios from "axios";
import { ILoginUpdate, InputUser, IPasswordUpdate, IResponse} from "./types";

const Axios = axios.create({
    baseURL:"http://localhost:4002",
    withCredentials: true
})


export const handleSignup = async(user:InputUser):Promise<IResponse> => {
    const response = await Axios.post("/signup", user)
    return response.data
}

export const handleLogin = async(user:InputUser):Promise<IResponse> => {
    const response = await Axios.post("/login", user)
    return response.data
}

export const handleVerify = async ():Promise<IResponse> => {
    const response = await Axios.get("/verify")
    return response.data
}



export const handleLogout = async ():Promise<IResponse> => {
    const response = await Axios.post("/logout")
    return response.data
}


export const handleUpdatePassword = async(password:IPasswordUpdate):Promise<IResponse> => {
    const response = await Axios.patch("/update/password",password)
    return response.data
}

export const handleUpdateLogin = async(login:ILoginUpdate): Promise<IResponse> => {
    const response = await Axios.patch("/update/login",login)
    return response.data
}


export const handleUploadPicture = async(data:FormData): Promise<IResponse> => {
    const response = await Axios.patch("/profile/upload",data)
    return response.data
}


export const handleUploadCover = async(data:FormData): Promise<IResponse> => {
    const response = await Axios.patch("/cover/upload",data)
    return response.data
}


export const handleGetPosts = async (): Promise<IResponse> => {
    const response = await Axios.get("/posts")
    return response.data
}


export const handelPostCreation = async (data:FormData): Promise<IResponse> => {
    const response = await Axios.post("/posts", data)
    return response.data
}


export const handleSearch = async (text:string):Promise<IResponse> => {
    const response = await Axios.get("/search/" + text)
    return response.data
}



export const handleSetAccountStatus = async (isPrivate: boolean): Promise<IResponse> => {
    const response = await Axios.patch("/account/set", { isPrivate })
    return response.data
}



export const handleGetAccount = async (id: number | string): Promise<IResponse> => {
    const response = await Axios.get("/account/" + id)
    return response.data
}


export const handleSendFollow = async (id: number): Promise<IResponse> => {
    const response = await Axios.post('/account/follow/' + id)
    return response.data
}


export const handleUnfollow = async (id: number): Promise<IResponse> => {
    const response = await Axios.post('/account/unfollow/' + id)
    return response.data
}


export const handleCancelRequest = async (id: number): Promise<IResponse> => {
    const response = await Axios.delete('/request/cancel/' + id)
    return response.data
}



export const handleGetRequests = async (): Promise<IResponse> => {
    const response = await Axios.get("/requests")
    return response.data
}



export const handleAcceptRequest = async (id: number | undefined): Promise<IResponse> => {
    const response = await Axios.patch('/requests/accept/' + id)
    return response.data
}



export const handleDeclineRequest = async (id: number | undefined): Promise<IResponse> => {
    const response = await Axios.patch('/requests/decline/' + id)
    return response.data
}


export const handlePostReaction = async (id: number): Promise<IResponse> => {
    const response = await Axios.post('/posts/react/' + id)
    return response.data
}


export const handleBlockAccount = async (id: number | undefined): Promise<IResponse> => {
    const response = await Axios.post('/block/' + id)
    return response.data
}


export const handleDeletePost = async (postId: number): Promise<IResponse> => {
    const response = await Axios.delete(`/posts/${postId}`)
    return response.data
}


export const handleGetPost = async (id: number): Promise<IResponse> => {
    const response = await Axios.get('/posts/' + id)
    return response.data
}


export const handleGatFollowers = async (): Promise<IResponse> => {
    const response = await Axios.get('/followers')
    return response.data
}


export const handleGetFollowing = async (): Promise<IResponse> => {
    const response = await Axios.get('/following')
    return response.data
}

