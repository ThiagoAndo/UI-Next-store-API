import { handleHTTP } from "./HTTP.js";
import { tidyHolder } from "./createForm.js";
import { loadSpining } from "./HTTP.js";
export async function dropDown() {
  const form = document.querySelector("#products");
  const response = await handleHTTP(null, "products/categories", false);
  if (response) {
    setTimeout(() => {
      loadSpining.hide();
    }, 500);
  }
  const content = ` <div class="dropup">
      <button
        type="button"
        class="btn btn-primary dropdown-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Categories
      </button>
      <div class="dropdown-menu">
         ${response
           .map((res) => {
             return `  <p class="dropdown-item" value= products/bycategories?category=${
               res.category
             }> ${tidyHolder(res.category)}</p>`;
           })
           .join("")}
      
      </div>
    </div>
    <br/>
    <div class=logproducts>`;
  form.innerHTML = content;
  document.querySelectorAll(".dropdown-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const cat = btn.getAttribute("value");
      handleHTTP(null, cat, true);
    });
  });
}
