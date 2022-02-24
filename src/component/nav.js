import toastr from "toastr";
import { reRender } from "../utils";
import "toastr/build/toastr.min.css";

const Nav = {
    render() {
        return /* html */`
        <div class="mainmenu-area">
        <div class="container">
            <div class="flex">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div> 
                <div class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li class="menu-item"><a href="/">Home</a></li>
                        <li class="menu-item"><a href="/shop-page">Shop page</a></li>
                        <li class="menu-item"><a href="/news-page">News Page</a></li>
                        <li class="menu-item"><a href="/cart">Cart</a></li>
                        <li class="menu-item"><a href="/admin/dashboard">Dashboard</a></li>
                        <li class="menu-item"><a href="/signin">Login</a></li>
                    </ul>
                </div>  
                

            </div>
        </div>
    </div>
    <!-- End mainmenu area -->
        `;
    },
    afterRender() {
        // Lấy thông tin từ localStorage
        // Sử dụng JSON.parse để chuyển đổi chuỗi sang object
        const email = document.querySelector("#email");
        const logout = document.querySelector("#logout");
        if (email) {
            email.innerHTML = JSON.parse(localStorage.getItem("user")).email;
        }
        if (logout) {
            logout.addEventListener("click", () => {
                localStorage.removeItem("user");
                reRender(Nav, "#nav");
                toastr.success("Logout thành công");
            });
        }
    },
};
export default Nav;