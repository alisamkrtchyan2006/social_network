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