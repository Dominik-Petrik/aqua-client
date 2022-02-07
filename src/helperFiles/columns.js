import { Table, Select } from "antd";
import moment from "moment";
import "moment/locale/cs";
import TableDate from "../components/utils/table/tableDate";
import TableInput from "../components/utils/table/tableInput";
import TableSelect from "../components/utils/table/tableSelect";
import TableNote from "../components/utils/table/tableNote";

moment.locale("cs");
moment.defaultFormat = "LL";
const columns = [
  {
    title: "Stav",
    dataIndex: "state",
    key: "state",
    width: 100,
  },
  {
    title: "Datum rezervace",
    dataIndex: "createdAt",
    key: "createdAt",
    minWidth: 200,
    width: 200,
  },
  {
    title: "Příjmení",
    dataIndex: "surname",
    key: "surname",
    width: 120,
  },
  {
    title: "Jméno",
    dataIndex: "name",
    key: "name",
    width: 120,
  },
  {
    title: "Město",
    dataIndex: "city",
    key: "city",
    width: 200,
  },
  {
    title: "Adresa",
    dataIndex: "adress",
    key: "adress",
    width: 200,
  },
  {
    title: "E-mail",
    dataIndex: "email",
    key: "email",
    width: 230,
  },
  {
    title: "Telefon",
    dataIndex: "phone",
    key: "phone",
    width: 150,
  },
  {
    title: "Datum narození",
    dataIndex: "birthdate",
    key: "birthdate",
  },
  {
    title: "IČO",
    dataIndex: "ico",
    key: "ico",
  },
  {
    title: "Poznámka",
    dataIndex: "note",
    key: "note",
  },
  {
    title: "Datum realizace",
    dataIndex: "finishedAt",
    key: "finishedAt",
  },
  {
    title: "Zadal",
    dataIndex: "createdBy",
    key: "createdBy",
  },
  {
    title: "Provedl",
    dataIndex: "finishedBy",
    key: "finishedBy",
  },
];

columns.map((column) => {
  column.ellipsis = true;
  column.render = (text, record) => {
    if (record) {
      switch (column.dataIndex) {
        case "state":
        case "finishedBy":
          return (
            <TableSelect
              id={record.id}
              value={text}
              field={column.dataIndex}
            ></TableSelect>
          );
        case "createdAt":
        case "birthdate":
        case "finishedAt":
          return (
            <TableDate
              value={text}
              id={record.id}
              field={column.dataIndex}
            ></TableDate>
          );
        case "note":
          return (
            <TableNote id={record.id} value={text} field={column.dataIndex} />
          );
        default:
          return (
            <TableInput
              id={record.id}
              value={text}
              field={column.dataIndex}
            ></TableInput>
          );
      }
    }
  };
});

export default columns;
