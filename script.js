import { createForm } from "./modules/createForm.js";
import { dropDown } from "./modules/createDropDown.js";
import { setFetch } from "./modules/HTTP.js";
import { mode } from "./modules/mode.js";
import { modal } from "./modules/modal.js";
import {
  newUser,
  getUser,
  password,
  update,
  onlyId,
  newProduct,
  userAdd,
  cartProduct,
  cartInp,
  cartPur,
  cartDel,
  cartUpdate,
  guest,
} from "./modules/variables.js";
localStorage.clear();
mode();
const userBtn = document.querySelectorAll(".user-btn");
const proBtn = document.querySelectorAll(".pro-btn");
const addBtn = document.querySelectorAll(".add-btn");
const cart = document.querySelectorAll(".cart-btn");
const order = document.querySelectorAll(".order-btn");
proBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const endPoint = btn.getAttribute("id");
    switch (endPoint) {
      case "all":
        createForm("products", [], "Fetch");
        setFetch("product", "", "g", false);
        break;
      case "category":
        createForm("products", [], "Fetch");
        setFetch("product", "categories", "g", false);
        break;
      case "byC":
        setFetch("products", "", "g", false);
        dropDown();
        break;
      case "byI":
        createForm(
          "products",
          onlyId,
          "Fetch",
          "http://localhost:8080/products/byid/"
        );
        setFetch("product", "byid/", "g", false);
        break;
      case "new":
        createForm("products", newProduct, "New product");
        setFetch("product", "", "p", true);
        break;
      case "delete":
        createForm("products", onlyId, "Delete");
        setFetch("product", "", "d", true);
        break;
      default:
        console.log("Something wrong with btn " + endPoint);
    }
  });
});

userBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = localStorage.getItem("id");
    const endPoint = btn.getAttribute("id");
    switch (endPoint) {
      case "get":
        createForm("user", getUser, "Sing in");
        setFetch("user", "get", "p", false);
        break;
      case "new":
        createForm("user", newUser, "Sing up");
        setFetch("user", "new", "p", false);
        break;
      case "password":
        id && modal("user");
        createForm("user", password, "Sing in");
        setFetch("user", "password", "pc", true);
        break;
      case "update":
        id && modal("user");
        createForm("user", update, "Sing in");
        setFetch("user", "", "pc", true);
        break;
      case "delete":
        id && modal("user");
        createForm("user", onlyId, "Delete");
        setFetch("user", "", "d", true);
        break;
      default:
        console.log("Something wrong with btn " + endPoint);
    }
  });
});
addBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = localStorage.getItem("id");
    const endPoint = btn.getAttribute("id");
    switch (endPoint) {
      case "regAdd":
        id && modal("user");
        createForm("add", userAdd, "Register");
        setFetch("address", "", "p", true);
        break;
      case "updAdd":
        id && modal("user");
        createForm("add", userAdd, "Update");
        setFetch("address", "", "pc", true);
        break;
      case "getAdd":
        id && modal("user");
        createForm("add", onlyId, "Fetch", "http://localhost:8080/add/");
        setFetch("address", "", "g", true);
        break;
      default:
        console.log("Something wrong with btn " + endPoint);
    }
  });
});
cart.forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = localStorage.getItem("id");
    const endPoint = btn.getAttribute("id");
    switch (endPoint) {
      case "add":
        id && modal("user");
        createForm("cart", cartProduct, "Add product");
        setFetch("cart", "", "p", true);
        break;
      case "notP":
        id && modal("user");
        createForm("cart", onlyId, "Fetch", "http://localhost:8080/cart/");
        setFetch("cart", "", "g", false);
        break;
      case "purchased":
        id && modal("user");
        createForm(
          "cart",
          cartPur,
          "Fetch",
          "http://localhost:8080/cart/purchased/params?"
        );
        setFetch("cart", "", "g", true);
        break;
      case "update":
        id && modal("user");
        createForm("cart", cartUpdate, "Update");
        setFetch("cart", "", "pc", true);
        break;
      case "delete":
        id && modal("user");
        createForm("cart", cartDel, "Delete");
        setFetch("cart", "", "d", true);
        break;
      case "delItem":
        id && modal("user");
        createForm("cart", cartInp, "Delete");
        setFetch("cart", "item", "d", true);
        break;
      default:
        console.log("Something wrong with btn " + endPoint);
    }
  });
});
order.forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = localStorage.getItem("id");
    const endPoint = btn.getAttribute("id");
    switch (endPoint) {
      case "complete":
        id && modal("user");
        createForm("order", update, "Complete");
        setFetch("order", "", "p", true);
        break;
      case "get":
        id && modal("user");
        createForm("order", onlyId, "Fetch", "http://localhost:8080/order/");
        setFetch("order", "", "g", true);
        break;
      case "guest":
        id && modal("user");
        createForm("order", guest, "Complete");
        setFetch("order", "", "p", true);
        break;
      default:
        console.log("Something wrong with btn " + endPoint);
    }
  });
});
