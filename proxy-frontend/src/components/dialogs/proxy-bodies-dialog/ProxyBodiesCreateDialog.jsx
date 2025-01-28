import { Input, Space, Button } from "antd"; 

import Modal from "antd/lib/modal/Modal"; 

import React, { useEffect, useState } from "react"; 

import { Select } from 'antd'; 
import ProductService from "../../../api/services/product-service";
 

const { Option } = Select; 
let localId = 1; 


 

export const ProxyBodiesCreateDialog = ({ 
 visible, 
 onOk, 
 onCancel, 
 currentRecord, 
 products, 
 proxyHeaderId,
 onProductCreate,  
 ...props 

}) => { 
 const [proxyBody, setProxyBody] = useState(null);
 const [productsOptions, setProductOptions] = useState(products);
 const [newProductName, setNewProductName] = useState("");
 const [loading, setLoading] = useState(false); 

 
 useEffect(() => {
  setProductOptions(products);  
   if (currentRecord) { 
    setProxyBody(currentRecord); 
   } else { 
    setProxyBody(null); 
   } 
 }, [currentRecord, products]) 

 
 const onOkHandler = async () => { 
   const record = 
    {id: localId, 
      productId: proxyBody.productId, 
      count: proxyBody.count, 
      unit: proxyBody.unit, 
    } 
   onOk(record); 
   setProxyBody(null); 
   localId += 1; 
 }
 
 const handleAddProduct = async () => {
  if (newProductName.trim()) {
    setLoading(true);
    try {
      const newProduct = await ProductService.createRecord({ title: newProductName });
      setProductOptions([...productsOptions, newProduct]); // Обновляем локальный список продуктов
      onProductCreate(newProduct); // Передаём новый продукт в родительский компонент
      setProxyBody((prev) => ({
        ...prev,
        productId: newProduct.id,
      }));
      setNewProductName("");
    } catch (error) {
      console.error("Ошибка при создании структурного подразделения:", error);
    } finally {
      setLoading(false);
    }
  }
};

 
 return ( 
   <Modal 
    visible={visible} 
    title={currentRecord ? 'Редактировать' : 'Создать'} 
    onOk={onOkHandler} 
    onCancel={onCancel} 
   > 
    <Space direction="vertical"> 

 
    <Select
          value={proxyBody?.productId || null}
          onChange={(value) => setProxyBody({ ...proxyBody, productId: value })}
          placeholder="Выберите продукт"
          style={{ width: "100%" }}
          dropdownRender={(menu) => (
            <>
              {menu}
              <div style={{ display: "flex", padding: 8 }}>
                <Input
                  style={{ flex: "auto" }}
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  placeholder="Добавить новый продукт"
                />
                <Button type="link" onClick={handleAddProduct} loading={loading}>
                  Добавить
                </Button>
              </div>
            </>
          )}
        >
          {productsOptions.map((it) => (
            <Option key={it.id} value={it.id}>
              {it.title}
            </Option>
          ))}
        </Select>

 
      <Space> 

 
       <Input  
         value={proxyBody?.unit || ''} 
         onChange={e => setProxyBody({ ...proxyBody, unit: e.target.value })} 
         placeholder="Укажите ед. измерения" 
       /> 

 
       <Input 
         value={proxyBody?.count || ''} 
        onChange={e => setProxyBody({ ...proxyBody, count: +e.target.value })} 
         placeholder="Укажите количество" 
       /> 

 
      </Space> 

 
    </Space> 

 
   </Modal> 
 ) 

}