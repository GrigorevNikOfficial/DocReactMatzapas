import { Input, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import CompanyService from "../../../api/services/company-service";

export const CompaniesDialog = ({
    visible,
    onOk,
    onCancel,
    currentRecord,
    ...props
}) => {
    const [company, setOrganization] = useState(null);

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
                    ...company,
                })
                : await CompanyService.createRecord(company)
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
                    value={company?.name || ''}
                    onChange={e => setOrganization({ ...company, name: e.target.value })}
                    placeholder="Укажите наименование"
                />

                <Input
                    value={company?.inn || ''}
                    onChange={e => setOrganization({ ...company, inn: e.target.value })}
                    placeholder="Укажите ИНН"
                />

                <Input
                    value={company?.kpp || ''}
                    onChange={e => setOrganization({ ...company, kpp: e.target.value })}
                    placeholder="Укажите КПП"
                />

                <Input
                    value={company?.okpo || ''}
                    onChange={e => setOrganization({ ...company, okpo: e.target.value })}
                    placeholder="Укажите ОКПО"
                />
            </Space>

        </Modal>
    )
}