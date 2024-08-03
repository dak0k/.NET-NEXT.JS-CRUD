export interface BookRequest {
    title: string;
    description: string;
    price: number;
};
export const getAllBook = async () => {
    const response = await fetch(`https://localhost:7199/Books`);
    return response.json();
};
export const createBook = async (bookRequest: BookRequest) => {
    await fetch(`https://localhost:7199/Books`, {
        method: "Post",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(bookRequest),
    });
};
export const updateBook = async (id: string, bookRequest: BookRequest) => {
    await fetch(`https://localhost:7199/Books/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(bookRequest),
    });
};
export const deleteBook = async (id: string) => {
    await fetch(`https://localhost:7199/Books/${id}`, {
        method: "DELETE",
    });
};