import axios from "axios";

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// let days = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednessday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

export const getDay = (timestamp: any) => {
  let date = new Date(timestamp);
  return `${date.getDate()} ${months[date.getMonth()]}`;
};

export const filterPaginationData = async ({
  create_new_arr = false,
  state,
  data,
  page,
  countRoute,
  data_to_send,
}: any) => {
  let obj;

  if (state != undefined && !create_new_arr) {
    obj = { ...state, results: [...state.results, ...data], page: page };
  } else {
    await axios
      .post(
        `https://blogger-app-etm5.onrender.com/api/blog/${countRoute}`,
        data_to_send
      )
      .then(({ data: { totalDocs } }) => {
        obj = { results: data, page: 1, totalDocs };
      })
      .catch((err) => console.log(err));
  }
  return obj;
};
