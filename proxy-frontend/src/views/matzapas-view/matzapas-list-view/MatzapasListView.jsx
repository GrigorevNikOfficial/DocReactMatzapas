import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import CompanyService from "../../../api/services/company-service";
import MatzapasHeadersService from "../../../api/services/matzapas-header-service";
import DirectorService from "../../../api/services/director-service";
import { MatzapasHeadersDialog } from "../../../components/dialogs/matzapas-headers-dialog/MatzapasHeadersDialog";
import dayjs from 'dayjs';


export const MatzapasListView = ({
    ...props
}) => {
    const columns = [
        {
            title: 'Код',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Дата',
            dataIndex: 'date',
            render:(text)=>dayjs(text).format('DD.MM.YYYY')
        },
        {
            title: 'Директор',
            dataIndex: 'directorID',
            render: (text, record) => directors.find(it => it.id === record.directorID)?.lastName,
        },
        {
            title: 'Дата подписи',
            dataIndex: 'signatureDate',
            render:(text)=>dayjs(text).format('DD.MM.YYYY')
        },
        {
            title: 'Организация',
            dataIndex: 'copmanyID',
            render: (text, record) => companies.find(it => it.id === record.copmanyID)?.name,
        },
        {
            title: 'Комиссия',
            dataIndex: 'commission',
            key: 'commission',
        },
        {
            title: 'Дата приказа',
            dataIndex: 'orderDate',
            render:(text)=>dayjs(text).format('DD.MM.YYYY')
        },
        {
            title: 'Номер приказа',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
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

    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [visible, setVisible] = useState(false);

    const [directors, setDirectors] = useState([]);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const directors = await DirectorService.getAllRecords();
          const companies = await CompanyService.getAllRecords();
          const list = await MatzapasHeadersService.getAllRecords();   //CAS   
          setDirectors(directors);
          setCompanies(companies);
          setList(list);
        } catch (res) {
          alert("Произошла ошибка:", res);
        }
      };
    
      fetchData();
    }, []);
    console.log(list);

    const createRecordHandler = () => {
        setCurrentRecord(null)
        setVisible(true);
    }

    const updateRecordHandler = (record) => {
        setCurrentRecord(record)
        setVisible(true)
    }

    const deleteRecordHandler = async (recordId) => {
        await MatzapasHeadersService.removeRecord(recordId);
        setList(list.filter(it => it.id !== recordId));
    }

    return (
        <div style={{ padding: 16 }}>
    <Table
        dataSource={list}
        columns={columns}
        onRow={(record, rowIndex) => ({
            onDoubleClick: event => {
                navigate(`/matzapas/${record.id}`);
            },
        })}
    />
            <Button onClick={createRecordHandler}>
                Создать
            </Button>
            <MatzapasHeadersDialog
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
                directors={directors}
                companies={companies}
                
            />
        </div>
    )
}