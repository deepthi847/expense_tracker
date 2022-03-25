export const getDataFromLocalStorage = () => {
    var data = {
        total_income:0,
        total_expense:0,
        particulars:[]
    }
    if(localStorage.getItem("data") !== null){
        data = JSON.parse(localStorage.getItem("data"))
    }else{
        localStorage.setItem("data", JSON.stringify(data))
    }
    return data;
}

export const updateDataToStorage = (record) => {
    var data = JSON.parse(localStorage.getItem("data"))
    if(record.type == "expense") {
        data.total_expense = parseInt(data.total_expense) + parseInt(record.amount)
        data.particulars.push(record)
    }else{
        data.total_income = parseInt(data.total_income) + parseInt(record.amount)
        data.particulars.push(record)
    }
    data.balance += parseInt(data.total_income) - parseInt(data.total_expense)
    localStorage.setItem("data",JSON.stringify(data))
    alert(`${record.type} added successfully !!`)
}
// export const getDataFromLocalStorage = () => {
//     console.log( localStorage.getItem("data") !== null)
// }