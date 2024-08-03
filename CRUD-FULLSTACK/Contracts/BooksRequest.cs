namespace CRUD_FULLSTACK.Contracts
{
    public record BooksRequest(
        string Title,
        string Description,
        decimal Price);
}
