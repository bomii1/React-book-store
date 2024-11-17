import React from 'react'
import { styled } from 'styled-components'
import logo from '../../assets/logo.png'
import { FaSignInAlt, FaRegUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useCategory } from '../../hook/useCategory'


const Header = () => {

  const { category } = useCategory();

  return (
    <HeaderStyled>
      <h1 className='logo'>
        <Link to='/'>
        <img src={logo} alt='book store'/>
        </Link>
      </h1>
      <nav className='category'>
        <ul>
          {
            category.map((item) => 
              <li key={item.category_id}>
                <Link to={item.category_id === null ? `/books` : `/books?.category_id=${item.category_id}`}>
                  {item.category_name}
                </Link>
              </li>
            )
          }
        </ul>
      </nav>
      <nav className='auth'>
          <ul>
            <li>
              <Link to="/login">
                <FaSignInAlt />로그인
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <FaRegUser />회원가입
              </Link>
            </li>
          </ul>
      </nav>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  // background-color: ${({theme}) => theme.color.background};

  // h1 {
  //   color: ${(props) => props.theme.color.primary}; // ; 이거 안찍으면 적용안됨 왜?
  // }

  width: 100%;
  margin: 0 auto; // 가운데 정렬
  max-width: ${({ theme }) => theme.layout.width.large};
  display: flex;
  justify-content: space-between;
  align-item: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.background};

  .logo {
    img {
      width: 250px
    }
      margin: -15px;
  }

  .category {
    ul {
      display: flex;
      gap: 32px;
      li {
        a {
          font-size: 1.5rem;
          font-weight: 600;
          text-decoration: none;
          color: ${({ theme }) => theme.color.text};
          &:hover {
            color: ${({ theme }) => theme.color.primary};
          }
        }
      }
    }
  }

  .auth {
    ul {
      display: flex;
      gap: 14px;
      li {
        a {
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-item: center;
          line-height: 1;

          svg {
            margin-right: 6px;
          }
        }
      }

    }
  }

`

export default Header
