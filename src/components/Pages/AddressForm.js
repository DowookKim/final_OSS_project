// AddressForm.js
import React from 'react';
import { useForm } from 'react-hook-form';

const AddressForm = ({ onClose, onSubmit }) => {
  const { register, handleSubmit } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data); // 부모 컴포넌트의 onSubmit 호출
    onClose(); // 팝업 닫기
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h4>주문 정보 입력</h4>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">이름</label>
            <input {...register("name")} className="form-control" required />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">주소</label>
            <input {...register("address")} className="form-control" required />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">전화번호</label>
            <input {...register("phone")} className="form-control" required />
          </div>
          <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label">카드 번호</label>
            <input {...register("cardNumber")} className="form-control" required />
          </div>
          <div className="mb-3">
            <label htmlFor="expiryDate" className="form-label">유효 기간 (MM/YY)</label>
            <input {...register("expiryDate")} className="form-control" required />
          </div>
          <div className="mb-3">
            <label htmlFor="cvv" className="form-label">CVV</label>
            <input {...register("cvv")} className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary">제출</button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>취소</button>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
