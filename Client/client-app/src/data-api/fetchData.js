
class Api {
    constructor(url, data = null){
        this.url = url
        this.data = data
    }

    async postData() {
        if (this.data != null) {

            const response = await fetch (this.url, {
                method  : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(this.data)
            })
            
            if (response.status === 200) {
                return response.json()
            } else {
                return response
            }

        } else {
            const apidata = await fetch (this.url, {
                method  : 'POST',
            })

            if (apidata.status === 200) {
                return apidata.json()
            } else {
                return apidata
            }
        }
    }
}

// class Api {
//     constructor(url, data){
//         this.data = data
//         this.url = url
//     }

//     async postData(){
//         const apidata = await fetch (this.url, {
//             method  : 'POST',
//             body : JSON.stringify(this.data)
//         })
//         return apidata.json()
//     }
// }

export default Api