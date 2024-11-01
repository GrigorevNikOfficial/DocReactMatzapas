import { DatePicker, Button, Space, Table, Select, Input } from "antd"; 
import React, { useEffect, useRef, useState } from "react"; 
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'; 
import { useParams } from "react-router"; 
import MatzapasBodyService from "../../../api/services/matzapas-body-service"; 
import MatzapasHeadersService from "../../../api/services/matzapas-header-service"; 
import CompanyService from "../../../api/services/company-service"; 
import DirectorService from "../../../api/services/director-service"; 
import MaterialService from "../../../api/services/material-service"; 
import { MatzapasBodiesDialog } from "../../../components/dialogs/matzapas-bodies-dialog/MatzapasBodiesDialog"; 
import { useReactToPrint } from "react-to-print"; 
import dayjs from 'dayjs';

 

const { Option } = Select; 

 

export const MatzapasView = ({ 
 onOk, 
 onClick, 
 ...props 

}) => { 
 const columns = [ 
  { 
    title: 'Код', 
    dataIndex: 'id', 
    key: 'id', 
   }, 
   { 
    title: 'Наименование', 
    key: 'title', 
    render: (text, record) => materials.find(it => it.id === record.materialID)?.title, 
   }, 
   { 
    title: 'ед. изм.', 
    dataIndex: 'unit', 
   },
   { 
    title: 'Норма', 
    dataIndex: 'norma', 
   }, 
   { 
    title: 'Количество', 
    dataIndex: 'count', 
   },
   { 
    title: 'Цена', 
    dataIndex: 'price', 
   }, 
   { 
    title: 'Сумма', 
    dataIndex: 'sum', 
   },
   { 
    title: 'Причина', 
    dataIndex: 'issue', 
   },
   { 
    title: 'Дебед', 
    dataIndex: 'debet', 
   },
   { 
    title: 'Кредит', 
    dataIndex: 'credit', 
   },
   { 
    title: 'Действия', 
    key: 'actions', 
    render: (text, record) => { 
      return ( 
       <Space size="middle"> 
         <div onClick={() => updateRecordHandler(record)}> 
          <EditOutlined /> 
         </div> 
         <div onClick={() => deleteRecordHandler(record.id)}> 
          <DeleteOutlined /> 
         </div> 
       </Space> 
      ) 
    } 
   }
 ]; 

 
 const componentRef = useRef(); 
 const handlePrint = useReactToPrint({ 
  content: () => componentRef.current, 
 }); 
 const { id } = useParams(); 
 const [matzapas, setMatzapas] = useState(null); 
 const [list, setList] = useState([]); 
 const [directors, setDirectors] = useState([]); 
 const [companies, setCompanies] = useState([]); 
 const [materials, setMaterials] = useState([]); 
 const [currentRecord, setCurrentRecord] = useState(null); 
 const [visible, setVisible] = useState(false); 

 
 useEffect( () => { 
  async function fetchData() { 

   const list = await MatzapasBodyService.getAllHeadersRecords(id); 
   const directors = await DirectorService.getAllRecords(); 
   const companies = await CompanyService.getAllRecords(); 
   const materials = await MaterialService.getAllRecords(); 
   const matzapas = await MatzapasHeadersService.getOneRecord(id);
   console.log(matzapas)
 
   setList(list); 
   setMatzapas(matzapas); 

 
   setDirectors(directors); 
   setCompanies(companies); 
   setMaterials(materials); 

 
   return () => { 
    setList([]); 
    setMatzapas(null); 

 
    setDirectors([]); 
    setCompanies([]); 
    setMaterials([]); 
  }; 
  } 
  fetchData(); 
 }, [id]); 



 const createRecordHandler = () => { 
  setCurrentRecord(null) 
  setVisible(true); 
 } 
 const updateRecordHandler = (record) => { 
  setCurrentRecord(record) 
  setVisible(true) 
 } 
 const deleteRecordHandler = async (recordId) => { 
  await MatzapasBodyService.removeRecord(recordId); 
  setList(list.filter(it => it.id !== recordId)); 
 } 

 
 return ( 
  <div style={{ padding: 16 }}> 
   <div ref={componentRef}> 

 
    <Space 
     direction={'vertical'} 
     align={'center'} 
     style={{ width: '100%', marginBottom: 24 }} 
    > 
     <h2>Акт № <strong>{matzapas?.id}</strong></h2> 
     
     <Space>Дата 
     <DatePicker 
      format="DD.MM.YYYY" 
      value={dayjs(matzapas?.date, 'YYYY-MM-DD') || null} 
      onChange={date => {
        const updatedDate = date.startOf('day').format('YYYY-MM-DD'); 
        const updatedMatzapas = { ...matzapas, date: updatedDate }; 
        setMatzapas(updatedMatzapas);
        MatzapasHeadersService.updateRecord(updatedMatzapas); 
      }} 
      style={{ width: 232 }} 
      allowClear={false} 
     /> 
</Space>  

<Space>Дата подписи  
     <DatePicker 
      format="DD.MM.YYYY" 
      value={dayjs(matzapas?.signatureDate, 'YYYY-MM-DD') || null} 
      onChange={date => {
        const updatedSignatureDate = date.startOf('day').format('YYYY-MM-DD');
        const updatedMatzapas = { ...matzapas, signatureDate: updatedSignatureDate };
        setMatzapas(updatedMatzapas);
        MatzapasHeadersService.updateRecord(updatedMatzapas);
      }} 
      style={{ width: 232 }} 
      allowClear={false} 
     /> 
</Space>

 
     <Space>Компания: <strong> 
      <Select 
       value={matzapas?.copmanyID || null} 
       onChange={value => setMatzapas({ ...matzapas, copmanyID: value },MatzapasHeadersService.updateRecord({ 
        ...matzapas, copmanyID: value 
       })) 
       } 
       placeholder={"Выберите компанию"} 
       style={{ width: 425 }} 
      > 
      {companies.map(it => <Option 
       value={it.id}> 
       {it.name} 
      </Option>)} 
      </Select> 
     </strong></Space> 

 
     <Space>Директор: <strong> 
     <Select 
       value={matzapas?.directorID || null} 
       onChange={value => setMatzapas({ ...matzapas, directorID: value },MatzapasHeadersService.updateRecord({ 
        ...matzapas, directorID: value 
       })) 
       } 
       placeholder={"Выберите получателя"} 
       style={{ width: 425 }} 
       > 
       {directors.map(it => <Option 
        value={it.id}> 
        {it.lastName} {it.firstName} {it.patronymic} 
       </Option>)} 
      </Select> 
      </strong></Space>

      <Space>Комиссия: 
    <Input 
        value={matzapas?.commission || ''} 
        onChange={e => {
            const updatedMatzapas = { ...matzapas, commission: e.target.value };
            setMatzapas(updatedMatzapas);
            MatzapasHeadersService.updateRecord(updatedMatzapas);
        }} 
        placeholder="Введите значение" 
        style={{ width: 425 }} 
    />
      </Space>

      <Space>Номер приказа: 
    <Input 
        value={matzapas?.orderNumber || ''} 
        onChange={e => {
            const updatedMatzapas = { ...matzapas, orderNumber: e.target.value };
            setMatzapas(updatedMatzapas);
            MatzapasHeadersService.updateRecord(updatedMatzapas);
        }} 
        placeholder="Введите значение" 
        style={{ width: 425 }} 
    />
      </Space>

      <Space>Дата подписи  
     <DatePicker 
      format="DD.MM.YYYY" 
      value={dayjs(matzapas?.orderDate, 'YYYY-MM-DD') || null} 
      onChange={date => {
        const updatedOrderDate = date.startOf('day').format('YYYY-MM-DD'); 
        const updatedMatzapas = { ...matzapas, orderDate: updatedOrderDate };
        setMatzapas(updatedMatzapas); 
        MatzapasHeadersService.updateRecord(updatedMatzapas); 
      }} 
      style={{ width: 232 }} 
      allowClear={false} 
     /> 
</Space>

    </Space> 

    

 
    <Table dataSource={list} columns={columns} /> 
   </div> 

 
   <Space> 
    <Button onClick={createRecordHandler}> 
     Создать 
    </Button> 
    <Button type="dashed" onClick={handlePrint}> 
     Печать 
    </Button> 
   </Space> 

 
   <MatzapasBodiesDialog 
    visible={visible} 
    onOk={(record) => { 
     currentRecord 
      ? setList(list.map(it => it.id === currentRecord.id 
       ? { ...record } 
       : it)) 
      : setList([...list, record]); 

 
     setCurrentRecord(null); 
     setVisible(false); 
    }} 
    onCancel={() => setVisible(false)} 
    currentRecord={currentRecord} 
    materials={materials} 
    matzapasHeaderID={id} 
   /> 
  </div> 
 ) 

}  