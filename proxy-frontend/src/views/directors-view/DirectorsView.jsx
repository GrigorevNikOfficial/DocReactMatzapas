import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { MaterialsDialog } from "../../components/dialogs/materials-dialog/MaterialsDialog";
import DirectorService from "../../api/services/director-service";
import { DirectorsDialog } from "../../components/dialogs/directors-dialog/DirectorsDialog";

export const DirectorsView = ({
    ...props
}) => {
    const columns = [
        {
            title: 'Код',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Фамилия',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Имя',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Отчество',
            dataIndex: 'patronymic',
            key: 'patronymic',
        },
        {
            title: 'Департамент',
            dataIndex: 'department',
            key: 'department',
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

    const [list, setList] = useState([]);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
          const list = await DirectorService.getAllRecords();
          setList(list);
      };
  
      fetchData();},[])

    const createRecordHandler = () => {
        setCurrentRecord(null)
        setVisible(true);
    }

    const updateRecordHandler = (record) => {
        setCurrentRecord(record)
        setVisible(true)
    }

    const deleteRecordHandler = async (recordId) => {
        await DirectorService.removeRecord(recordId);
        setList(list.filter(it => it.id !== recordId));
    }

    return (
        <div style={{ padding: 16 }}>
            <Table dataSource={list} columns={columns} />
            <Button onClick={createRecordHandler}>
                Создать
            </Button>
            <DirectorsDialog
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
            />
        </div>
    )
} 