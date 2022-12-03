import React, { useState, useContext } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { ContextTodo } from "../Todo";

function AddTodo(props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [year, setYear] = useState("2023");
  const [month, setMonth] = useState("01");
  const [day, setDay] = useState("01");
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");
  const [time, setTime] = useState(
    new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`).getTime() ||
      null
  );

  const [buttonColor, setButtonColor] = useState("primary");
  const [buttonText, setButtontext] = useState("Add todo");

  const { addTodo, setAddTodoShow } = useContext(ContextTodo);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update todo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Body</Form.Label>
            <Form.Control
              placeholder="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>End Time</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  placeholder="YYYY"
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="MM"
                  value={month}
                  onChange={(e) => {
                    setMonth(e.target.value);
                  }}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="DD"
                  value={day}
                  onChange={(e) => {
                    setDay(e.target.value);
                  }}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="hh"
                  value={hour}
                  onChange={(e) => {
                    setHour(e.target.value);
                  }}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="mm"
                  value={minute}
                  onChange={(e) => {
                    setMinute(e.target.value);
                  }}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="ss"
                  value={second}
                  onChange={(e) => {
                    setSecond(e.target.value);
                  }}
                />
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setTime(0);

            setTime(
              new Date(
                `${year}-${month}-${day}T${hour}:${minute}:${second}`
              ).getTime() || null
            );
            if (time < Date.now()) {
              setButtonColor("danger");
              setButtontext("Invalid time");
            }
            if (title && body && time > Date.now()) {
              setTitle("");
              setBody("");
              setYear("");
              setMonth("");
              setDay("");
              setHour("");
              setMinute("");
              setSecond("");
              setAddTodoShow(false);
              setButtonColor("primary");
              setButtonColor("Add todo");
              addTodo(title, body, time);
            }
          }}
          variant={buttonColor}
        >
          {buttonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddTodo;
