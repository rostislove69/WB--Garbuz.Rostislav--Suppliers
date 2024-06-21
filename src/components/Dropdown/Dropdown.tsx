import React, { useState, useRef, useEffect } from "react";
import "./Dropdown.css";

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  type: string;
  title?: string;
}

const Dropdown: React.FC<CustomDropdownProps> = ({
  value,
  options,
  onChange,
  type,
  title,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleOptionClick = (optionValue: string, event: React.MouseEvent) => {
    event.preventDefault();
    setIsMenuOpen(false);
    onChange(optionValue);
  };

  const handleCloseButtonClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsMenuOpen(false);
  };

  return (
    <div className={`dropdown ${type}`} ref={dropdownRef}>
      <button
        type="button"
        className={`dropdown__toggle ${isMenuOpen ? "active" : ""}`}
        onClick={handleToggle}
      >
        {options.find((option) => option.value === value)?.label}
        <div className="dropdown__button-image" />
      </button>
      {isMenuOpen && (
        <div className="dropdown__list">
          <div className="dropdown__mobile-header">
            <h3 className="dropdown__mobile-titul">{title ? title : ""}</h3>
            <button type="button" className="dropdown__mobile-close-button" onClick={handleCloseButtonClick}/>
          </div>
          <ul className="dropdown__options">
            {options.map((option) => (
              <li
                key={option.value}
                className={`dropdown__option ${
                  option.value === value ? "active" : ""
                }`}
                onClick={(event) => handleOptionClick(option.value, event)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
