import { logResp } from "./logResp.js";
const myModal = new bootstrap.Modal(document.getElementById("myModal"));
export const loadSpining = new bootstrap.Modal(
  document.getElementById("loader")
);
let thisMethod = "GET";
let endpoint = null;
let thisHeaders = null;
// <!-- Modal -->
document.querySelectorAll("#close").forEach((btn) => {
  btn.addEventListener("click", () => {
    myModal.hide();
    const token = localStorage.getItem("token");
    if (!token) {
      location.reload();
    }
  });
});
export function setFetch(route, end, type, auth) {
  switch (route) {
    case "product":
      endpoint = `http://localhost:8080/products/${end}`;
      break;
    case "user":
      endpoint = `http://localhost:8080/user/${end}`;
      break;
    case "address":
      endpoint = `http://localhost:8080/add/${end}`;
      break;
    case "cart":
      endpoint = `http://localhost:8080/cart/${end}`;
      break;
    case "order":
      endpoint = `http://localhost:8080/order/${end}`;
      break;
    default:
      endpoint = `http:///localhost:8080/test/${end}`;
  }
  switch (type) {
    case "g":
      thisMethod = "GET";
      break;
    case "p":
      thisMethod = `POST`;
      break;
    case "pc":
      thisMethod = "PATCH";
      break;
    case "d":
      thisMethod = "DELETE";
      break;
    default:
      thisMethod = "GET";
  }
  if (!auth) {
    thisHeaders = {
      "Content-Type": "application/json",
    };
  } else {
    const token = localStorage.getItem("token");
    if (!token) {
      myModal.show();
      return;
    }
    thisHeaders = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
  }
}
export async function handleHTTP(obj, end = undefined, print = false) {
  let response = null;
  endpoint = end || endpoint;
  loadSpining.show();
  try {
    if (thisMethod === "GET") {
      response = await fetch(`${endpoint}`, {
        headers: {
          ...thisHeaders,
        },
      });
    } else {
      response = await fetch(`${endpoint}`, {
        method: thisMethod,
        body: JSON.stringify(obj),
        headers: {
          ...thisHeaders,
        },
      });
    }

    if (response?.ok) {
      const data = await response.json();
      if (print) {
        logResp(data, endpoint);
      } else {
        return data;
      }
      if (data?.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email_address);
        localStorage.setItem("id", data.id);
        setTimeout(() => {
          localStorage.clear();
        }, 60 * 60 * 1000);
      }
    } else {
      const data = await response.json();
      const end = endpoint.split("/")[3];
      logResp(data, `notOk/${end}`);
    }
  } catch (error) {
    console.log(error);
  }
}
