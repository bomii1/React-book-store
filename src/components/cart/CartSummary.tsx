import React from 'react'
import styled from 'styled-components'
import { formatNumber } from '../../utils/format';

interface Props {
    totalQuantity: number;
    totalPrice: number;
}

const CartSummary = ({ totalQuantity, totalPrice }: Props) => {
  return (
    <CartSummaryStyle>
      <h1>주문요약</h1>
      <dl>
        <dt>{totalQuantity} 권</dt>
        <dd></dd>
      </dl>
      <dl>
        <dt>{formatNumber(totalPrice)} 원</dt>
        <dd></dd>
      </dl>
    </CartSummaryStyle>
  )
}

const CartSummaryStyle = styled.div`
    border: 1px solid ${({ theme }) => theme.color.border };
    border-radius: ${({ theme }) => theme.borderRadius.default };
    padding: 12px;
    width: 240px;

    h1 {
        font-size: 1.5rem;
        margin-bottom: 12px;
    }
    dl {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;

        dd {
        font-weight: 700;
        }
    }
`;

export default CartSummary
