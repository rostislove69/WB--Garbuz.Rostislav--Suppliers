import "./PopupWithForm.css";
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { closeModal } from "../../slices/modalSlice";

interface PopupWithFormProps {
  title: string;
  supplyNumber: string;
  onSubmit: (evt: React.FormEvent) => void;
  children: React.ReactNode;
  buttonText: string;
}

const PopupWithForm: React.FC<PopupWithFormProps> = ({
  title,
  supplyNumber,
  onSubmit,
  children,
  buttonText,
}) => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.modal);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeypress = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        dispatch(closeModal());
      }
    };

    const onClickOutside = (evt: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(evt.target as Node)) {
        dispatch(closeModal());
      }
    };

    document.addEventListener("keydown", onKeypress);
    document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("keydown", onKeypress);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [dispatch]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup">
      <div className="popup__container" ref={popupRef}>
        <h2 className="popup__title">{title}</h2>
        <p className="popup__supply-number">{supplyNumber}</p>
        <button
          className="popup__button-close"
          onClick={() => dispatch(closeModal())}
        ></button>
        <form className="popup__form" onSubmit={onSubmit}>
          {children}
          <div className="popup__buttons">
            <button type="submit">{buttonText}</button>
            <button type="button" onClick={() => dispatch(closeModal())}>
              Отменить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
