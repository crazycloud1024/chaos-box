import dayjs from "dayjs";
import { clone } from "@pureadmin/utils";

const date = dayjs(new Date()).format("YYYY-MM-DD");

const tableData = [
  {
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    namespace: "default",
    chaosname: "testkill4",
    kind: "PodChaos",
    uid: "ba2b71bc-e2e8-43a0-b808-e45706cc41e7",
    created_at: date,
    status: "finished"
  }
];

const tableDataMore = clone(tableData, true).map(item =>
  Object.assign(item, {
    state: "California",
    city: "Los Angeles",
    "post-code": "CA 90036"
  })
);

const tableDataImage = clone(tableData, true).map((item, index) =>
  Object.assign(item, {
    image: `https://xiaoxian521.github.io/pure-admin-table/imgs/${
      index + 1
    }.jpg`
  })
);

const tableDataSortable = clone(tableData, true).map((item, index) => {
  delete item["date"];
  Object.assign(item, {
    date: `${dayjs(new Date()).format("YYYY-MM")}-${index + 1}`
  });
});

const tableDataDrag = clone(tableData, true).map((item, index) => {
  delete item["address"];
  delete item["date"];
  return Object.assign(
    {
      id: index + 1,
      date: `${dayjs(new Date()).format("YYYY-MM")}-${index + 1}`
    },
    item
  );
});

const tableDataEdit = clone(tableData, true).map((item, index) => {
  delete item["date"];
  return Object.assign(
    {
      id: index + 1,
      date: `${dayjs(new Date()).format("YYYY-MM")}-${index + 1}`
    },
    item
  );
});

export {
  tableData,
  tableDataDrag,
  tableDataMore,
  tableDataEdit,
  tableDataImage,
  tableDataSortable
};
