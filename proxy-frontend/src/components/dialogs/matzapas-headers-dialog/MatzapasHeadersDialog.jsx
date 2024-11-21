import { DatePicker, Input, Space, Select } from "antd"; 

import Modal from "antd/lib/modal/Modal"; 

import React, { useEffect, useState } from "react"; 

import MatzapasHeadersService from "../../../api/services/matzapas-header-service"; 

import dayjs from 'dayjs';

 

const { Option } = Select; 

 

export const MatzapasHeadersDialog = ({ 
 visible, 
 onOk, 
 onCancel, 
 currentRecord, 
 directors, 
 companies, 
 ...props 

}) => { 
 const [matzapasHeader, setMatzapasHeader] = useState(null); 

 
 useEffect(() => { 
  if (currentRecord) { 
   setMatzapasHeader(currentRecord); 
  } else { 
   setMatzapasHeader(null); 
  } 
 }, [currentRecord]) 


 const onOkHandler = async () => { 
  const record = 
   currentRecord 
    ? await MatzapasHeadersService.updateRecord({ 
     id: currentRecord.id, 
     ...matzapasHeader, 
    }) 
    : await MatzapasHeadersService.createRecord(matzapasHeader) 
  onOk(record); 
 } 

 return ( 
  <Modal 
   visible={visible} 
   title={currentRecord ? 'Редактировать' : 'Создать'} 
   onOk={onOkHandler} 
   onCancel={onCancel} DD
  > 

 
   <Space direction="vertical" style={{ width: '100%' }}> 

 
    <Space style={{width: '100%'}}>

    <Input 
     value={matzapasHeader?.number || ''} 
     onChange={e => setMatzapasHeader({ ...matzapasHeader, number: e.target.value })} 
     placeholder="Укажите Номер Документа" 
    />  

 
    <DatePicker  
      value={dayjs(matzapasHeader?.date , 'YYYY-MM-DD').isValid() ? dayjs(matzapasHeader.date , 'YYYY-MM-DD') : null} 
      onChange={date => setMatzapasHeader({ ...matzapasHeader, date: date })} 
      placeholder={"Укажите дату"} 
      style={{ width: 232 }} 
      format="DD.MM.YYYY" 
      allowClear={false} 
     /> 

 
     <DatePicker 
     value={dayjs(matzapasHeader?.signatureDate , 'YYYY-MM-DD').isValid() ? dayjs(matzapasHeader.signatureDate , 'YYYY-MM-DD') : null} 
      onChange={date => setMatzapasHeader({ ...matzapasHeader, signatureDate: date })} 
      placeholder={"Укажите дату подписи"} 
      style={{ width: 232 }} 
      format="DD.MM.YYYY"
      allowClear={false} 
     /> 

 
    </Space>

    <Space>
    
    
    <Input 
     value={matzapasHeader?.commission || ''} 
     onChange={e => setMatzapasHeader({ ...matzapasHeader, commission: e.target.value })} 
     placeholder="Укажите Комиссию" 
    /> 

    <Input 
     value={matzapasHeader?.orderNumber || ''} 
     onChange={e => setMatzapasHeader({ ...matzapasHeader, orderNumber: e.target.value })} 
     placeholder="Укажите Номер приказа" 
    /> 

    <DatePicker 
     value={dayjs(matzapasHeader?.orderDate , 'YYYY-MM-DD').isValid() ? dayjs(matzapasHeader.orderDate , 'YYYY-MM-DD') : null} 
      onChange={date => setMatzapasHeader({ ...matzapasHeader, orderDate: date })} 
      placeholder={"Укажите дату приказа"} 
      style={{ width: 232 }} 
      format="DD.MM.YYYY"
      allowClear={false} 
     />     

    </Space>

 
    <Space style={{width: '100%'}}> 
     <Select 
      value={matzapasHeader?.directorID || null} 
      onChange={value => setMatzapasHeader({ ...matzapasHeader, directorID: value })} 
      placeholder={"Выберите физ. лицо"} 
      style={{ width: 232 }} 
     > 
      {directors.map(it => <Option 
       value={it.id}> 
       {it.lastName} 
      </Option>)} 
     </Select> 

 
     <Select 
      value={matzapasHeader?.copmanyID || null} 
      onChange={value => setMatzapasHeader({ ...matzapasHeader, copmanyID: value })} 
      placeholder={"Выберите организацию"} 
      style={{ width: 232 }} 
     > 
      {companies.map(it => <Option 
       value={it.id}> 
       {it.name} 
      </Option>)} 
    </Select> 

 
    </Space> 

 
   </Space> 
  </Modal> 
 ) 

 

}  