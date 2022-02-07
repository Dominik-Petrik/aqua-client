import { SearchOutlined } from "@ant-design/icons";
import { useLazyQuery } from "@apollo/client";
import { Input, Select, Tag } from "antd";
import React, { useContext, useState } from "react";
import { QueryContext } from "../context/queryContext";
import AUTOCOMPLETE_ORDERS from "../queries/autocompleteOrders";
import SEARCH_ORDERS from "../queries/searchOrders";
import GET_ORDERS from "../queries/getOrders";

const { Option } = Select;

function SearchField() {
  const [results, setResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [executeQuery, { loading }] = useLazyQuery(GET_ORDERS, {
    onCompleted: (data) => {
      if (!loading) {
        setOrders(data.getOrders);
      }
    },
    fetchPolicy: "network-only",
  });
  const { setOrders, states, dateRange } = useContext(QueryContext);
  const [getResults, { loading: loadingResults, data: dataResults }] =
    useLazyQuery(AUTOCOMPLETE_ORDERS, {});
  const [getSearch, { loading: loadingSearch, data: dataSearch }] =
    useLazyQuery(SEARCH_ORDERS, {
      onCompleted: () => {
        if (dataSearch.searchOrders.length > 0) {
          setOrders(dataSearch.searchOrders);
        } else {
          setOrders([]);
        }
      },
    });

  async function handleSearch(term) {
    await getResults({ variables: { searchTerm: term } });

    if (!loadingResults && dataResults) {
      if (term.length < 3 && dataResults.autocompleteOrder) {
        setResults([]);
      } else {
        const options = [];
        dataResults.autocompleteOrder.map((order) => {
          options.push({ value: order });
        });
        setResults(options);
      }
    }
  }

  async function search(term) {
    await getSearch({ variables: { searchTerm: term } });
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Select
        notFoundContent={null}
        filterOption={false}
        size="large"
        placeholder={
          <React.Fragment>
            <SearchOutlined />
            {" Vyhledejte.."}
          </React.Fragment>
        }
        id={"select"}
        prefix={<SearchOutlined />}
        defaultOpen={false}
        allowClear={true}
        showArrow={false}
        onBlur={() => {
          setResults([]);
        }}
        onClear={async () => {
          executeQuery({
            variables: {
              order: -1,
              states: states,
              offset: 0,
              createdAfter: dateRange[0],
              createdBefore: dateRange[1],
            },
          });
        }}
        defaultActiveFirstOption={false}
        loading={loadingResults}
        options={results}
        showSearch
        style={{ width: "80%" }}
        onSearch={(term) => {
          handleSearch(term);
        }}
        onSelect={async (value) => {
          await search(value);
          setIsSearched(true);
        }}
        onInputKeyDown={async (e) => {
          if (e.key == "Enter") {
            await search(e.currentTarget.value);
            setIsSearched(true);
          }
        }}
      ></Select>
      {isSearched ? (
        <a
          onClick={async () => {
            executeQuery({
              variables: {
                order: -1,
                states: states,
                offset: 0,
                createdAfter: dateRange[0],
                createdBefore: dateRange[1],
              },
            });
            setIsSearched(false);
          }}
        >
          Zrušit vyhledávání
        </a>
      ) : null}
    </div>
  );
}

export default SearchField;
