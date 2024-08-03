"use client";
import  Button  from "antd/es/button/button";
import { Books } from "../components/Books";
import { useEffect, useState } from "react";
import { BookRequest, createBook, deleteBook, getAllBook, updateBook } from "../services/books";
import Title from "antd/es/typography/Title";
import { CreateUpdateBook, Mode } from "../components/CreateUpdateBook";

export default function BooksPage() {

    const defaultValues = {
        title: "",
        description: "",
        price: 1
    }as Book;

    const [values, setValues] = useState<Book>({
        title: "",
        description: "",
        price: 1
    }as Book);

    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Create);

    useEffect(()=>{
        const getBooks = async () => {
            const books = await getAllBook();
            setLoading(false);
            setBooks(books);
        };
        getBooks();
    }, []);

    const handleCreteBook = async (request: BookRequest) => {
        await createBook(request);
        closeModal();
        const books = await getAllBook();
        setBooks(books);
    };
    const handleUpdateBook = async (id: string, request:BookRequest) => {
        await updateBook(id, request);
        closeModal();
        
        const books = await getAllBook();
        setBooks(books);
    };
    const handleDeleteBook = async (id: string) => {
        await deleteBook(id);
        
        const books = await getAllBook();
        setBooks(books);
    };
    const openModal = () => {
        setMode(Mode.Create);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setValues(defaultValues);
        setIsModalOpen(false);
    };

    const openEditModal = (book: Book) => {
        setMode(Mode.Edit);
        setValues(book);
        setIsModalOpen(true);
    };
    

    return (
        <div>
            <Button onClick={() => openModal()} type="primary" style={{
                marginTop: "15px"
            }}>
                Добавить книгу
            </Button>
            <CreateUpdateBook 
                mode={mode} 
                values={values}
                isModalOpen={isModalOpen}
                handleCreate={handleCreteBook}
                handleUpdate={handleUpdateBook}
                handleCancel={closeModal}
            />
            {loading ? <Title>Loading</Title> : <Books books={books} handleOpen={openEditModal} handleDelete={handleDeleteBook}></Books>}
            
        </div>
    );
}