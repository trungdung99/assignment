import axios from "axios";
import AdminNav from "../../../component/AdminNav";
import { edit, getAllProduct } from "../../../api/product";

const EditProduct = {
    async render(id) {
        const { data } = await getAllProduct(id);
        console.log(data);
        return /* html */ `
        <div>
        <header>
          ${AdminNav.render()}
        </header>
        <div>
        <div class="md:grid md:grid-cols-2 md:gap-6">
          <div class="md:col-span-1">
            <div class="py-8 px-4 sm:px-0">
              <h3 class="text-4xl font-medium leading-6 text-gray-900">SỬA SẢN PHẨM</h3>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form id = "formEditProduct">
              <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div class="grid grid-cols-3 gap-6">
                    <div class="col-span-3 sm:col-span-2">
                    <label for="about" class="block text-sm font-medium text-gray-700"> Tiêu Đề </label>
                      <div class="mt-1">
                      <textarea id="title-product" id="title-product" name="about" rows="1" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Nhập Tên Sản Phẩm">${data.title}</textarea>
                      </div>
                    </div>
                  </div>
      
                  <div>
                  <label for="about" class="block text-sm font-medium text-gray-700"> Giá Tiền </label>
                  <div class="mt-1">
                    <textarea id="price-product" id="price-product" name="about" rows="1" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Nhập Giá Tiền">${data.price}</textarea>
                  </div>
                </div>
      
                  <div>
                    <label for="about" class="block text-sm font-medium text-gray-700"> Mô Tả </label>
                    <div class="mt-1">
                      <textarea id="desc-product" name="about" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Nhập Mô Tả">${data.desc}</textarea>
                    </div>
                  </div>
      
                  <div>
                    <label class="block text-sm font-medium text-gray-700"> Photo </label>
                    <img width="200" src="${data.img}" id="img-preview"/>
                  </div>
      
                  <div>
                    <label class="block text-sm font-medium text-gray-700"> Cover photo </label>
                    <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div class="space-y-1 text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div class="flex text-sm text-gray-600">
                          <label for="img-post" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span>Upload a file</span>
                            <input id="img-post" name="img-post" type="file" class="sr-only">
                          </label>
                          <p class="pl-1">or drag and drop</p>
                        </div>
                        <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
        `;
    },
    afterRender(id) {
        const formEditProduct = document.querySelector("#formEditProduct");
        const imgPreview = document.querySelector("#img-preview");
        const imgPost = document.querySelector("#img-post");
        let imgLink = "";

        const CLOUDINARY_PRESET = "jkbdphzy";
        const CLOUDINARY_API_URL = "https://api.cloudinary.com/v1_1/ecommercer2021/image/upload";

        // preview
        imgPost.addEventListener("change", (e) => {
            imgPreview.src = URL.createObjectURL(e.target.files[0]);
        });

        formEditProduct.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Lấy giá trị của input file
            const file = document.querySelector("#img-post").files[0];
            if (file) {
                // Gắn vào đối tượng formData
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", CLOUDINARY_PRESET);

                // call api cloudinary, để upload ảnh lên
                const { data } = await axios.post(CLOUDINARY_API_URL, formData, {
                    headers: {
                        "Content-Type": "application/form-data",
                    },
                });
                imgLink = data.url;
            }
            console.log(document.querySelector("#title-product").value);
            // call API sửa sản phẩm
            edit({
                id,
                title: document.querySelector("#title-product").value,
                img: imgLink || imgPreview.src,
                price: document.querySelector("#price-product").value,
                desc: document.querySelector("#desc-product").value,
            }).then(() => {
                alert("Update success");
            });
        });
    },
};
export default EditProduct;