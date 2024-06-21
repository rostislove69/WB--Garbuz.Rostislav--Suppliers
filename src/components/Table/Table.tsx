import "./Table.css";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { deleteSupply } from "../../slices/dataSlice";
import { openModal } from "../../slices/modalSlice";
import { Addresses } from "../../utils/types";
import { SortOptions } from "../../utils/types";

const Table: React.FC = () => {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.data
  );
  const { sortOption } = useSelector((state: RootState) => state.sort);
  const { searchText } = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch<AppDispatch>();

  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const itemsPerPage = 9;
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).classList.contains("row-button")
      ) {
        setMenuOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getAddress = (key: keyof typeof Addresses) => {
    return Addresses[key];
  };

  const handleButtonClick = (id: string) => {
    setMenuOpen((prevId) => (prevId === id ? null : id));
  };

  const handleEdit = (id: string) => {
    dispatch(openModal({ modalType: "Edit", modalProps: { supplyId: id } }));
    setMenuOpen(null);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteSupply(id))
      .then(() => {
        if (data.length % itemsPerPage === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      })
      .catch((error) => {
        console.error("Failed to delete supply:", error);
      });
    setMenuOpen(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleMouseEnter = (id: string) => {
    setHoveredRow(id);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const getDisplayedPages = () => {
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (endPage - startPage < 4) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + 4);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - 4);
      }
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const filteredData = data.filter(
    (item) =>
      item.data.number.toString().includes(searchText) ||
      item.data.date.includes(searchText) ||
      item.data.city.toLowerCase().includes(searchText.toLowerCase()) ||
      item.data.deliveryType.toLowerCase().includes(searchText.toLowerCase()) ||
      item.data.status.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) => {
    switch (sortOption) {
      case SortOptions.number:
        return a.data.number - b.data.number;
      case SortOptions.city:
        return a.data.city.localeCompare(b.data.city);
      case SortOptions.deliveryType:
        return a.data.deliveryType.localeCompare(b.data.deliveryType);
      case SortOptions.status:
        return a.data.status.localeCompare(b.data.status);
      default:
        return 0;
    }
  });

  const displayedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <div className="message-block">Загрузка...</div>;
  }

  if (error) {
    return <div className="message-block">Ошибка при загрузке данных.</div>;
  }

  if (totalPages === 0) {
    return <div className="message-block">Активных поставок нет.</div>;
  }

  return (
    <section className="table-container">
      <div className="table-header">
        <div className="table-cell">Номер</div>
        <div className="table-cell">Дата поставки</div>
        <div className="table-cell">Город</div>
        <div className="table-cell">Количество</div>
        <div className="table-cell">Тип поставки</div>
        <div className="table-cell">Склад</div>
        <div className="table-cell">Статус</div>
      </div>
      {displayedData.map((item) => (
        <div
          className={`table-row ${hoveredRow === item.id ? 'hovered' : ''}`}
          key={item.id}
          onMouseEnter={() => handleMouseEnter(item.id)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="table-cell number">
            <span>Номер</span>
            <p>{item.data.number}</p>
            <span
              className={`table-cell__status-mobile table-cell__status_${
                item.data.status === "В пути" ? "ok" : "err"
              }`}
            >
              {item.data.status}
            </span>
          </div>
          <div className="table-cell date">
            <span>Дата поставки</span>
            <p>{item.data.date}</p>
          </div>
          <div className="table-cell city">{item.data.city}</div>
          <div className="table-cell quantity">
            {item.data.quantity + " шт."}
          </div>
          <div className="table-cell delivery-type">
            {item.data.deliveryType}
          </div>
          <div className="table-cell stock">
            <p className="table-cell__stock-city">{item.data.stock}</p>
            <p className="table-cell__stock-address">
              {getAddress(item.data.stock)}
            </p>
          </div>
          <div className="table-cell status">
            <span
              className={`table-cell__status table-cell__status_${
                item.data.status === "В пути" ? "ok" : "err"
              }`}
            >
              {item.data.status}
            </span>
            <button
              className="row-button"
              onClick={() => handleButtonClick(item.id)}
            />
            <button
              className="row-button edit"
              onClick={() => handleEdit(item.id)}
            />
            {menuOpen === item.id && (
              <div className="dropdown-menu" ref={menuRef}>
                <button onClick={() => handleEdit(item.id)}>
                  Редактировать
                </button>
                <button onClick={() => handleDelete(item.id)}>
                  Отменить поставку
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
      {totalPages > 1 && (
        <div className="paginate">
          <ul>
            <li>
              <button onClick={handlePrevPage}>&lang;</button>
            </li>
            {getDisplayedPages().map((page) => (
              <li key={page}>
                <button
                  className={currentPage === page ? "active" : ""}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))}
            <li>
              <button onClick={handleNextPage}>&rang;</button>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
};

export default Table;
