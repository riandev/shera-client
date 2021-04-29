import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const AddQuery = () => {
  const [status, setStatus] = useState(false);
  const agentMail = sessionStorage.getItem("agent");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const months=new Date().getMonth();
    data.agent = agentMail;
    data.date = new Date().getDate();
    data.month = months+1;
    data.year = new Date().getFullYear();
    data.hours = new Date().getHours();
    data.minutes = new Date().getMinutes();
    data.seconds = new Date().getSeconds();
    data.fullDate=new Date().getDate()+'/'+(months+1)+'/'+new Date().getFullYear();
    fetch("https://ancient-wildwood-60100.herokuapp.com/quries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch((err) => console.log(err));
  };
  if (status === true) {
    alert("Query Added Successfully");
    window.location.reload(true);
  }
  return (
    <div className="w-50">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="customerName">
          {" "}
          <b>Customer Name:</b>
        </label>
        <input
          className="form-control"
          defaultValue=""
          {...register("customerName")}
          placeholder="Input Customer Name"
        />
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>
            {" "}
            <b>Channel Name:</b>
          </Form.Label>
          <Form.Control
            {...register("channel")}
            as="select"
            defaultValue="Choose..."
          >
            <option>Choose...</option>
            <option>Facebook Page</option>
            <option>Facebook Group</option>
            <option>Market Place</option>
            <option>Others</option>
          </Form.Control>
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>
              {" "}
              <b>Facebook Link:</b>
            </Form.Label>
            <Form.Control {...register("fbid")} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>
              {" "}
              <b>Query Purpose:</b>
            </Form.Label>
            <Form.Control {...register("purposeQuery")} />
          </Form.Group>
        </Form.Row>
        <Form.Row></Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>
              {" "}
              <b>Mobile Number:</b>
            </Form.Label>
            <Form.Control {...register("phone")} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>
              {" "}
              <b>District:</b>
            </Form.Label>
            <Form.Control {...register("district")} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>
              {" "}
              <b>Address:</b>
            </Form.Label>
            <Form.Control {...register("address")} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>
              {" "}
              <b>Product Query</b>
            </Form.Label>
            <Form.Control {...register("productQuery")} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>
              {" "}
              <b>Sell Status</b>
            </Form.Label>
            <Form.Control
              {...register("sellStatus")}
              as="select"
              defaultValue="Choose..."
            >
              <option>Choose...</option>
              <option>Successfull</option>
              <option>Not Successfull</option>
              <option>Query</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <label htmlFor="remarks">
          {" "}
          <b>Remakrs:</b>
        </label>
        <input
          className="form-control"
          defaultValue=""
          {...register("remarks")}
          placeholder="Remakrs"
        />
        <input className="btn btn-danger mt-3" type="submit" />
      </form>
    </div>
  );
};

export default AddQuery;
