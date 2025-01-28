import { DatePicker, Button, Space, Table, Select, Input } from "antd"; 
import React, { useEffect, useRef, useState } from "react"; 
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'; 
import { useParams } from "react-router"; 
import { useNavigate } from "react-router-dom"; 
import MatzapasBodyService from "../../../api/services/matzapas-body-service"; 
import MatzapasHeadersService from "../../../api/services/matzapas-header-service"; 
import CompanyService from "../../../api/services/company-service"; 
import DirectorService from "../../../api/services/director-service"; 
import MaterialService from "../../../api/services/material-service"; 
import { MatzapasBodiesCreateDialog } from "../../../components/dialogs/matzapas-bodies-dialog/MatzapasBodiesCreateDialog"; 
import dayjs from 'dayjs';

 

const { Option } = Select; 

 

export const MatzapasCreateView = ({ 
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
    title: 'Наименование материала', 
    key: 'title', 
    render: (text, record) => materials.find(it => it.id === record.materialID)?.title, 
   }, 
   { 
    title: 'Единица измерения', 
    dataIndex: 'unit', 
   },
   { 
    title: 'Норма расхода', 
    dataIndex: 'norma', 
   }, 
   { 
    title: 'Количество расхода', 
    dataIndex: 'count', 
   },
   { 
    title: 'Цена, руб.', 
    dataIndex: 'price', 
   }, 
   { 
    title: 'Сумма, руб.', 
    dataIndex: 'sum', 
   },
   { 
    title: 'Направление расходования', 
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

 
 const navigate = useNavigate(); 
 const { id } = useParams(); 
 const [matzapasHeader, setMatzapasHeader] = useState({date: dayjs(new Date()), signatureDate: dayjs(new Date()), orderDate: dayjs(new Date())}) 
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

 
    setList(list); 

 
    setDirectors(directors); 
    setCompanies(companies); 
    setMaterials(materials); 

 
    return () => { 
      setList([]); 

 
      setDirectors([]); 
      setCompanies([]); 
      setMaterials([]); 
    }; 
   } 
   fetchData(); 
 }, [id]); 

 
 const createRecordHandler = () => { 
   setCurrentRecord(null); 
   setVisible(true); 
 } 
 const updateRecordHandler = (record) => { 
   setCurrentRecord(record); 
   setVisible(true); 
 } 
 const deleteRecordHandler = async (recordId) => { 
   setList(list.filter(it => it.id !== recordId)); 
 }
 const handleMaterialCreate = (newMaterial) => {
  setMaterials((prevMaterials) => [...prevMaterials, newMaterial]);
 } 

 
 const saveHeader = async () => { 
   await MatzapasHeadersService.createRecord(matzapasHeader); 
 } 

 
 const saveBody = async (id) => { 
   list.forEach( async (record) => { 
    record['matzapasHeaderID'] = id; 
    delete record.id; 
    await MatzapasBodyService.createRecord(record); 
   }); 
 } 

 
 const saveRecordHandler = async () => { 
   await saveHeader(); 
   const allRecords = await MatzapasHeadersService.getAllRecords(); 
   const id = allRecords.at(-1)['id']; 
   saveBody(id); 
   navigate('/'); 
 } 

 
 return ( 
  <div style={{ padding: 16 }}> 
   <div ref={componentRef}> 


     <Space 
      direction={'vertical'} 
      align={'center'} 
      style={{ width: '100%', marginBottom: 24 }} 
     > 
      <h2> 
        <label>Акт № 
         <Input  
           onChange={e => setMatzapasHeader({ ...matzapasHeader, number: +e.target.value})} 
           placeholder="№" 
           style={{ width: "65px", fontWeight: "bold", fontSize: "14pt", marginLeft: 10 }} 
         /> 
        </label> 
      </h2> 
      
     <Space 
     >Дата акта:
      <DatePicker 
        format="DD.MM.YYYY" 
        value={dayjs(matzapasHeader?.date, 'YYYY-MM-DD') || new Date()} 
        onChange={date1 => setMatzapasHeader({ ...matzapasHeader, date: date1 })} 
        style={{ width: 232}} 
        allowClear={false} 
      /> 
      </Space>  


      <Space>Дата подписи руководителя:
      <DatePicker 
        format="DD.MM.YYYY" 
        value={dayjs(matzapasHeader?.signatureDate, 'YYYY-MM-DD') || new Date()} 
        onChange={date => setMatzapasHeader({ ...matzapasHeader, signatureDate: date })} 
        style={{ width: 232 }} 
        allowClear={false} 
      /> 
      </Space>
      
      <Space>Учреждение:
        <Select 
         value={matzapasHeader?.copmanyID || null} 
         onChange={value => setMatzapasHeader({ ...matzapasHeader, copmanyID: value })} 
         placeholder={"Выберите компанию"} 
         style={{ width: 425 }} 
        > 
        {companies.map(it => <Option 
         value={it.id}> 
         {it.name} 
        </Option>)} 
        </Select> 
      </Space> 


      <Space>Директор:
        <Select 
         value={matzapasHeader?.directorID || null} 
         onChange={value => setMatzapasHeader({ ...matzapasHeader, directorID: value })} 
         placeholder={"Выберите директора"} 
         style={{ width: 425 }} 
         > 
         {directors.map(it => <Option 
           value={it.id}> 
           {it.lastName} {it.firstName} {it.patronymic} 
         </Option>)} 
        </Select> 
        </Space> 
     
     
      <Space>Комиссия в составе:
         <Input  
           onChange={e => setMatzapasHeader({ ...matzapasHeader, commission: e.target.value})} 
           placeholder="Выберите комиссию" 
           style={{width: 425}} 
         /> 
        </Space>
        
        <Space>Номер назначени (распоряжения) комиссии: 
         <Input  
           onChange={e => setMatzapasHeader({ ...matzapasHeader, orderNumber: e.target.value})} 
           placeholder="№"
           style={{ width: "65px", marginLeft: 10 }} 
         /> 
        </Space>

        <Space>Дата приказа
      <DatePicker 
        format="DD.MM.YYYY" 
        value={dayjs(matzapasHeader?.orderDate, 'YYYY-MM-DD') || new Date()} 
        onChange={date => setMatzapasHeader({ ...matzapasHeader, orderDate: date })} 
        style={{ width: 232 }} 
        allowClear={false} 
      /> 
      </Space>

      <Space>Ответственное лицо: 
         <Input  
           onChange={e => setMatzapasHeader({ ...matzapasHeader, responseP: e.target.value})} 
           placeholder="Введите значение"
           style={{ marginLeft: 10 }} 
         /> 
        </Space>
        <Space>Структурное подразделение: 
         <Input  
           onChange={e => setMatzapasHeader({ ...matzapasHeader, structuralUnit: e.target.value})} 
           placeholder="Введите значение"
           style={{ marginLeft: 10 }} 
         /> 
        </Space>
        <Space>Состав комиссии
         <Input  
           onChange={e => setMatzapasHeader({ ...matzapasHeader, commissionM: e.target.value})} 
           placeholder="Введите значение"
           style={{ marginLeft: 10 }} 
         /> 
        </Space>
      </Space> 


     <Table dataSource={list} columns={columns} /> 
   </div> 


   <Space 
     style={{ width: '100%', display: "flex", justifyContent: "space-between" }} 
   > 
     <Button onClick={createRecordHandler}> 
      Добавить 
     </Button> 
      
     <Space style={{ display: 'flex', gap: 10 }}> 
      <Button onClick={event => navigate('/')} > 
        Отменить 
      </Button> 


      <Button 
        onClick={saveRecordHandler} > 
        Сохранить 
      </Button> 
     </Space> 


   </Space> 


   <MatzapasBodiesCreateDialog 
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
     matzapasHeaderId={id}
     onMaterialCreate={handleMaterialCreate} 
   /> 
  </div> 
) 

} 