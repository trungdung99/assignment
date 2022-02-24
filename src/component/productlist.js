import { getAll, getAllProduct } from "../api/product";

const ProductList = {
    async render() {
        const { data } = await getAll();
        console.log(data);
        return /* html */`
        ${data.map((product) => `
        <div class="maincontent-area">
        <div class="zigzag-bottom"></div>
        <div class="container">
        <div class="row">
            <div class="col-md-3 col-sm-6">
                <div class="single-shop-product">
                    <div class="product-upper">
                        <img src="${product.img}" alt="">
                    </div>
                    <h2><a href="/detail-product/:id">${product.name}</a></h2>
                    <div class="product-carousel-price">
                        ${product.price}
                    </div>  
                    
                    <div class="product-option-shop">
                        <a class="add_to_cart_button" data-quantity="1" data-product_sku="" data-product_id="70" rel="nofollow" href="/canvas/shop/?add-to-cart=70">Add to cart</a>
                    </div>                       
                </div>
            </div>
        </div>
    </div>
    `).join("")}
        </div>
        `;
    },

    async listProduct() {
        const { data } = await getAll();
        return /* html */`

        <div class="container">
            <div class="row">
                ${data.map((item) => /* html */ `
                    <div class="col-md-3 col-sm-6">
                        <div class="single-shop-product">
                            <div class="product-upper">
                                <img width="195" height="243" src="${item.img}" alt="">
                            </div>
                            <h2><a href="/detail-product/${item.id}">${item.title}</a></h2>
                            <div class="product-carousel-price">
                                ${item.price}
                            </div>  
                            
                            <div class="product-option-shop">
                                <a class="add_to_cart_button" data-quantity="1" data-product_sku="" data-product_id="70" rel="nofollow" href="/cart">Add to cart</a>
                            </div>                       
                        </div>
                    </div>
                    `).join("")}
                
            </div>
        </div>


        </div>
        `;
    },
    async detailProduct(id) {
        const { data } = await getAllProduct(id);
        return /* html */`
        ${data.map((product) => `
        <div class="product-content-right">
        
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
                    <h2 class="product-name">${product.name}</h2>
                    <div class="product-inner-price">
                    ${product.price}
                    </div>    
                    
                    <form action="" class="cart">
                        <div class="quantity">
                            <input type="number" size="4" class="input-text qty text" title="Qty" value="1" name="quantity" min="1" step="1">
                        </div>
                        <button class="add_to_cart_button" type="submit">Add to cart</button>
                    </form>   
                    
                    <div role="tabpanel">
                        <ul class="product-tab" role="tablist">
                            <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Description</a></li>
                            <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Reviews</a></li>
                        </ul>
                        <div class="tab-content">
                            <div role="tabpanel" class="tab-pane fade in active" id="home">
                                <h2>Product Description</h2>  
                                ${product.desc}
                            </div>
                            <div role="tabpanel" class="tab-pane fade" id="profile">
                                <h2>Reviews</h2>
                                <div class="submit-review">
                                    <p><label for="name">Name</label> <input name="name" type="text"></p>
                                    <p><label for="email">Email</label> <input name="email" type="email"></p>
                                    <div class="rating-chooser">
                                        <p>Your rating</p>

                                        <div class="rating-wrap-post">
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                        </div>
                                    </div>
                                    <p><label for="review">Your review</label> <textarea name="review" id="" cols="30" rows="10"></textarea></p>
                                    <p><input type="submit" value="Submit"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    `).join("")}
        </div>
        `;
    },
    async listProductAdmin() {
        const { data } = await getAll();
        console.log(data);

        return /* html */`
        ${data.map((product) => `
        <tr>
              <td class="px-6 py-4 whitespace-nowrap">
              ${product.id}  
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${product.title}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">${product.desc}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900"> <img src="${product.img}" width="120" alt=""></div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">${product.price}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="/admin/product/edit/${product.id}" class="text-indigo-600 hover:text-indigo-900">Sửa</a>
                <button data-id="${product.id}" class = "btn inline-block bg-indigo-500 hover:bg-red-800 text-white text-sm py-2 px-6 rounded mx-4">Xóa</button>
              </td>
            </tr>
    `).join("")}
        </div>
        `;
    },
};
export default ProductList;