import React from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";

const Auth = () => {
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">Авторизация</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите Ваш e-mail"
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите Ваш пароль"
                    />
                    <Button className="mt-3 align-self-end" variant={"outline-success"}>
                        Войти
                    </Button>

                </Form>
            </Card>
        </Container>
    );
};

export default Auth;