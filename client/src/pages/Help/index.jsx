import React from "react";
import {Form, Button} from "react-bootstrap";



function Help() {
    return (
        <div className="form">
            <Form>
                <Form.Group controlId="title">
                    <Form.Label>Тема</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>

                <Form.Group controlId="text">
                    <Form.Label>Описание проблемы</Form.Label>
                    <Form.Control as="textarea" rows="7" />
                </Form.Group>

                <Form.File
                    id="custom-file-translate-scss"
                    data-browse="Выбрать файл"
                    label="Загрузите свои файлы"
                    lang="ru"
                    custom
                />

                <Button style={{marginTop: 10}} variant="secondary"  className='mr-m' type="submit">
                    Отправить письмо
                </Button>
            </Form>
        </div>
    )
}

export default Help