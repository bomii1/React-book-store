import styled from 'styled-components'
import { Cart } from '../../models/cart.models'
import Button from '../common/Button';
import Title from '../common/Title';
import { formatNumber } from '../../utils/format';
import CheckIconButton from './CheckIconButton';
import { useMemo } from 'react';
import useAlert from '../../hook/useAlert';

interface Props {
    cart: Cart;
    checkedItems: number[];
    onCheck: (id: number) => void;
    onDelete: (id: number) => void;
}

const CartItem = ({ cart, checkedItems, onCheck, onDelete }: Props) => {

  const { showConfirm } = useAlert();

  // 체크 여부 확인
  const isChecked = useMemo(() => {
    return checkedItems.includes(cart.id);
  }, [checkedItems, cart.id]);

  const handleCheck = () => {
    onCheck(cart.id);
  }

  const handleDelete = () => {
    // 잘못 눌렀을 수도 있으니 컨펌
    showConfirm('정말 삭제하시겠습니까?', () => {
      onDelete(cart.id);
    });
  }

  // isChecked 는 아이콘 표시를 위한 state
  // onCheck 는 checkedItems 셋팅을 위한
  return (
    <CartItemStyle>
      <div className="info">
          <div className="check">
            <CheckIconButton isChecked={isChecked} onCheck={handleCheck} />
          </div>
          <div>
            <Title size='medium'>{cart.title}</Title>
            <p className="summary">{cart.summary}</p>
            <p className="price">{formatNumber(cart.price)} 원</p>
            <p className="quantity">{cart.quantity} 권</p>
          </div>
      </div>
      <Button size='medium' scheme='normal' onClick={handleDelete}>
        장바구니 삭제
      </Button>
    </CartItemStyle>
  )
};

const CartItemStyle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    border: 1px solid ${({ theme }) => theme.color.border };
    border-radius: ${({ theme }) => theme.borderRadius.default };
    padding: 12px;

    .info {
      display: flex;
      align-items: start;
      flex: 1;

      .check {
        width: 40px;
        flex-shrink: 0;
      }

      p {
        padding: 0 0 8px 0;
        margin: 0;
      }
    }
`;

// align-items 는 기본적으로 스트레치라고 하는 형제 엘리먼트만큼 늘린다가 기본값
// start, end, center 로 맞춰주면 자신이 가지고 있는 크기만큼 크기를 가지게 됨

export default CartItem
