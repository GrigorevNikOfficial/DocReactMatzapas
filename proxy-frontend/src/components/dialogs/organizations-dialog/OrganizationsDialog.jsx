import { Input, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import CompanyService from "../../../api/services/organization-service";

export const OrganizationsDialog = ({
    visible,
    onOk,
    onCancel,
    currentRecord,
    ...props
}) => {
    const [organization, setOrganization] = useState(null);

    useEffect(() => {
        if (currentRecord) {
            setOrganization(currentRecord);
        } else {
            setOrganization(null);
        }
    }, [currentRecord])

    const onOkHandler = async () => {
        const record =
            currentRecord
                ? await CompanyService.updateRecord({
                    id: currentRecord.id,
                    ...organization,
                })
                : await CompanyService.createRecord(organization)
        onOk(record);
    }

    return (
        <Modal
            visible={visible}
            title={currentRecord ? 'Редактировать' : 'Создать'}
            onOk={onOkHandler}
            onCancel={onCancel}
        >

            <Space direction="vertical" style={{ width: '100%' }}>
                <Input
                    value={organization?.title || ''}
                    onChange={e => setOrganization({ ...organization, title: e.target.value })}
                    placeholder="Укажите наименование"
                />

                <Input
                    value={organization?.inn || ''}
                    onChange={e => setOrganization({ ...organization, inn: e.target.value })}
                    placeholder="Укажите ИНН"
                />
            </Space>

        </Modal>
    )
}