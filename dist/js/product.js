let count=0,trans=0;function handleCartButtons(t){if(t.preventDefault(),"BUTTON"==t.target.tagName){let e=t.target.dataset.id,r=model.getProductsFromLs().find(t=>t.id==e);r&&(model.addItemToLsCart(r),view.updateCart(),t.target.textContent="In Cart",t.target.disabled=!0,view.showAddAlert(r),document.querySelector(".alert").addEventListener("click",t=>{"BUTTON"==t.target.tagName&&(t.preventDefault(),t.currentTarget.innerHTML="",t.currentTarget.style.display="none")}))}else if("each-product"==t.target.className||"IMG"==t.target.tagName||"content-container"==t.target.className||"product-name"==t.target.className||"product-price"==t.target.className||"availability"==t.target.className||"product-price-val"==t.target.className)if("each-product"==t.target.className){let e=t.target.dataset.id;model.setCurrentItemInCart(e),window.location.href="product.html"}else{let e=t.target.closest("a").dataset.id;model.setCurrentItemInCart(e),window.location.href="product.html"}}function handleNavBar(t){document.querySelector(".nav-slide").classList.toggle("open"),t.preventDefault()}setInterval(()=>{if(count+=1,!(count<7))return count=0,trans=0,document.querySelector(".slider").style.transitionDuration="0s",document.querySelector(".slider").style.transform=`translateX(${trans})`,!1;trans+=23,document.querySelector(".slider").style.transitionDuration="0.5s",document.querySelector(".slider").style.transform=`translateX(-${trans}vw)`},3e3);class Model{increaseOrDecreaseQuantityInCart(t){let e,r,a=this.getCurrentItemFromLs(),n=this.getCartFromLs();this.getCartFromLs().forEach((t,n)=>{t.id==a.id&&(e=n,r=t)}),r.quantity=t,n.splice(e,1,r),localStorage.setItem("shoeprocart",JSON.stringify(n))}setCurrentItemInCart(t){if(model.doesCurrentItemExistInLs()){let e=JSON.parse(localStorage.getItem("shoeproci"));0==e.length?(e.push(t),localStorage.setItem("shoeproci",JSON.stringify(e))):(e.splice(0,1,t),localStorage.setItem("shoeproci",JSON.stringify(e)))}}addItemToLsCart(t){let e,r=Number(document.querySelector(".quantity-value").textContent);this.doesCartExistInLs()?(e=this.getCartFromLs(),t={...t,quantity:r},e.push(t),localStorage.setItem("shoeprocart",JSON.stringify(e))):(e=[],t={...t,quantity:r},e.push(t),localStorage.setItem("shoeprocart",JSON.stringify(e)))}doesProductsExistInLs(){return!!localStorage.getItem("shoeproprods")}doesCartExistInLs(){return!!localStorage.getItem("shoeprocart")}getCartFromLs(){return JSON.parse(localStorage.getItem("shoeprocart"))}getProductsFromLs(){return JSON.parse(localStorage.getItem("shoeproprods"))}doesCurrentItemExistInLs(){return!!localStorage.getItem("shoeproci")}getCurrentItemFromLs(){if(this.doesCurrentItemExistInLs()){let t=JSON.parse(localStorage.getItem("shoeproci"))[0];return this.getProductsFromLs().find(e=>e.id==t)}}}const model=new Model;class View{incrementOrDecrement(t){let e=Number(document.querySelector(".quantity-value").textContent);switch(t.target.className){case"decrement":e>1&&(e-=1),document.querySelector(".quantity-value").textContent=e.toString(),1==document.querySelector(".add-to-cart").disabled&&model.increaseOrDecreaseQuantityInCart(e);break;case"increment":e+=1,document.querySelector(".quantity-value").textContent=e.toString(),1==document.querySelector(".add-to-cart").disabled&&model.increaseOrDecreaseQuantityInCart(e)}}displayCurrentItem(t){let e=model.getCartFromLs().find(e=>e.id==t.id),r=`\n      <div class="left">\n        <img src="${t.url}" alt="">\n      </div>\n      <div class="right">\n        <h1 class="product-header">${t.title}</h1>\n        <h5 class="brand">Brand:  &nbsp;<span class="brand-name">${t.brand}</span></h5>\n        <h5 class="price">Price: &nbsp; <span class="price-value">${t.price.toLocaleString()}</span></h5>\n        <h4 class="description-title">Description</h4>\n        <p class="description">${t.description}</p>\n        <div class="quantity-container">\n          <h4 class="quantity">Quantity:</h4>\n          <div class="quantity-button">\n            <button class="decrement">-</button>\n            <p class="quantity-value">${e?t.quantity:1}</p>\n            <button class="increment">+</button>\n          </div>\n        </div>\n        <div class="button-container">\n          <a href="./index.html" class="return-to-homepage">Continue Shopping</a>\n          <button data-id="${t.id}" class="add-to-cart">Add To Cart</button>\n        </div>\n      </div>\n      `;document.querySelector(".flex-wrapper").innerHTML=r}confirmIfItemInCart(t){if(model.doesCartExistInLs()){let e=model.getCartFromLs().find(e=>e.id==t);e&&(document.querySelector(".add-to-cart").textContent="In Cart",document.querySelector(".add-to-cart").disabled=!0,document.querySelector(".quantity-value").textContent=e.quantity)}}confirmIfYouMayLikeInCart(){if(model.doesCartExistInLs()){document.querySelectorAll(".each-product button").forEach(t=>{let e=t.dataset.id;model.getCartFromLs().find(t=>t.id==e)&&(t.textContent="In Cart",t.disabled=!0)})}}displayYouMayAlsoLike(t){let e=t.category,r=t.id;if(model.doesProductsExistInLs()){let t=model.getProductsFromLs().filter(t=>t.category==e).filter(t=>t.id!=r),a="";for(let e=0;e<11;e++)a+=`\n        <a href="./product.html" data-id="${t[e].id}" class="each-product">\n            <div class="img-container">\n              <img src="${t[e].url}" alt="">\n            </div>\n            <div class="content-container">\n              <p class="product-name">${t[e].title}</p>\n              <p class="product-price">${t[e].price.toLocaleString()}</p>\n              <p class="availability">Availability: &nbsp;<span class="av-value">${t[e].availability}</span></p>\n              <button data-id="${t[e].id}" >Add to cart</button>\n            </div>\n          </a>\n        `;document.querySelector(".slider").innerHTML=a}}updateCart(){let t=model.getCartFromLs();document.querySelector(".cart-value").textContent=t.length}showAddAlert(t){let e=`\n    <div class="alert-inner">\n      <h3 class="alert-header">Item Added to Cart</h3>\n      <div class="alert-img">\n        <img src="${t.url}" alt="">\n      </div>\n      <p class="alert-name">${t.title}</p>\n      <p class="alert-price">Price: <span class="alert-price-value">${t.price.toLocaleString()}</span></p>\n      <button class="alert-cs">Continue Shopping</button>\n      <a href="./cart.html" class="alert-gtc">Go To Cart</a>\n    </div>\n    `;document.querySelector(".alert").style.display="flex",document.querySelector(".alert").innerHTML=e}}const view=new View;class Controller{init(){document.querySelector(".current-year").textContent=(new Date).getFullYear();let t=model.getCurrentItemFromLs();document.querySelector(".slider").addEventListener("click",handleCartButtons),document.addEventListener("DOMContentLoaded",()=>{view.updateCart(),view.displayCurrentItem(t),view.confirmIfItemInCart(t.id),document.querySelector(".quantity-button").addEventListener("click",view.incrementOrDecrement),1!=document.querySelector(".add-to-cart").disabled&&document.querySelector(".add-to-cart").addEventListener("click",t=>{t.preventDefault();let e=t.target.dataset.id,r=model.getProductsFromLs().find(t=>t.id==e);r&&(model.addItemToLsCart(r),view.updateCart(),t.target.textContent="In Cart",t.target.disabled=!0,view.showAddAlert(r),document.querySelector(".alert").addEventListener("click",t=>{"BUTTON"==t.target.tagName&&(t.preventDefault(),t.currentTarget.innerHTML="",t.currentTarget.style.display="none")}))}),view.displayYouMayAlsoLike(t),view.confirmIfYouMayLikeInCart(),document.querySelector(".menu").addEventListener("click",handleNavBar),document.querySelector(".close").addEventListener("click",t=>{document.querySelector(".nav-slide").classList.remove("open"),t.preventDefault()})})}}const controller=new Controller;controller.init();