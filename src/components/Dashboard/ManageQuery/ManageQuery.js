import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import UpdateQuery from "../UpdateQuery/UpdateQuery";

const ManageQuery = () => {
  const [matchedQuries, setMatchedQuries] = useState([]);
  const [updateQuery,setUpdateQuery] = useState([]);
  console.log(matchedQuries);
  const searchLink = useRef(null);
  const handleSearch = () => {
    const link = searchLink.current.value;
    fetch("https://ancient-wildwood-60100.herokuapp.com/queryList?link=" + link)
      .then((res) => res.json())
      .then((data) => setMatchedQuries(data));
  };
  
  const handleUpdate=(id) => {
    console.log(id);
    fetch(`https://ancient-wildwood-60100.herokuapp.com/updateQuery/${id}`)
    .then((res) => res.json())
    .then(data => setUpdateQuery(data))
    .catch((err) => console.error(err))
  }
  return (
    <div>
      <div className="d-flex justify-content-center">
        <input
          ref={searchLink}
          className="form-control w-50"
          type="text"
          placeholder="Search By Facebook link"
        />
        <button onClick={handleSearch} className="btn btn-danger ml-3">
          Search
        </button>
      </div>
      <div>
        <table className="table table-borderless table-hover">
          <thead>
            <tr className="text-secondary">
              <th>#</th>
              <th>Agent Name</th>
              <th>Query Date</th>
              <th>Query Time</th>
              <th>Customer Name</th>
              <th>Channel</th>
              <th>Purpose Of Query</th>
              <th>Phone</th>
              <th>District</th>
              <th>Address</th>
              <th>Product Query</th>
              <th>Sell Status</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {matchedQuries.map((query, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{query.agent}</td>
                <td>{query.date + "/" + query.month + "/" + query.year}</td>
                <td>
                  {query.hours + ":" + query.minutes + ":" + query.seconds}
                </td>
                <td>{query.customerName}</td>
                <td>{query.channel}</td>
                <td>{query.purposeQuery}</td>
                <td>{query.phone}</td>
                <td>{query.district}</td>
                <td>{query.address}</td>
                <td>{query.productQuery}</td>
                <td>{query.sellStatus}</td>
                <td>{query.remarks}</td>
                <td>
                  <button onClick={() =>handleUpdate(query._id)} className='btn btn-danger'><FontAwesomeIcon icon={faEdit} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{display: updateQuery.length? 'block': 'none'}}>
        {updateQuery.map(query => <UpdateQuery query={query} key={query._id}></UpdateQuery> )}
      </div>
    </div>
  );
};

export default ManageQuery;
