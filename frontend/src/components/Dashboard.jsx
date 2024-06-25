import React from "react";
import TransactionChart from "./Transaction/TransactionChart";
import TransactionList from "./Transaction/TransactionList";



const Dashboard = () => {
  return (
    <>
      <TransactionChart />
      <TransactionList />
    </>
  );
};

export default Dashboard;