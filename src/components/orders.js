import {
  useSubscription,
  useQuery,
  useLazyQuery,
  useMutation,
} from "@apollo/client";
import { useContext, useEffect, useState, useRef } from "react";
import { Table, Button } from "antd";
import { QueryContext } from "../context/queryContext";
import columns from "../helperFiles/columns";
import EDIT_SUBSCRIPTION from "../queries/editSubscription";
import ORDER_SUBSCRIPTION from "../queries/orderSubscription";
import GET_ORDERS from "../queries/getOrders";
import DELETE_SUBSCRIPTION from "../queries/deleteSubscription";
import DELETE_MUTATION from "../queries/deleteMutation";
import "./styles/orders.css";

function Orders() {
  const ref = useRef(null);
  const {
    orders,
    setOrders,
    states,
    setCurrentOffset,
    currentOffset,
    dateRange,
  } = useContext(QueryContext);
  const [scroll, setScroll] = useState(null);

  useEffect(() => {
    console.log(scroll);
  }, [scroll]);

  const [mutateState] = useMutation(DELETE_MUTATION);
  const [executeQuery, { loading }] = useLazyQuery(GET_ORDERS, {
    onCompleted: (data) => {
      if (!loading) {
        setOrders(data.getOrders);
      }
    },
    fetchPolicy: "network-only",
  });
  const [moreQuery, { loading: loadingMore }] = useLazyQuery(GET_ORDERS, {
    onCompleted: (data) => {
      if (!loadingMore) {
        setOrders((orders) => [...orders, ...data.getOrders]);
      }
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    executeQuery({
      variables: {
        order: -1,
        states: states,
        offset: 0,
        createdAfter: dateRange[0],
        createdBefore: dateRange[1],
      },
    });
  }, [states, dateRange]);

  const pickColor = (state) => {
    switch (state) {
      case "Nová":
        return "new";

      case "Aktivní":
        return "active";

      case "Zrušená":
        return "canceled";

      case "Hotová":
        return "done";

      default:
        break;
    }
  };

  useSubscription(ORDER_SUBSCRIPTION, {
    onSubscriptionData: (data) => {
      const order = data.subscriptionData.data.orderCreated;
      setOrders((orders) => [order, ...orders]);
    },
  });

  useSubscription(EDIT_SUBSCRIPTION, {
    onSubscriptionData: (data) => {
      const { id, field, value } = data.subscriptionData.data.orderEdited;

      setOrders(
        orders.map((order) =>
          order.id === id ? { ...order, [field]: value } : order
        )
      );
    },
  });

  useSubscription(DELETE_SUBSCRIPTION, {
    onSubscriptionData: (data) => {
      const id = data.subscriptionData.data.orderDeleted;

      setOrders((orders) => orders.filter((order) => order && order.id != id));
    },
  });

  const handleScroll = (currentScroll, maxScroll) => {
    if (currentScroll == maxScroll) {
      moreQuery({
        variables: {
          order: -1,
          states: states,
          offset: orders.length,
          createdAfter: dateRange[0],
          createdBefore: dateRange[1],
        },
      });
    }
  };

  useEffect(() => {
    document.querySelector(".ant-table-body").onscroll = (e) => {
      handleScroll(e.target.scrollTop, e.target.scrollTopMax);
    };
  });

  return (
    <div>
      <Table
        bordered={true}
        ref={ref}
        rowKey={(record) => {
          return record.id;
        }}
        /* onRow={(record) => {
          return {
            onContextMenu: async (e) => {
              e.preventDefault();
              await mutateState({ variables: { orderID: record.id } });
            },
          };
        }} */
        rowClassName={(record) => {
          return pickColor(record.state);
        }}
        dataSource={orders}
        loading={loading || loadingMore}
        columns={columns}
        scroll={{ x: true, y: "58vh" }}
        pagination={false}
        sticky={true}
      />
    </div>
  );
}

export default Orders;
