import React, { useEffect, useRef, useState } from "react";

const DashboardHome = () => {
  const [todayStatus, setTodayStatus] = useState([]);
  const [searchStatus, setSearchStatus] = useState([]);
  const today =
    new Date().getDate() +
    "/" +
    new Date().getMonth() +
    "/" +
    new Date().getFullYear();

  useEffect(() => {
    fetch("https://ancient-wildwood-60100.herokuapp.com/dateList?date=" + today)
      .then((res) => res.json())
      .then((data) => setTodayStatus(data));
  }, [today]);
  const searchDate = useRef(null);

  const handleSearch = () => {
    const date = searchDate.current.value;
    console.log(date);
    fetch("https://ancient-wildwood-60100.herokuapp.com/dateList?date=" + date)
      .then((res) => res.json())
      .then((dateQuery) => setSearchStatus(dateQuery));
  };

  useEffect(() => {
    fetch("");
  }, []);

  return (
    <div>
      <div>
        <h4 style={{ color: "#2596be" }}>
          Total Queries of <b>{today}</b>
        </h4>
        <table className="table table-borderless table-hover">
          <thead>
            <tr className="text-secondary">
              <th>#</th>
              <th>Agent Name</th>
              <th>Query Date</th>
              <th>Customer Name</th>
              <th>Channel</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Product Query</th>
              <th>Sell Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {todayStatus.map((status, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{status.agent}</td>
                <td>
                  {status.hours + ":" + status.minutes + ":" + status.seconds}
                </td>
                <td>{status.customerName}</td>
                <td>{status.channel}</td>
                <td>{status.phone}</td>
                <td>{status.address}</td>
                <td>{status.productQuery}</td>
                <td>{status.sellStatus}</td>
                <td>{status.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center">
        <input
          ref={searchDate}
          className="form-control w-50"
          type="text"
          placeholder="Search By Date (DD/M/YYYY)"
        />
        <button onClick={handleSearch} className="btn btn-danger ml-3">
          Search
        </button>
      </div>
      <div style={{display: searchStatus ? 'none' :'block'}}>
        <table className="table table-borderless table-hover">
          <thead>
            <tr className="text-secondary">
              <th>#</th>
              <th>Agent Name</th>
              <th>Query Date</th>
              <th>Customer Name</th>
              <th>Channel</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Product Query</th>
              <th>Sell Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {searchStatus.map((status, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{status.agent}</td>
                <td>
                  {status.hours + ":" + status.minutes + ":" + status.seconds}
                </td>
                <td>{status.customerName}</td>
                <td>{status.channel}</td>
                <td>{status.phone}</td>
                <td>{status.address}</td>
                <td>{status.productQuery}</td>
                <td>{status.sellStatus}</td>
                <td>{status.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHome;
