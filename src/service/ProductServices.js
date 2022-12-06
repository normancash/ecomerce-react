import axios from 'axios';

const URL = "http://localhost:8181/api/product";

class ProductServices {

    getAll(){
        return axios.get(URL + "/listAll").then(res => res.data);
    }

    save(product) {
        return axios.post(URL + "/saveJson", product).then(res => res.data);
    }

    delete(id) {
        return axios.delete(URL + "/delete/"+id).then(res => res.data);
    }
}

export default ProductServices