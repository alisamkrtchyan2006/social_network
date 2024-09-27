import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { InputUser } from '../../lib/types';
import { handleLogin } from '../../lib/api';

export function Login() {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<InputUser>({
        mode: 'onSubmit',
    });

    const onSubmit = async (data: InputUser) => {
        try {
            const response = await handleLogin(data);
            if (response.status === 'error' && response.message) {
                alert(response.message);
            } else {
                console.log('Login successful:', response);
                reset();
                navigate('/profile');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };



    return (
        <MDBContainer fluid>

            <MDBRow className='d-flex justify-content-center align-items-center'>

                <MDBCol lg='8'>

                    <MDBCard className='my-5 rounded-3' style={{ maxWidth: '600px' }}>
                        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp' className='w-100 rounded-top' alt="Sample photo" />

                        <MDBCardBody className='px-5'>

                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Login Info</h3>
                            <p>Don't you have an account? <Link to={'/'}>Signup Now</Link></p>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Login'
                                    type='text'
                                    {...register('login', {
                                        required: 'Login is required',
                                        pattern: {
                                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                            message: 'Invalid email format'
                                        }
                                    })}
                                />
                                {errors.login && <p className='text-danger'>{errors.login.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Password'
                                    type='text'
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters'
                                        }
                                    })}
                                />
                                {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                                
                                <button type='submit' className='btn btn-outline-info' >Submit</button>
                            </form>



                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>

        </MDBContainer>
    );
}
