import styled from 'styled-components'
import Title from '../components/common/Title'
import InputText from '../components/common/InputText'
import Button from '../components/common/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { signup } from '../api/auth.api'
import useAlert from '../hook/useAlert'

export interface SignupProps {
  email: string;
  password: string;
}

const Signup = () => {

  const navigate = useNavigate();
  const { showAlert } = useAlert();

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  // };

  const { 
    register, 
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  const onSubmit = (data: SignupProps) => {
    signup(data).then((res) => {
      // 성공
      showAlert('회원가입이 완료되었습니다');
      navigate('/login');
    })
  };

  // console.log(errors);

  return (
    <>
        <Title size='large'>회원가입</Title>
        <SignUpStyle>
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                <InputText 
                  placeholder='이메일' 
                  inputType='email'
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  {...register('email', { required: true })} />
                  {errors.email && <p className='error-text'>이메일을 입력해주세요</p>}
              </fieldset>
              <fieldset>
                <InputText 
                  placeholder='비밀번호' 
                  inputType='password'
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  {...register('password', { required: true })} />
                  {errors.password && <p className='error-text'>비밀번호를 입력해주세요</p>}
              </fieldset>
              <fieldset>
                <Button type='submit' size='medium' scheme='primary'>
                  회원가입
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

export const SignUpStyle = styled.div`
  max-width: ${({ theme }) => theme.layout.width.small };
  margin: 80px auto;

  fieldset { 
    border: 0;
    padding: 0 0 8px 0;
    .error-text {
      color: red;
    }
  }

  input {
    width: 100%;
  }

  button {
    width: 100%;
  }

  .info {
    text-align: center;
    padding: 16px 0 0 0;
  }
`;

export default Signup
