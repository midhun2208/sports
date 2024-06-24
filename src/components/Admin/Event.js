import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Event.css";
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { getAllEventsApi } from "../Services/Allapis";
function Event() {



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[listEvents,setlistEvents]=useState(null)


const getListEvents=async()=>{

 if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const reqHeader = { Authorization: `Token ${token}` };
      const result = await getAllEventsApi(reqHeader);
     setlistEvents(result.data);
    }
  };
useEffect(()=>{
  getListEvents()
},[])
console.log(listEvents);
if (listEvents === null) return <></>;

  return (
    <div className="event1">
      <Container className="m-2 p-4 ">
        <div>
          <h1 className="text-center">Events</h1>
          <Link  to="/admin-home" style={{textDecoration:"none",color:"white"}} > 
          <i  class="fa-solid fa-backward fa-beat mx-2"></i>Back</Link>
          <div className="text-center ">
            <Button
              variant="contained"
              onClick={handleShow}
              className="e1 mt-5"
            >
              Add Events
            </Button>
          </div>
        </div>
        <div> 
          {listEvents?.map((i)=>(
          <div className="event2 mt-5 ms-5">
            <Row className="m-2 p-3">
              <Col>
             

            
              <div  className="text-white mt-5">
<h1>  {i.title}</h1>
              <i class="fa-solid fa-calendar-day ms-3 mt-2 mx-2"></i>
 {i.date.slice(0, 10)}<br />
 <i class="fa-solid fa-location-dot ms-3 mt-2 mx-3 "></i>
 {i.venue}

<br /><p className="mt-2">{i.description} </p>
  <i style={{color:"red"}} class="fa-solid fa-trash"></i>
              </div>
             
              </Col> 
              <Col>
                <img
                  className="ms-3"
                  style={{ width: "100%", height: "100%" }}
                  src={`http://127.0.0.1:8000`+i?.image}
                  alt=""
                />
              </Col> 
            </Row>
          </div>))} 
         
        </div>
      </Container>{" "}
      <div className="text-center">
        <Modal show={show} onHide={handleClose} className="mt-5">
          <Modal.Header closeButton>
            <Modal.Title style={{ width: "100%", textAlign: "center" }}>
              Add Events
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <div>
                  <img
                    className="text-center mt-3"
                    style={{ width: "100%", height: "100%" }}
                    src="https://i.postimg.cc/vBb9w7gn/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg"
                    alt=""
                  />
                </div>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Title"
                  className="mb-3"
                >
                  <Form.Control type="text" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword">
                  <Form.Control type="datetime-local" />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Venue"
                  className="mb-3 mt-3"
                >
                  <Form.Control type="text" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Description">
                  <Form.Control type="text" />
                </FloatingLabel>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Event;
