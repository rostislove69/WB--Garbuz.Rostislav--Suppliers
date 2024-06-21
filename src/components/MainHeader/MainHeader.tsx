import "./MainHeader.css";
import React, { useState } from "react";
import IconPlus from "../../images/icon-plus.svg";
import IconSearch from "../../images/icon-search.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { openModal } from "../../slices/modalSlice";
import Dropdown from "../Dropdown/Dropdown";
import { setSearchText } from "../../slices/searchSlice";
import { SortOptions } from "../../utils/types";
import { setSortOption } from "../../slices/sortSlice";

const MainHeader: React.FC = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { sortOption } = useSelector((state: RootState) => state.sort);
  const handleOpenModal = () => {
    dispatch(openModal({ modalType: "Add", modalProps: {} }));
  };

  const sortOptions = Object.values(SortOptions).map((sortOption) => ({
    value: sortOption,
    label: sortOption,
  }));

  const handleSortChange = (value: string) => {
    dispatch(setSortOption(value as SortOptions));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setText(value);
    dispatch(setSearchText(value));
  };

  return (
    <section className="main-header">
      <h1 className="title">Поставки</h1>
      <div className="control-panel">
        <button className="add-supply-button" onClick={handleOpenModal}>
          <img src={IconPlus} alt="Иконка добавить"></img>
          Добавить поставку
        </button>
        <div className="search-panel">
          <Dropdown
            value={sortOption}
            options={sortOptions}
            onChange={handleSortChange}
            type="sort"
            
          />
          <input
            className="search-panel__input"
            placeholder="Поиск..."
            value={text}
            onChange={handleInputChange}
          />
          <img src={IconSearch} alt="Иконка поиска"></img>
        </div>
      </div>
    </section>
  );
};

export default MainHeader;
