import Navigo from "navigo";
import Dashboard from "./page/admin/dashboard";
import AddNews from "./page/admin/news/add";
import EditNews from "./page/admin/news/edit";
import AdminNewsPage from "./page/admin/news/index-news";
import AddProduct from "./page/admin/product/add";
import EditProduct from "./page/admin/product/edit";
import AdminProductPage from "./page/admin/product/index-product";
import NewsPage from "./page/news-page";
import HomePage from "./page/home";
import ShopPage from "./page/shop-page";
import NotFoundPage from "./page/notfound";
import DetailProduct from "./page/detail-product";
import Signin from "./page/signin";
import Signup from "./page/signup";
import CartPage from "./page/cart";

const router = new Navigo("/", { linksSelector: "a", hash: true });

const print = async (content, id) => {
    document.querySelector("#app").innerHTML = await content.render(id);
    if (content.afterRender) await content.afterRender(id);
};

router.on({
    "/": () => {
        print(HomePage);
    },
    "/shop-page/": () => {
        print(ShopPage);
    },
    "/news-page/": () => {
        print(NewsPage);
    },
    "/detail-product/:id": ({ data }) => {
        print(DetailProduct, data.id);
    },
    "/admin/dashboard": () => {
        print(Dashboard);
    },
    "/admin/news": () => {
        print(AdminNewsPage);
    },
    "/admin/product": () => {
        print(AdminProductPage);
    },
    "/admin/news/add": () => {
        print(AddNews);
    },
    "admin/news/edit": () => {
        print(EditNews);
    },
    "admin/product/add": () => {
        print(AddProduct);
    },
    "admin/product/edit/:id": ({ data }) => {
        print(EditProduct, data.id);
    },
    "/signin/": () => {
        print(Signin);
    },
    "/signup/": () => {
        print(Signup);
    },
    "/cart/": () => {
        print(CartPage);
    },
});
router.notFound(() => print(NotFoundPage));
router.resolve();