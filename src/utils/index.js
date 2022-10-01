// export const getPayload = (status, payload) => {
//     switch(status) {
//         case "error":
//             return {data: null, status, errors: payload}
//         case "pending":
//         case "idle":
//             return {data: null, status, errors: null}
//         case "success":
//             return {data: payload, status, errors: null}
//         default:
//             return
//     }
// };

export const getPayload = (status, payload) => {
  switch (status) {
    case "error":
      return { data: null, status, errors: payload };
    default:
      return { data: payload, status, errors: null };
  }
};
