const testData = {
    "data": [
        {
            "MerchantId": 1
        },
        {
            "FirstName": "FirstBob"
        },
        {
            "LastName": "LastBob"
        },
        {
            "PhoneNumber": "9045551728"
        },
        {
            "Email": "firstcheck@lastcheck.test"
        },
        {
            "AppUserId": "cdfb55f7-0fc4-4854-8d3d-4139f40d647a"
        },
        {
            "DateCreated": "2021-04-27T17:30:30.540Z"
        }
    ]
}

// reduce, map, forEach, filter, some, every

const modifyData = (data) => {
	// flatten objects in array
	return data.reduce((previousValue, currentValue) => {
		return {...previousValue, ...currentValue}
	}, {});
}

console.log(modifyData(testData.data))