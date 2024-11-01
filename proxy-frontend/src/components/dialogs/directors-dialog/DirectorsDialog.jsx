import { Input, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import DirectorService from "../../../api/services/director-service";

export const DirectorsDialog = ({
    visible,
    onOk,
    onCancel,
    currentRecord,
    ...props
}) => {
    const [director, setDirector] = useState(null);

    useEffect(() => {
        if (currentRecord) {
            setDirector(currentRecord);
        } else {
            setDirector(null);
        }
    }, [currentRecord])

    const onOkHandler = async () => {
        const record =
            currentRecord
                ? await DirectorService.updateRecord({
                    id: currentRecord.id,
                    ...director,
                })
                : await DirectorService.createRecord(director)
        onOk(record);
    }

    return (
        <Modal
            visible={visible}
            title={currentRecord ? 'Редактировать' : 'Создать'}
            onOk={onOkHandler}
            onCancel={onCancel}
        >

            <Space direction="vertical">

                <Space>
                    <Input
                        value={director?.lastName || ''}
                        onChange={e => setDirector({ ...director, lastName: e.target.value })}
                        placeholder="Укажите фамилию"
                    />

                    <Input
                        value={director?.firstName || ''}
                        onChange={e => setDirector({ ...director, firstName: e.target.value })}
                        placeholder="Укажите имя"
                    />

                    <Input
                        value={director?.patronymic || ''}
                        onChange={e => setDirector({ ...director, patronymic: e.target.value })}
                        placeholder="Укажите отчество"
                    />
                </Space>

                <Input
                    value={director?.department || ''}
                    onChange={e => setDirector({ ...director, department: e.target.value })}
                    placeholder="Укажите департамент"
                />

            </Space>
        </Modal>
    )
}