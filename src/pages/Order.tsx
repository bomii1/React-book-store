import { useLocation, useNavigate } from "react-router";
import Title from "../components/common/Title";
import { CartStyle } from "./Cart";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/common/Button";
import InputText from "../components/common/InputText";
import { useForm } from "react-hook-form";
import { Delivery, OrderSheet } from "../models/order.models";
import FindAddressButton from "../components/order/FindAddressButton";
import { order } from "../api/order.api";
import useAlert from "../hook/useAlert";

interface DeliveryForm extends Delivery {
    addressDetail: string;
}

const Order = () => {

  const { showAlert, showConfirm } = useAlert();

  const location = useLocation();
  const navigate = useNavigate();
  const orderDataFromCart = location.state; // 장바구니에서 온 정보
  const { totalQuantity, totalPrice, firstBookTitle } = orderDataFromCart;

  const { register, 
          handleSubmit,
          setValue,
          formState: {errors}
        } = useForm<DeliveryForm>();
        
  const handlePay = (data: DeliveryForm) => {
    // console.log(data);
    const orderData: OrderSheet = {
        ...orderDataFromCart,
        delivery: {
            ...data,
            address: `${data.address} ${data.addressDetail}`
        }
    };
    console.log(orderData);

    // 서버로 넘기기 전에 질문 -> 바로 넘어가면 위험하기 때문
    showConfirm('주문을 진행하시겠습니까?', () => {
        // 서버로 넘긴다
        order(orderData).then(() => {
            showAlert('주문이 처리되었습니다');
            navigate('/orderList');
        });
    });
  }

  return (
    <>
        <Title size='large'>주문서 작성</Title>
        <CartStyle>
            <div className="content">
                <div className="order-info">
                    <Title size='medium' color='text'>배송 정보</Title>
                    <form className="delivery">
                        <fieldset>
                            <label>주소</label>
                            <div className="input">
                                <InputText inputType="text" 
                                    {...register('address', { required: true })} />
                            </div>
                            <FindAddressButton onCompleted={(address) => {
                                setValue('address', address);
                            }}/>
                        </fieldset>
                        {
                            errors.address && (<p className="error-text">주소를 입력해주세요</p>)
                        }
                        <fieldset>
                            <label>상세 주소</label>
                            <div className="input">
                                <InputText inputType="text" 
                                    {...register('addressDetail', { required: true })} />
                            </div>
                        </fieldset>
                        <fieldset>
                            <label>수령인</label>
                            <div className="input">
                                <InputText inputType="text" 
                                    {...register('receiver', { required: true })} />
                            </div>
                        </fieldset>
                        <fieldset>
                            <label>전화번호</label>
                            <div className="input">
                                <InputText inputType="text" 
                                    {...register('contact', { required: true })} />
                            </div>
                        </fieldset>
                    </form>
                </div>
                <div className="order-info">
                    <Title size='medium' color="text">주문 상품</Title>
                    <strong>{firstBookTitle} 등 총 {totalQuantity} 권</strong>
                </div>
            </div>
            <div className="summary">
                <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
                <Button size='large' scheme='primary' onClick={handleSubmit(handlePay)}>결제 하기</Button>
            </div>
        </CartStyle>
    </>
  )
}

export default Order