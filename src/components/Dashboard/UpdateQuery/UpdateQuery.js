import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

const UpdateQuery = ({ query }) => {
    const [status,setStatus]=useState(false)
    const id = query._id;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    fetch(`https://ancient-wildwood-60100.herokuapp.com/finalUpdate/${id}`,{
        method: 'PATCH',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => setStatus(data))
    .catch(err => console.log(err))
  };
  if(status === true){
      alert('Query Update Successfully')
  }
  return (
    <div className="w-75">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>
              <b>Customer Name:</b>
            </Form.Label>
            <Form.Control
              defaultValue={query.customerName}
              {...register("customerName")}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>
              <b>Address:</b>
            </Form.Label>
            <Form.Control
              defaultValue={query.address}
              {...register("address")}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>
              <b>Phone:</b>
            </Form.Label>
            <Form.Control defaultValue={query.phone} {...register("phone")} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>
              <b>District:</b>
            </Form.Label>
            <Form.Control
              defaultValue={query.district}
              {...register("district")}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>
              <b>Channel:</b>
            </Form.Label>
            <Form.Control
              defaultValue={query.channel}
              {...register("channel")}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>
              <b>Facebook id:</b>
            </Form.Label>
            <Form.Control defaultValue={query.fbid} {...register("fbid")} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>
              <b>Product Query:</b>
            </Form.Label>
            <Form.Control
              defaultValue={query.productQuery}
              {...register("productQuery")}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>
              <b>Purpose Query:</b>
            </Form.Label>
            <Form.Control
              defaultValue={query.purposeQuery}
              {...register("purposeQuery")}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>
              <b>Remarks:</b>
            </Form.Label>
            <Form.Control
              defaultValue={query.remarks}
              {...register("remarks")}
            />
          </Form.Group>
        </Form.Row>
        <input className="btn btn-danger" type="submit" />
      </form>
    </div>
  );
};

export default UpdateQuery;
