import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { IPost } from '../lib/types';
import { handleGetPost } from '../lib/api';
import { BACE_URL } from '../lib/constant';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height:500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export interface IProps{
    postId:number
    handleClose: () => void
}
export  function Post({postId, handleClose}:IProps) {

  const [post, setPost] = useState<IPost | null> (null)

  useEffect(() => {
    handleGetPost(postId)
    .then(response => {
      setPost(response.payload as IPost)
    })
  }, [postId])

  return (
    <div>
      <Modal
        open={true}
        onClose = {handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {post?.title} ID {post?.id}
            
          </Typography>
            <img 
              src={BACE_URL + post?.picture}
            />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Liked by:</strong>
            <div>
              {post?.likes && post?.likes.length > 0 ? (
                post?.likes.map(user => (
                  <div key={user.id}>
                    {user.name} {user.surname}
                  </div>
                ))
              ) : (
                <p>No likes yet</p>
              )}
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}






