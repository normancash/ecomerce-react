import React, { Component } from "react";
import ProductServices from "./service/ProductServices";
import {DataTable} from 'primereact/datatable';
import { Column } from "primereact/column";
import {Panel} from "primereact/panel";
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';


export class ListProduct extends Component {

    emptyProduct = {
        id: null,
        name: '',
        imagen: '',
        description: ''       
    };

    constructor(props){
        super(props)
        this.state = {
            products:null,
            product : this.emptyProduct,
            selectedProduct: null,
            visibleEdit : false,  
            deleteProductDialog : false                  
        }      
        this.productServices =  new ProductServices();  
    };

   

    componentDidMount(){
        this.productServices.getAll().then((data)=>this.setState({products : data}));               
    };

    
   
   
    

    render(){
        const footerDialog = (
            <React.Fragment>
                <Button label="Save" className="mr-2" onClick={this.saveProduct} />
                <Button label="Cancel" className="mr-2" onClick={this.hideDialog} />
            </React.Fragment>
        );
        
        const leftContents = (
            <React.Fragment>
                <Button label="New" className="mr-2" onClick={this.showDialogNew} />
                <Button label="Update" className="mr-2" onClick={this.showDialogEdit} />
                <Button label="Delete"  className="p-button-success mr-2" onClick={this.showDialogDelete} />              
            </React.Fragment>            
        );

        const deleteProductDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProductDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteProduct} />
            </React.Fragment>
        );
     
        return (  
            <div style={{width:'80%', margin: '0 auto', marginTop: '20px'}}>                
                <Panel header="Products">
                <Toolbar left={leftContents}/>
                <DataTable value={this.state.products} 
                    dataKey="id" 
                    selection={this.state.selectedProduct}
                    onSelectionChange={(e) => this.setState({ selectedProduct: e.value })}
                    paginator rows={10} rowsPerPageOptions={[5, 10, 25]}                >
                    <Column selectionMode="single" headerStyle={{ width: '2rem' }}></Column>
                    <Column field="id" header="Id"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="description" header="Description"></Column>
                    <Column field="imagen" header="Imagen"></Column>                    
                </DataTable>
                </Panel>

                <Dialog header="Edit Product" 
                        visible={this.state.visibleEdit} modal={true} style={{ width: '50vw' }}
                        onHide={this.hideDialog} footer={footerDialog}>
                        <br/>
                        <span className="p-float-label">    
                             <InputText value={this.state.product.name} id="name" 
                             onChange={(e) => this.onInputChange(e, 'name')} />
                            <label htmlFor="Name">Name</label>
                       </span>
                       <br/>
                       <span className="p-float-label">                             
                            <InputText id="description" value={this.state.product.description}
                            onChange={(e) => this.onInputChange(e, 'description')} />
                            <label htmlFor="description">Description</label>
                        </span>
                        <br/>
                        <span className="p-float-label">                          
                            <InputText id="imagen" value={this.state.product.imagen}
                            onChange={(e) => this.onInputChange(e, 'imagen')} />
                            <label htmlFor="Imagen">Imagen</label>
                        </span>
                        <br/>                   
                </Dialog>  
                <Dialog visible={this.state.deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal={true} footer={deleteProductDialogFooter} onHide={this.hideDeleteProductDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.product && <span>Are you sure you want to delete <b>{this.state.product.name}</b>?</span>}
                    </div>
                </Dialog>
                <Toast ref={(el) => this.toast = el} />
              
             </div>   
        )                 
    }
    
    showDialogNew = () => {
        this.setState({visibleEdit:true}); 
        if (this.state.product.id != null) {
            this.setState({product : this.emptyProduct});
        }     
    }

    showDialogEdit = () => {
        this.setState({visibleEdit:true,
                       product :this.state.selectedProduct});
    }

    showDialogDelete = () => {
        this.setState({deleteProductDialog : true})
    }

    saveProduct =  () => {
        this.productServices.save(this.state.product).then((data) => {
            this.setState({visibleEdit : false,                           
                           product : this.emptyProduct});
            this.productServices.getAll().then((data)=>this.setState({products : data}),
            this.toast.show({severity:'success', summary: 'Product Summited Success', detail:'Product Summit', life: 3000}));
            
        });    
       
    }

   

    hideDialog = () => {
        this.setState({visibleEdit : false});
    }

    hideDeleteProductDialog = () => {
        this.setState({deleteProductDialog :false})
    }
   
    onInputChange =(e, name) => {
        const val = (e.target && e.target.value) || '';
        let product = {...this.state.product};
        product[`${name}`] = val;
        this.setState({ product });
    }

    deleteProduct= ()=>{
        let id = this.state.selectedProduct.id;
        let products = [...this.state.products];
        this.productServices.delete(id).then( res => {
            this.setState({deleteProductDialog : false,
                            products: products.filter(product => product.id !== id)});
        });
        this.toast.show({severity:'success', summary: 'Product Deleted Success', detail:'Product Summit', life: 3000});        
    }
}