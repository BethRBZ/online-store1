import React from "react";
import Modal from "react-bootstrap/Modal";
import {Button,Form} from "react-bootstrap";

const CreateType = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новый тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control placeholder={"Введите название типа товара"}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={props.onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={props.onHide}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;