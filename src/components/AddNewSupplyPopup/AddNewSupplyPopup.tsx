import "./AddNewSupplyPopup.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { addSupply } from "../../slices/dataSlice";
import { closeModal } from "../../slices/modalSlice";
import { RootState, AppDispatch } from "../../store";
import {
  SupplyData,
  Cities,
  DeliveryType,
  Stocks,
  Status,
} from "../../utils/types";
import { updateSum } from "../../slices/sumSlice";
import Dropdown from "../Dropdown/Dropdown";
import Calendar from "../Calendar/Calendar";

const AddNewSupplyPopup: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { modalType } = useSelector((state: RootState) => state.modal);
  const { sum } = useSelector((state: RootState) => state.sum);

  const [date, setDate] = useState("");
  const [city, setCity] = useState<Cities>(Cities.Moscow);
  const [quantity, setQuantity] = useState("0");
  const [deliveryType, setDeliveryType] = useState<DeliveryType>(
    DeliveryType.box
  );
  const [stock, setStock] = useState<Stocks>(Stocks.stock);
  const [status, setStatus] = useState<Status>(Status.transit);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    const newSupply: SupplyData = {
      number: sum + 1,
      date,
      city,
      quantity,
      deliveryType,
      stock,
      status,
    };
    dispatch(addSupply(newSupply))
      .then(() => {
        dispatch(updateSum(sum + 1));
        dispatch(closeModal());
        setDate("");
        setCity(Cities.Moscow);
        setQuantity("0");
        setDeliveryType(DeliveryType.box);
        setStock(Stocks.stock);
        setStatus(Status.transit);
      })
      .catch((error: Error) => {
        console.error("Failed to add supply:", error);
      });
  }

  if (modalType !== "Add") {
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

  const handleToggle = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  const setCalendarValue = (value: string) => {
    setDate(value);
    setIsCalendarOpen(false);
  };

  return (
    <PopupWithForm
      title="Новая поставка"
      supplyNumber={`#${sum + 1}`}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <label className="popup__form-block">
        <span className="popup__block-title">Дата поставки</span>
        <input
          className="popup__input"
          type="text"
          value={date}
          pattern="\d{2}\.\d{2}\.\d{4}"
          placeholder="__.__.____"
          maxLength={10}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button
          className="popup__calendar-button"
          type="button"
          onClick={handleToggle}
        />
        {isCalendarOpen && (
          <Calendar
            value={date}
            onChange={(value) => setCalendarValue(value)}
          />
        )}
      </label>
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
        <span className="popup__block-title">Количество</span>
        <input
          className="popup__input"
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <span className="popup__quantity">шт.</span>
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

export default AddNewSupplyPopup;
