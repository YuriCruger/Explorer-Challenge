import { Button } from "@/components/Button";
import { PageTitle } from "@/components/PageTitle";
import { PreviousPageButton } from "@/components/PreviousPageButton";
import { api } from "@/services/api";
import { Order } from "@/types/order";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { TableHeader } from "./components/TableHeader";
import { TableCell } from "./components/TableCell";
import { DeleteConfirmationModal } from "../EditDish/components/DeleteConfirmationModal";

export default function OrderManagement() {
  const [isDeleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);
  const [deletingOrderId, setDeletingOrderId] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderStatusChanges, setOrderStatusChanges] = useState<{
    [key: number]: string;
  }>({});
  const [openRows, setOpenRows] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    api
      .get("/orders", { withCredentials: true })
      .then((response) => setOrders(response.data))
      .catch((error) => toast(error.response.data.message));
  }, []);

  const handleStatusChange = (
    orderId: number,
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setOrderStatusChanges({
      ...orderStatusChanges,
      [orderId]: event.target.value,
    });
  };

  const handleSave = async () => {
    const promises = Object.entries(orderStatusChanges).map(
      ([orderId, status]) => {
        const updated_at = new Date().toISOString();
        return api.patch(
          "/orders",
          { updated_at, status, order_id: orderId },
          { withCredentials: true }
        );
      }
    );

    try {
      await Promise.all(promises);
      toast("Pedidos atualizados com sucesso.");
    } catch (error) {
      toast(
        "Erro ao atualizar os pedidos, por favor tente novamente mais tarde."
      );
    }
  };

  const handleDeleteOrder = (orderId: number) => {
    setDeleteConfirmationModalOpen(true);
    setDeletingOrderId(orderId);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationModalOpen(false);
  };

  const handleConfirmDelete = () => {
    api
      .delete(`/orders/${deletingOrderId}`, { withCredentials: true })
      .then(() => {
        toast("Pedido deletado com sucesso.");
        setDeleteConfirmationModalOpen(false);
        setDeletingOrderId(null);
        setOrders((orders) =>
          orders.filter((order) => order.id !== deletingOrderId)
        );
      })
      .catch(() => {
        toast(
          "Erro ao deletar o pedido, por favor tente novamente mais tarde."
        );
        setDeleteConfirmationModalOpen(false);
        setDeletingOrderId(null);
      });
  };

  const handleToggleRow = (orderId: number) => {
    setOpenRows((prevOpenRows) => ({
      ...prevOpenRows,
      [orderId]: !prevOpenRows[orderId],
    }));
  };

  return (
    <div className="px-7 pt-3 pb-12 xl:px-32">
      <PreviousPageButton />

      {orders.length > 0 ? (
        <>
          <PageTitle title="Controle de Pedidos" />

          <div className="overflow-auto">
            <table className="text-light-100 rounded-lg w-full text-center overflow-hidden">
              <thead className="bg-dark-900">
                <tr>
                  <TableHeader name="ID do Pedido" />
                  <TableHeader name="ID do Usuário" />
                  <TableHeader name="Produtos" />
                  <TableHeader name="Preço total" />
                  <TableHeader name="Data de criação" />
                  <TableHeader name="Status do pedido" />
                  <TableHeader name="" />
                </tr>
              </thead>
              <tbody className="bg-dark-700 relative">
                {orders.map((order, index) => (
                  <React.Fragment key={order.id}>
                    <tr
                      className={` ${
                        index === orders.length - 1
                          ? ""
                          : "border-light-100 border-b"
                      } ${openRows[order.id] && "border-none"}`}
                    >
                      <TableCell name={order.id} />
                      <TableCell name={order.user_id} />
                      <td className="p-5">
                        <button
                          className="bg-dark-1000 rounded-lg p-2"
                          onClick={() => handleToggleRow(order.id)}
                        >
                          {openRows[order.id] ? "Fechar" : "Ver produtos"}
                        </button>
                      </td>

                      <TableCell name={formatPrice(order.total_price)} />
                      <TableCell name={formatDate(order.created_at)} />
                      <td className="p-5">
                        <select
                          className="bg-dark-1000 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-light-100"
                          value={orderStatusChanges[order.id] || order.status}
                          onChange={(event) =>
                            handleStatusChange(order.id, event)
                          }
                        >
                          <option value="not_delivered">Pendente</option>
                          <option value="delivered">Entregue</option>
                        </select>
                      </td>
                      <td className="p-5">
                        <button
                          className="hover:text-red-500 hover:underline transition-all"
                          onClick={() => handleDeleteOrder(order.id)}
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>

                    {openRows[order.id] && (
                      <>
                        <tr className="bg-dark-1000">
                          <th colSpan={4} className="p-5">
                            Produtos
                          </th>
                          <th colSpan={3} className="p-5">
                            Quantidade
                          </th>
                        </tr>

                        {order.products.map((product) => (
                          <tr
                            key={product.id}
                            className={`bg-dark-700 ${
                              index === orders.length - 1
                                ? ""
                                : "border-b border-light-600"
                            }`}
                          >
                            <td className="p-5" colSpan={4}>
                              {product.name}
                            </td>

                            <td className="p-5" colSpan={3}>
                              {product.quantity}
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex justify-end">
            <Button
              title="Salvar status"
              className="lg:w-[172px]"
              onClick={handleSave}
            />
          </div>

          {isDeleteConfirmationModalOpen && (
            <DeleteConfirmationModal
              handleCancelDelete={handleCancelDelete}
              handleConfirmDelete={handleConfirmDelete}
            />
          )}
        </>
      ) : (
        <p className="text-light-100 text-2xl text-center mt-[300px]">
          Você não tem pedidos
        </p>
      )}
    </div>
  );
}
