export interface IUser {
    id: number
    name: string
    surname: string
    login: string
    password: string
    isPrivate: boolean
    cover: string
    picture: string
}


export type InputUser = Omit<IUser, 'id'|'isPrivate'|'cover'|'picture'>



export interface IResponse {
    status: string
    message?: string
    payload?: unknown
    user?:IWideUser
}


export interface IWideUser extends IUser {
    followers: IUser[]
    following: IUser[]
}


export interface IContextType {
    account: IWideUser
    setAccount: (user:IWideUser) => void
}



export interface IPasswordUpdate {
    old: string
    newpwd: string
}

export interface ILoginUpdate{
    password:string
    login:string
}



export interface NavLinkPolyfillProps {
    to: string
    end?: boolean
    children: React.ReactNode
    className?: string
    [key: string]: any
}


export interface IPost {
    id: number
    title: string
    picture: string
    likes: IUser[]
    isLiked: boolean
}



export interface IAccount extends IUser {
    posts?: IPost[]
    available: boolean
    connection: {
        blockedMe: boolean
        didIBlock: boolean
        following: boolean
        followsMe: boolean
        requested: boolean
    }
}



export interface IRequest {
    id: number         
    user: IUser
}