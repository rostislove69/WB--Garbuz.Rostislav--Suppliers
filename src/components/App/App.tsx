import React, { useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddNewSupplyPopup from "../AddNewSupplyPopup/AddNewSupplyPopup";
import EditSupplyPopup from "../EditSupplyPopup/EditSupplyPopup";
import { useDispatch } from "react-redux";
import { getSupplys } from "../../slices/dataSlice";
import { AppDispatch } from "../../store";
import { getSum } from "../../slices/sumSlice";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getSupplys());
    dispatch(getSum());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Main />
      <AddNewSupplyPopup />
      <EditSupplyPopup />
    </>
  );
};

export default App;
