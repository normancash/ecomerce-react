import React, { useState,useEffect } from 'react';
import ProductServices from './service/ProductServices';
import {DataTable} from 'primereact/datatable';
import { Column } from "primereact/column";
import {Panel} from "primereact/panel";




export default function HookListProduct(){

    let emptyProduct = {
        id: null,
        name: '',
        imagen: '',
        description: ''       
    };

    const [product,setProduct] = useState(emptyProduct);
    const [products,setProducts] = useState([]);
    const [selectedProduct,setSelectedProduct] = useState(null);

    const productServices =  new ProductServices();  
    

    useEffect(()=>{
        productServices.getAll().then((data)=>(setProducts(data)));
    },[]); 


    return(
        <div style={{width:'80%', margin: '0 auto', marginTop: '20px'}}>  
             <Panel header="Products">                
                <DataTable value={products} 
                    dataKey="id" 
                    selection={selectedProduct}
                    onSelectionChange={(e) => (setSelectedProduct(e.value))}
                    paginator rows={10} rowsPerPageOptions={[5, 10, 25]}                >
                    <Column selectionMode="single" headerStyle={{ width: '2rem' }}></Column>
                    <Column field="id" header="Id"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="description" header="Description"></Column>
                    <Column field="imagen" header="Imagen"></Column>                    
                </DataTable>
                </Panel>
        </div>
    );
}

