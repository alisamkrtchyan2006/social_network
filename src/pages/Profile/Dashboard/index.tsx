import { useOutletContext } from "react-router-dom"
import { IContextType } from "../../../lib/types"
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';
import { BACE_URL, DEFAULT_COVER, DEFAULT_PIC } from "../../../lib/constant";
import { useRef } from "react";
import { handleUploadCover, handleUploadPicture } from "../../../lib/api";

export function Dashboard() {

    const {account, setAccount} = useOutletContext<IContextType>()
    const coverPicture = useRef<HTMLInputElement | null>(null)
    const photo = useRef<HTMLInputElement | null>(null)
    const handlePic = () => {
      if(photo.current) {
        const file = photo.current.files?.[0]
        if(file) {
          const form = new FormData()
          form.append("picture", file)
          handleUploadPicture(form)
          .then(response => {
            if(response.payload) {
              setAccount({...account, picture: response.payload as string})
            }
          })
        }
      }
    }

    const handleCover = () => {
      if(coverPicture.current) {
        const file = coverPicture.current.files?.[0]
        if(file) {
          const form = new FormData()
          form.append("cover", file)
          handleUploadCover(form)
          .then(response => {
            if(response.payload) {
              setAccount({...account, cover: response.payload as string})
            }
          })
        }
      }
    }


  return (
    <div className="gradient-custom-2" style={{ backgroundColor: '#9DE2FF' }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="9" xl="7">
                        <MDBCard>
                            <input type="file"
                                ref={coverPicture}
                                onChange={handleCover}
                                style={{ display: "none" }}
                            />
                            <div className="rounded-top text-white d-flex flex-row" style={{ height: '200px', position: 'relative' }}>
                                <input
                                 type="file" ref={photo}
                                  onChange={handlePic}
                                 style={{ display: "none" }} />
                                <MDBCardImage
                                    src={!account.cover ? DEFAULT_COVER : BACE_URL + account.cover}
                                    alt="Cover image"
                                    className="w-100"
                                    style={{ height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                                    onClick={() => coverPicture.current?.click()}
                                />
                                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px', position: 'absolute', bottom: '0', left: '20px' }}>
                                    <MDBCardImage
                                        src={!account.picture ? DEFAULT_PIC : BACE_URL + account.picture}
                                        alt="Profile picture"
                                        className="mt-4 mb-2 img-thumbnail"
                                        fluid
                                        style={{ width: '150px', zIndex: '1', cursor: 'pointer' }}
                                        onClick={() => photo.current?.click()}
                                    />
                                </div>
                                <div className="ms-3" style={{ marginTop: '130px', position: 'absolute', bottom: '0', left: '200px' }}>
                                    <MDBTypography tag="h5">{account.name} {account.surname}</MDBTypography>
                                    <MDBCardText>Yerevan</MDBCardText>
                                </div>
                            </div>
                            <div className="p-4 text-black" style={{ backgroundColor: '#F8F9FA' }}>
                                <div className="d-flex justify-content-end text-center py-1">
                                    <div>
                                        <MDBCardText className="mb-1 h5">253</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
                                    </div>
                                    <div className="px-3">
                                        <MDBCardText className="mb-1 h5">{account.followers.length}</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                                    </div>
                                    <div>
                                        <MDBCardText className="mb-1 h5">{account.following.length}</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                                    </div>
                                </div>
                            </div>
                            <MDBCardBody className="text-black p-4">
                                <div className="mb-5">
                                    <p className="lead fw-normal mb-1">About</p>
                                    <div className="p-4" style={{ backgroundColor: '#F8F9FA' }}>
                                        <MDBCardText className="font-italic mb-1">Web Developer</MDBCardText>
                                        <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText>
                                        <MDBCardText className="font-italic mb-0">Photographer</MDBCardText>
                                    </div>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
  );
}