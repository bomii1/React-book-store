import Title from '../components/common/Title'
import InputText from '../components/common/InputText'
import Button from '../components/common/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import useAlert from '../hook/useAlert'
import { SignUpStyle } from './Signup'
import { useState } from 'react'
import { resetPassword, resetRequest } from '../api/auth.api'

export interface SignupProps {
  email: string;
  password: string;
}

const ResetPassword = () => {

  const navigate = useNavigate();
  const showAlert = useAlert();

  const [resetRequested, setResetRequested] = useState(false);

  const { 
    register, 
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  const onSubmit = (data: SignupProps) => {
    if (resetRequested) {
        // 초기화 함수 호출
        resetPassword(data).then(() => {
          showAlert ('비밀번호가 초기화되었습니다');
          navigate('/login'); // 로그인으로 이동
        })
    } else {
        // 요청
        resetRequest(data).then(() => {
            setResetRequested(true);
        })
    }
  };

  // console.log(errors);

  return (
    <>
        <Title size='large'>비밀번호 초기화</Title>
        <SignUpStyle>
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                <InputText 
                  placeholder='이메일' 
                  inputType='email'
                  {...register('email', { required: true })} />
                  {errors.email && <p className='error-text'>이메일을 입력해주세요</p>}
              </fieldset>
              {resetRequested && (
                <fieldset>
                <InputText 
                  placeholder='비밀번호' 
                  inputType='password'
                  {...register('password', { required: true })} />
                  {errors.password && <p className='error-text'>비밀번호를 입력해주세요</p>}
              </fieldset>
              )}
              <fieldset>
                <Button type='submit' size='medium' scheme='primary'>
                  {resetRequested ? "비밀번호 초기화" : "초기화 요청"}
                </Button>
              </fieldset>
              <div className='info'>
                <Link to='/reset'>비밀번호 초기화</Link>
              </div>
            </form>
        </SignUpStyle>
    </>
  )
}


export default ResetPassword
