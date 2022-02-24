import Banner from "../component/banner";
import Footer from "../component/footer";
import Header from "../component/header";
import Nav from "../component/nav";
import ProductList from "../component/productlist";
import Promo from "../component/promo-area";

const HomePage = {
    async render() {
        return /* html */ `
        <header>
            ${Header.render()}
            ${Nav.render()}
        </header>
        <section>
            ${Banner.render()}
            ${Promo.render()}
        </section>
        <section class = "main-content-area">
        <div class="maincontent-area">
        <div class="zigzag-bottom"></div>
        ${await ProductList.listProduct()}
    </div> <!-- End main content area -->
        </section>
        <section class = "footer">
            ${Footer.render()}
        </section>
        `;
    },
};
export default HomePage;