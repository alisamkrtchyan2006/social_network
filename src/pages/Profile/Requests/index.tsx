import { useEffect, useState } from 'react'
import { IRequest } from '../../../lib/types'
import { handleAcceptRequest, handleDeclineRequest, handleGetRequests } from '../../../lib/api'
import { BACE_URL, DEFAULT_PIC } from '../../../lib/constant'


export const Requests = () => {
    const [requests, setRequests] = useState<IRequest[]>([])
    const [error, setError] = useState<string | null>(null)



    useEffect(() => {
        handleGetRequests()
            .then(response => {
                if (response.payload) {
                    setRequests(response.payload as IRequest[])
                } else {
                    setError("Don't have a request");
                }
            })
    }, [])

    const acceptRequest = (id: number | undefined) => {
        handleAcceptRequest(id)
            .then(() => {
                setRequests([...requests.filter(request => request.id !== id)])
            })
    }

    const declineRequest = (id: number | undefined) => {
        handleDeclineRequest(id)
            .then(() => {
                setRequests([...requests.filter(request => request.id !== id)])
            })
    }

    if (error) {
        return <p>{error}</p>;
    }

    return <div className='request-block'>
            <h2>Follow Requests</h2>
            {requests.length === 0 ? (
                <p>No follow requests</p>
            ) : (
                requests.map(request => (
                    <div key={request.id} className="request-item">
                        <img className="pic" src={request.user.picture ? BACE_URL + request.user.picture : DEFAULT_PIC}/>
                        <p><strong>{request.user.name} {request.user.surname}</strong> wants to follow you</p>
                        <button onClick={() => acceptRequest(request.id)} className="btn btn-success">✓</button>
                        <button onClick={() => declineRequest(request.id)} className="btn btn-danger">X</button>
                    </div>
                ))
            )}
        </div>
}
