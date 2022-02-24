import Footer from "../component/footer";
import Header from "../component/header";
import Nav from "../component/nav";
import ProductList from "../component/productlist";

const ShopPage = {
    async render() {
        return /* html */ `
        <header>
            ${Header.render()}
            ${Nav.render()}
        </header>
        <section>
        <div class="product-big-title-area">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="product-bit-title text-center">
                        <h2>Sản Phẩm</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="container">
        ${await ProductList.listProduct()}
    </div>
</div>
        </section>
        <section class = "footer">
            ${Footer.render()}
        </section>
        `;
    },
};
export default ShopPage;