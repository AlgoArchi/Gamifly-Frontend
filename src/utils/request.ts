const request = (...data: any) => fetch(data[0], data[1]).then((res) => res.json())
export default request
