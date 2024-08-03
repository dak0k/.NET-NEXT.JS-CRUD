import { Input } from "antd";
import { BookRequest } from "../services/books";
import Modal from "antd/es/modal/Modal";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
interface Props {
    mode: Mode;
    values: Book;
    isModalOpen: boolean;
    handleCancel: () => void;
    handleCreate: (request: BookRequest) => void;
    handleUpdate: (id: string, request: BookRequest) => void;
}
export enum Mode {
    Create,
    Edit
}
export const CreateUpdateBook = ({
    mode,
    values,
    isModalOpen,
    handleCancel,
    handleCreate,
    handleUpdate
}: Props) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(1);
    
    useEffect(()=>{
        setTitle(values.title)
        setDescription(values.description)
        setPrice(values.price)
    }, [values])
    const handleOk = async () => {
        const bookRequest = {title, description, price};
        mode == Mode.Create 
            ? handleCreate(bookRequest) 
            : handleUpdate(values.id, bookRequest)
    };
    return (
        <Modal title={
            mode === Mode.Create
                ? "Добавить книгут" 
                : "Редактировать книгу"
            } 
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            cancelText={"Отмена"} 
            >
            <div className="book_modal">
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Название"
                ></Input>
                <TextArea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    autoSize={{minRows: 3, maxRows: 3}}
                    placeholder="Описание"
                />
                <Input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Цена"
                ></Input>
            </div>
        </Modal>
    );
};