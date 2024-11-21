import { Input, Space } from "antd"; 

import Modal from "antd/lib/modal/Modal"; 

import React, { useEffect, useState } from "react"; 

import { Select } from 'antd'; 

 

const { Option } = Select; 

let localId = 1;

 

export const MatzapasBodiesCreateDialog = ({ 
 visible, 
 onOk, 
 onCancel, 
 currentRecord, 
 materials, 
 matzapasHeaderID, 
 ...props 

}) => { 
 const [matzapasBody, setMatzapasBody] = useState(null); 

 
 useEffect(() => { 
   if (currentRecord) { 
    setMatzapasBody(currentRecord); 
   } else { 
    setMatzapasBody(null); 
   } 
 }, [currentRecord]) 

 
 const onOkHandler = async () => { 
   

  const record = 
    {id: localId, 
      materialID: matzapasBody.materialID, 
      unit: matzapasBody.unit,
      norma: matzapasBody.norma,
      count: matzapasBody.count,
      price: matzapasBody.price,
      sum: matzapasBody.sum,
      issue: matzapasBody.issue,
      debet: matzapasBody.debet,
      credit: matzapasBody.credit 
    } 
   onOk(record); 
   setMatzapasBody(null); 
   localId += 1; 
}

 
 return ( 
   <Modal 
    visible={visible} 
    title={currentRecord ? 'Редактировать' : 'Создать'} 
    onOk={onOkHandler} 
    onCancel={onCancel} 
   > 
    <Space direction="vertical"> 

 
      <Select 
       value={matzapasBody?.materialID || null} 
       onChange={value => setMatzapasBody({...matzapasBody, materialID: value})} 
       placeholder={"Выберите продукт"} 
       style={{ width: '100%' }} 
      > 
       {materials.map(it => <Option 
         value={it.id}> 
         {it.title} 
       </Option>)} 

 
      </Select> 

 
      <Space> 

 
       <Input  
         value={matzapasBody?.unit || ''} 
         onChange={e => setMatzapasBody({ ...matzapasBody, unit: e.target.value })} 
         placeholder="Укажите ед. измерения" 
       /> 

 
       <Input 
         value={matzapasBody?.count || ''} 
        onChange={e => setMatzapasBody({ ...matzapasBody, count: +e.target.value })} 
         placeholder="Укажите количество" 
       /> 

 
      </Space> 

      <Space> 

 
       

       <Input 
         value={matzapasBody?.norma || ''} 
        onChange={e => setMatzapasBody({ ...matzapasBody, norma: e.target.value })} 
         placeholder="Укажите норму" 
       /> 

 
       <Input 
         value={matzapasBody?.price || ''} 
         onChange={e => setMatzapasBody({ ...matzapasBody, price: +e.target.value })} 
         placeholder="Укажите цену" 
       /> 

 
      </Space>

      <Space> 

 
       <Input  
         value={matzapasBody?.sum || ''} 
         onChange={e => setMatzapasBody({ ...matzapasBody, sum: +e.target.value })} 
         placeholder="Укажите сумму" 
       /> 
 

 
      </Space> 

      <Space> 

 
       <Input  
         value={matzapasBody?.issue || ''} 
         onChange={e => setMatzapasBody({ ...matzapasBody, issue: e.target.value })} 
         placeholder="Укажите причину" 
       /> 
 

 
      </Space> 

      <Space> 

 
       <Input  
         value={matzapasBody?.debet || ''} 
         onChange={e => setMatzapasBody({ ...matzapasBody, debet: +e.target.value })} 
         placeholder="Укажите дебет" 
       /> 

 
       <Input 
         value={matzapasBody?.credit || ''} 
        onChange={e => setMatzapasBody({ ...matzapasBody, credit: +e.target.value })} 
         placeholder="Укажите кредит" 
       /> 

 
      </Space>

 
    </Space> 

 
   </Modal> 
 ) 

}