class ProductoNoExiste extends Error {
  constructor(message) {
    super(message);
    this.message = message || 'Producto no existe. No complited';
    this.status = 404;
    this.name = 'ProductoNoExiste';
  }
}


module.exports = {
  ProductoNoExiste,
}