import { WithDefaultLayout } from "@/components/DefautLayout";
import { Page } from "@/types/Page";
import { Button, Col, Input, Row, Card } from "antd";
import React, { useState } from "react";

const QueueList: Page = () => {
    const [customers, setCustomers] = useState<string[][]>([[], [], []]); // initiate array of customers
    const [customerName, setCustomerName] = useState<string>(''); // state for input customer
    const [errorMessage, setErrorMessage] = useState<string | null>(); // state for showing error

    const handleSubmit = (e) => {
        e.preventDefault();
        addCustomer();
        setCustomerName('');
    }

    const addCustomer = () => {
        if(customerName == '') {
            return;
        }
        // uniqueness validation
        const isNameExist = customers.some(item => item.includes(customerName));
        if(isNameExist) {
            setErrorMessage('Duplicate name is not allowed');
            return;
        }

        const cashierIndex = Math.floor(Math.random() * 3);
        setCustomers((prevCustomer) => {
            const updatedCustomer = [...prevCustomer];
            updatedCustomer[cashierIndex]?.push(customerName);
            return updatedCustomer;
        })
    }

    const handleCashier = (cashierIndex: number) => {
        setCustomers((prevCustomer) => {
            const updatedCustomer = [...prevCustomer];
            updatedCustomer[cashierIndex]?.shift();
            return updatedCustomer;
        })
    }
    
    return (
        <Row gutter={24} justify={'space-between'} style={{ display: 'flex', height: '85vh' }}>
            {/* Cashier */}
            <Col span={24}>
                <Row>
                    <Col span={8}>
                        <div className="flex flex-col justify-center">
                            <div className="p-2 px-4 bg-black w-64 h-14 rounded-xl text-white text-center self-center">
                                <h1>Cashier 1</h1>
                            </div>
                            <div className="flex flex-col gap-4 mt-5 mx-auto">
                                {customers[0] && customers[0].slice(0, 3).map((item, index) => (
                                    <Card key={index} className="w-14 h-14 ring rounded-full flex justify-center items-center">
                                        {item}
                                    </Card>
                                ))}
                                {customers[0] && customers[0].length > 3 && <Card className="w-14 h-14 ring rounded-full flex justify-center items-center">{customers[0].length - 3} more....</Card>}

                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="flex flex-col justify-center">
                            <div className="p-2 px-4 bg-black w-64 h-14 rounded-xl text-white text-center self-center">
                                <h1>Cashier 2</h1>
                            </div>
                            <div className="flex flex-col gap-4 mt-5 mx-auto">
                                {customers[1] && customers[1].slice(0, 3).map((item, index) => (
                                    <Card key={index} className="w-14 h-14 ring rounded-full flex justify-center items-center">
                                        {item}
                                    </Card>
                                ))}
                                <div>
                                    {customers[1] && customers[1].length > 3 && <Card className="w-14 h-14 ring rounded-full flex justify-center items-center">{customers[1].length - 3} more....</Card>}
                                </div>

                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="flex flex-col justify-center">
                            <div className="p-2 px-4 bg-black w-64 h-14 rounded-xl text-white text-center self-center">
                                <h1>Cashier 3</h1>
                            </div>
                            <div className="flex flex-col gap-4 mt-5 mx-auto">
                                {customers[2] && customers[2].slice(0, 3).map((item, index) => (
                                    <Card key={index} className="w-14 h-14 ring rounded-full flex justify-center items-center">
                                        {item}
                                    </Card>
                                ))}
                                {customers[2] && customers[2].length > 3 && <Card className="w-14 h-14 ring rounded-full flex justify-center items-center">{customers[2].length - 3} more....</Card>}

                            </div>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col span={24} className=" left-auto w-full py-4 px-6 text-left self-end">
                <Row className="border border-slate-400 p-4 rounded-xl">
                    <Col span={12}>
                        <form onSubmit={handleSubmit}>
                            <Input
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                type="text"
                                className="w-2/3"
                                placeholder="Input Customer name" /> <br />
                            {errorMessage && <p className="text-red-600">{errorMessage}</p>} <br />
                            <Button htmlType="submit" className="bg-blue-500 text-white font-bold" >Enter Line</Button>
                        </form>
                    </Col>
                    <Col span={12} className="flex flex-col gap-2" >
                        <Button className="w-full bg-red-400 text-white font-bold" onClick={() => handleCashier(0)}>Handle Cashier #1</Button>
                        <Button className="w-full bg-red-400 text-white font-bold" onClick={() => handleCashier(1)}>Handle Cashier #2</Button>
                        <Button className="w-full bg-red-400 text-white font-bold" onClick={() => handleCashier(2)}>Handle Cashier #3</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}




QueueList.layout = WithDefaultLayout;
export default QueueList;