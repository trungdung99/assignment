import toastr from "toastr";
import { getAllProduct } from "../api/product";
import Nav from "../component/nav";
import Footer from "../component/footer";
import Header from "../component/header";
import "toastr/build/toastr.min.css";
import { addToCart } from "../utils/cart";

const DetailProduct = {
    async render(id) {
        const { data: product } = await getAllProduct(id);
        return /* html */`
        <header>
        ${Header.render()}
        ${Nav.render()}
        </header>
        <div class="single-product-area">
        <div class="zigzag-bottom"></div>
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="single-sidebar">
                        <h2 class="sidebar-title">Search Products</h2>
                        <form action="">
                            <input type="text" placeholder="Search products...">
                            <input type="submit" value="Search">
                        </form>
                    </div>
                </div>
                
                <div class="col-md-8">
                    <div class="product-content-right">
                        <div class="product-breadcroumb">
                            <a href="/">Home</a>
                            <a href="">Category Name</a>
                            <a href="">Sony Smart TV - 2015</a>
                        </div>
                        
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="product-images">
                                    <div class="product-main-img">
                                        <img src="${product.img}" alt="">
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-sm-6">
                                <div class="product-inner">
                                    <h2 class="product-name">${product.title}</h2>
                                    <div class="product-inner-price">
                                        ${product.price}
                                    </div>    
                                    
                                    <form action="" class="cart">
                                        <div class="quantity">
                                            <input type="number" id="inputValue" size="4" class="input-text qty text" title="Qty" value="1" name="quantity" min="1" step="1">
                                        </div>
                                        <button class="add_to_cart_button" data-id="${product.id}" id="btnAddToCart" type="button">Add to cart</button>
                                    </form>   
                                    
                                    <div role="tabpanel">
                                        <ul class="product-tab" role="tablist">
                                            <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Description</a></li>
                                        </ul>
                                        <div class="tab-content">
                                            <div role="tabpanel" class="tab-pane fade in active" id="home">
                                                <h2>Product Description</h2>  
                                                ${product.desc}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
        ${Footer.render()}
        `;
    },
    afterRender() {
        const btnAddToCart = document.querySelector("#btnAddToCart");
        const { id } = btnAddToCart.dataset;

        const inputValue = document.querySelector("#inputValue");

        btnAddToCart.addEventListener("click", async () => {
            // console.log(inputValue.value)
            const { data } = await getAllProduct(id);
            console.log(data);
            addToCart({ ...data, quantity: inputValue.value ? inputValue.value : 1 }, () => {
                toastr.success(`Thêm sản phẩm ${data.name} vào giỏ hàng thành công!`);
            });
        });
    },
};
export default DetailProduct;