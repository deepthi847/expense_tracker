import { getDefaultNormalizer } from '@testing-library/react'
import React, { useEffect, useState } from 'react'
import { getDataFromLocalStorage, updateDataToStorage } from './helper'

const Home = () => {
    const [data, setData] = useState({})
    const [particulars, setParticulars] = useState([])
    const [record, setRecord] = useState({
        date: "",
        type: "",
        category: "",
        description: "",
        mode: "",
        amount: 0
    })

    const updateData = async (e) => {
        e.preventDefault()
        await updateDataToStorage(record)
        setRecord({
            ...record,
            date: "",
            type: "",
            category: "",
            description: "",
            mode: "",
            amount: 0
        })
    }

    useEffect(() => {
        // getDataFromLocalStorage()
        var prev_data = getDataFromLocalStorage()
        setData(prev_data)
        setParticulars(prev_data.particulars)
    }, [record])

    const DisplayeCategories = () => {
        if (record.type === "")
            return (
                <h4 className="text-danger">Please select type..!</h4>
            )
        else if (record.type === "income")
            return (
                <select className="form-control" onChange={(e) => setRecord({ ...record, category: e.target.value })}>
                    <option>--select--</option>
                    <option value="salary">Salary</option>
                    <option value="roi">Return on Investment</option>
                </select>
            )
        else
            return (
                <select className="form-control" onChange={(e) => setRecord({ ...record, category: e.target.value })}>
                    <option>--select--</option>
                    <option value="grocery">grocery</option>
                    <option value="food">food</option>
                    <option value="accomodation">accomodation</option>
                    <option value="shopping">shopping</option>
                    <option value="travel">travel</option>
                </select>
            )
    }


    // const getParticulars = () => {
    //     if(data.particulars.length > 0)
    //         return
    //     else
    //         return <h6 className="text-warning" >No data found</h6>
    // }

    return (
        <div className="container">
            <h2>EXPENSE TRACKER</h2>
            <div className="row mt-5">
                <div className="col-md-6 mt-5">

                    <div className="row">
                        <div className="col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h4>Total Income</h4>
                                    <p>{data.total_income}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h4>Total Expense</h4>
                                    <p>{data.total_expense}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h4>Balance</h4>
                                    <p>{data.total_income - data.total_expense}</p>
                                    {/* <p>{data.balance}</p> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Particulars</th>
                                <th scope="col">Date</th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {particulars.map((row, index) => {
                                return (
                                    <tr style={row.type === "income" ? { color: "#1FAA59" } : { color: "#DE4839" }}>
                                        <td>{index + 1}</td>
                                        <td>{row.category}<br />{row.description}</td>
                                        <td>{row.date}</td>
                                        <td>{row.amount}</td>
                                    </tr>
                                )
                            })}
                            {/* <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6">
                    <div className="mt-5">
                        <form action="" className="form">
                            <div className="form-group">
                                <label>Date</label>
                                <input value={record.date} type="date" className="form-control" onChange={(e) => setRecord({ ...record, date: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Type</label>
                                <select value={record.type} onChange={(e) => setRecord({ ...record, type: e.target.value })} className="form-control">
                                    <option>--select--</option>
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                {DisplayeCategories()}
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input value={record.description} type="text" className="form-control" onChange={(e) => setRecord({ ...record, description: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Mode</label>
                                <select value={record.mode} className="form-control" onChange={(e) => setRecord({ ...record, mode: e.target.value })}>
                                    <option>--select--</option>
                                    <option value="cash">Cash</option>
                                    <option value="card">bank</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Amount</label>
                                <input value={record.amount} type="number" className="form-control" onChange={(e) => setRecord({ ...record, amount: e.target.value })} />
                            </div>
                            <div className="form-group mt-3">
                                <button className="btn btn-outline-info form-control" onClick={updateData} >Add</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home
