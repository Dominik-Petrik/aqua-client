import { useContext, useEffect, useState } from "react";
import { DatePicker } from "antd";
import { QueryContext } from "../context/queryContext";
import moment from "moment";
import React from "react";
import czLocale from "../helperFiles/locale";

const { RangePicker } = DatePicker;

function CreatedAtFilter() {
  const { setDateRange } = useContext(QueryContext);
  const [range, setRange] = useState([null, null]);

  return (
    <div>
      <RangePicker
        format={"L"}
        /* showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }} */
        locale={czLocale}
        allowEmpty={[true, true]}
        onChange={(dates) => {
          setDateRange(dates ? dates : [null, null]);
        }}
      />
    </div>
  );
}

export default CreatedAtFilter;
