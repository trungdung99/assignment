import Header from "../component/header";
import Nav from "../component/nav";

import { reRender } from "../utils";
import { decreaseQuantity, increaseQuantity, removeItemInCart } from "../utils/cart";

const CartPage = {
    render() {
        let cart = [];
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        return /* html */ `
        ${Header.render()}
        ${Nav.render()}
        <div class="single-product-area">
        <div class="zigzag-bottom"></div>
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="single-sidebar">
                        <h2 class="sidebar-title">Search Products</h2>
                        <form action="#">
                            <input type="text" placeholder="Search products...">
                            <input type="submit" value="Search">
                        </form>
                    </div>
                </div>
                
                <div class="col-md-8">
                    <div class="product-content-right">
                        <div class="woocommerce">
                            <form method="post" action="#">
                                <table cellspacing="0" class="shop_table cart">
                                    <thead>
                                        <tr>
                                            <th class="product-remove">&nbsp;</th>

                                            <th class="product-name">Product</th>
                                            <th class="product-price">Price</th>
                                            <th class="product-quantity">Quantity</th>
                                            <th class="product-subtotal">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    ${cart.map((item) => /* html */ `
                                    <tr class="cart_item">
                                        <td class="product-remove">
                                            <a title="Remove this item" class="remove" data-id="${item.id}" class="btn btn-remove">×</a>
                                        </td>
                                        <td> ${item.title}</td>

                                        <td> ${item.price}</td>

                                        <td class="product-quantity">
                                            <div class="quantity buttons_added">
                                                <input type="button" data-id="${item.id}" class="btn btn-decrease" value="-">
                                                <input type="number" size="4" class="input-text qty text" title="Qty" value="1" min="0" step="1">
                                                <input type="button" data-id="${item.id}" class="btn btn-increase" value="+">
                                            </div>
                                        </td>

                                        <td class="product-subtotal">
                                            <span class="amount"></span> 
                                        </td>
                                        </tr>
                                        <tr>
                                        <td class="actions" colspan="6">
                                            <div class="coupon">
                                                <label for="coupon_code">Coupon:</label>
                                                <input type="text" placeholder="Coupon code" value="" id="coupon_code" class="input-text" name="coupon_code">
                                                <input type="submit" value="Apply Coupon" name="apply_coupon" class="button">
                                            </div>
                                            <input type="submit" value="Update Cart" name="update_cart" class="button">
                                            <input type="submit" value="Checkout" name="proceed" class="checkout-button button alt wc-forward">
                                        </td>
                                        </tr>
                                        `).join("")}
                                    </tbody>
                                </table>
                            </form>
                            </div>
                        </div>                        
                    </div>                    
                </div>
            </div>
        </div>
    </div>
        `;
    },
    afterRender() {
        const btns = document.querySelectorAll(".btn");
        btns.forEach((button) => {
            button.addEventListener("click", () => {
                const { id } = button.dataset;
                if (button.classList.contains("btn-increase")) {
                    console.log(id);
                    increaseQuantity(id);
                } else if (button.classList.contains("btn-decrease")) {
                    decreaseQuantity(id, () => {
                        reRender(CartPage, "#app");
                    });
                } else {
                    removeItemInCart(id, () => {
                        reRender(CartPage, "#app");
                    });
                }
            });
        });
    },
};
export default CartPage;