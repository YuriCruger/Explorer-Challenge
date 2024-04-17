const OrdersService = require("../orders/OrdersService");
const OrdersRepositoryInMemory = require("../../repositories/orders/OrdersRepositoryInMemory");
const AppError = require("../../utils/AppError");

describe("orderService", () => {
  let ordersRepositoryInMemory = null;
  let ordersService = null;

  beforeEach(() => {
    ordersRepositoryInMemory = new OrdersRepositoryInMemory();
    ordersService = new OrdersService(ordersRepositoryInMemory);
  });

  it("should create a new order", async () => {
    const orderData = {
      total_price: 100,
      products: [
        { name: "Product 1", quantity: 2 },
        { name: "Product 2", quantity: 3 },
      ],
      user_id: 1,
    };

    const orderId = await ordersService.createOrder(orderData);

    expect(orderId).toBeDefined();
    expect(typeof orderId).toBe("number");
    expect(ordersRepositoryInMemory.orders.length).toBe(1);
    expect(ordersRepositoryInMemory.orderProducts.length).toBe(2);
  });

  it("should throw an error for incomplete order data", () => {
    const order = {
      total_price: "",
      user_id: "",
      products: "",
    };

    expect(ordersService.createOrder(order)).rejects.toEqual(
      new AppError(
        "Preço total, produtos e ID do usuário são obrigatórios.",
        400
      )
    );
  });

  it("should throw an error when product name and quantity are missing", () => {
    const order = {
      total_price: "100",
      user_id: "1",
      products: [{ name: "", quantity: "" }],
    };

    expect(ordersService.createOrder(order)).rejects.toEqual(
      new AppError("Nome do produto e quantidade são obrigatórios.", 400)
    );
  });

  it("should return orders with products", async () => {
    const orderData = {
      total_price: 100,
      products: [
        { name: "Product 1", quantity: 2 },
        { name: "Product 2", quantity: 3 },
      ],
      user_id: 1,
    };

    await ordersService.createOrder(orderData);

    const ordersWithProducts = await ordersService.showOrders();

    expect(ordersWithProducts).toBeDefined();
    expect(Array.isArray(ordersWithProducts)).toBe(true);
    expect(ordersWithProducts.length).toBe(1);
    expect(ordersWithProducts[0].products.length).toBe(2);
  });

  it("should throw an error when there is an issue fetching orders", async () => {
    jest
      .spyOn(ordersRepositoryInMemory, "showOrders")
      .mockRejectedValue(new Error("Database error"));

    await expect(ordersService.showOrders()).rejects.toEqual(
      new AppError("Erro ao buscar os pedidos.", 500)
    );
  });

  it("should update an existing order", async () => {
    const initialOrder = {
      total_price: "100",
      user_id: "1",
      products: [{ name: "x-burguer", quantity: 2 }],
    };

    const createdOrderId = await ordersService.createOrder(initialOrder);

    const updateParams = {
      updated_at: new Date(),
      status: "completed",
      order_id: createdOrderId,
    };

    await ordersService.updateOrder(updateParams);

    const updatedOrder = ordersRepositoryInMemory.orders.find(
      (order) => order.id === updateParams.order_id
    );

    expect(updatedOrder.updated_at).toEqual(updateParams.updated_at);
    expect(updatedOrder.status).toEqual(updateParams.status);
  });

  it("should throw an error when updating with incomplete data", async () => {
    const updateParams = {
      updated_at: "",
      status: "",
      order_id: "",
    };

    await expect(ordersService.updateOrder(updateParams)).rejects.toEqual(
      new AppError("Dados incompletos para atualização do pedido.", 400)
    );
  });

  it("should throw an error when updating a non-existing order", async () => {
    const initialOrder = {
      total_price: "100",
      user_id: "1",
      products: [{ name: "x-burguer", quantity: 2 }],
    };

    await ordersService.createOrder(initialOrder);

    const updateParams = {
      updated_at: new Date(),
      status: "completed",
      order_id: "non-existing-id",
    };

    await expect(ordersService.updateOrder(updateParams)).rejects.toEqual(
      new AppError("Pedido não encontrado.", 404)
    );
  });

  it("should delete an existing order", async () => {
    const order = {
      total_price: "100",
      user_id: "1",
      products: [{ name: "x-burguer", quantity: 2 }],
    };
    const createdOrderId = await ordersService.createOrder(order);

    const result = await ordersService.deleteOrder({
      order_id: createdOrderId,
    });

    expect(result.deletedOrderId).toEqual(createdOrderId);

    const ordersAfterDeletion = await ordersRepositoryInMemory.showOrders();
    const deletedOrder = ordersAfterDeletion.find(
      (o) => o.id === createdOrderId
    );

    expect(deletedOrder).toBeUndefined();
  });

  it("should throw an error when trying to delete a non-existing order", async () => {
    const nonExistingOrderId = "non-existing-id";

    await expect(
      ordersService.deleteOrder({ order_id: nonExistingOrderId })
    ).rejects.toEqual(new AppError("Pedido não encontrado.", 404));
  });
});
