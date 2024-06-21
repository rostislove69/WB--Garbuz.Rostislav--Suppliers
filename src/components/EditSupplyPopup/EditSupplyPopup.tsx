import "./EditSupplyPopup.css";
import React, { useState, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { updateSupply } from "../../slices/dataSlice";
import { closeModal } from "../../slices/modalSlice";
import {
  SupplyData,
  Cities,
  DeliveryType,
  Stocks,
  Status,
} from "../../utils/types";
import Dropdown from "../Dropdown/Dropdown";

const EditSupplyPopup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { modalType, modalProps } = useSelector(
    (state: RootState) => state.modal
  );
  const supply = useSelector((state: RootState) =>
    state.data.data.find((item) => item.id === modalProps.supplyId)
  );

  const [number, setNumber] = useState(supply?.data.number || 0);
  const [date, setDate] = useState(supply?.data.date || "");
  const [city, setCity] = useState<Cities>(supply?.data.city || Cities.Moscow);
  const [quantity, setQuantity] = useState(supply?.data.quantity || "0");
  const [deliveryType, setDeliveryType] = useState<DeliveryType>(
    supply?.data.deliveryType || DeliveryType.box
  );
  const [stock, setStock] = useState<Stocks>(
    supply?.data.stock || Stocks.stock
  );
  const [status, setStatus] = useState<Status>(
    supply?.data.status || Status.transit
  );

  useEffect(() => {
    if (supply) {
      setNumber(supply.data.number);
      setDate(supply.data.date);
      setCity(supply.data.city);
      setQuantity(supply.data.quantity);
      setDeliveryType(supply.data.deliveryType);
      setStock(supply.data.stock);
      setStatus(supply.data.status);
    }
  }, [supply]);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    const updatedSupply: SupplyData = {
      number,
      date,
      city,
      quantity,
      deliveryType,
      stock,
      status,
    };
    dispatch(updateSupply({ id: modalProps.supplyId, data: updatedSupply }))
      .then(() => {
        dispatch(closeModal());
      })
      .catch((error) => {
        console.error("Failed to update supply:", error);
      });
  };

  if (modalType !== "Edit") {
    return null;
  }

  const cityOptions = Object.values(Cities).map((city) => ({
    value: city,
    label: city,
  }));
  const deliveryTypeOptions = Object.values(DeliveryType).map((type) => ({
    value: type,
    label: type,
  }));
  const stockOptions = Object.values(Stocks).map((stock) => ({
    value: stock,
    label: stock,
  }));
  const statusOptions = Object.values(Status).map((status) => ({
    value: status,
    label: status,
  }));

  return (
    <PopupWithForm
      title="Редактирование"
      supplyNumber={"#" + number}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <label className="popup__form-block">
        <span className="popup__block-title">Город</span>
        <Dropdown
          value={city}
          options={cityOptions}
          onChange={(value) => setCity(value as Cities)}
          type="in-modal"
          title="Город"
        />
      </label>
      <label className="popup__form-block">
        <span className="popup__block-title">Тип поставки</span>
        <Dropdown
          value={deliveryType}
          options={deliveryTypeOptions}
          onChange={(value) => setDeliveryType(value as DeliveryType)}
          type="in-modal"
          title="Тип поставки"
        />
      </label>
      <label className="popup__form-block">
        <span className="popup__block-title">Количество</span>
        <input
          className="popup__input"
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <span className="popup__quantity">шт.</span>
      </label>
      <label className="popup__form-block">
        <span className="popup__block-title">Склад</span>
        <Dropdown
          value={stock}
          options={stockOptions}
          onChange={(value) => setStock(value as Stocks)}
          type="in-modal"
          title="Склад"
        />
      </label>
      <label className="popup__form-block">
        <span className="popup__block-title">Статус</span>
        <Dropdown
          value={status}
          options={statusOptions}
          onChange={(value) => setStatus(value as Status)}
          type="in-modal"
          title="Статус"
        />
      </label>
    </PopupWithForm>
  );
};

export default EditSupplyPopup;
