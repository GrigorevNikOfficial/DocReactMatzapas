import { Input, Space } from "antd"; 

import Modal from "antd/lib/modal/Modal"; 

import React, { useEffect, useState } from "react"; 

import { Select } from 'antd'; 

import MatzapasBodyService from "../../../api/services/matzapas-body-service"; 

 

const { Option } = Select; 

 

export const MatzapasBodiesDialog = ({ 
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
   currentRecord 
    ? await MatzapasBodyService.updateRecord({ 
     id: currentRecord.id, 
     ...matzapasBody, 
    }) 
    : await MatzapasBodyService.createRecord({...matzapasBody, matzapasHeaderID}) 
  onOk(record); 
 } 

 
 return ( 
  <Modal 
   open={visible} 
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
      value={matzapasBody?.norma || ''} 
      onChange={e => setMatzapasBody({ ...matzapasBody, norma: +e.target.value })} 
      placeholder="Укажите норму" 
     /> 

 
    </Space>
    <Space> 

 
     <Input  
      value={matzapasBody?.count || ''} 
      onChange={e => setMatzapasBody({ ...matzapasBody, count: +e.target.value })} 
      placeholder="Укажите количество" 
     /> 
 
    </Space>
    <Space> 

 
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
      onChange={e => setMatzapasBody({ ...matzapasBody, debet: e.target.value })} 
      placeholder="Укажите дебет" 
     /> 
 
    </Space>    

    <Space> 

 
     <Input  
      value={matzapasBody?.credit || ''} 
      onChange={e => setMatzapasBody({ ...matzapasBody, credit: e.target.value })} 
      placeholder="Укажите кредит/э" 
     /> 
 
    </Space>

    

 
   </Space> 

 
  </Modal> 
 ) 

} 