import React, { useState,useEffect } from 'react';
import ProductServices from './service/ProductServices';
import {DataTable} from 'primereact/datatable';
import { Column } from "primereact/column";
import {Panel} from "primereact/panel";
import { Toolbar } from 'primereact/toolbar';
import {Button} from 'primereact/button';




export default  function HookListProduct(){

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]); 

    const findByCategory =()=> {
        let id = 2;
        productServices.getByCategory(id).then((data)=>(setProducts(data)));
    }

    const leftContents = (
        <React.Fragment>
            <Button label="Zapato" className="mr-2" onClick={findByCategory()} />                       
        </React.Fragment>            
    );


    return(

       

        <div style={{width:'80%', margin: '0 auto', marginTop: '20px'}}>  
             <Panel header="Products">  
                <Toolbar left={leftContents}/>             
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

