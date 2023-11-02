const url = 'http://37.220.80.108/tasks/';

const changes = {
    info: "Новая инфа",
}

const body = {
    name: "новая задача",
    info: "очень важная информация",
    isImportant: true,
    isComplited: true
}

//ЗАПРОСЫ ЧЕРЕЗ XML
class RequestXML {

    //GET - получает либо все таски, либо одну, в зависимости от наличия айдишника
    static getTasks = (url, id = '') => {
        new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
            xhr.open('GET', `${url}${id}`)
            xhr.onload = () => {
                if (xhr.status >= 400){
                    reject(`Ошибка: ${xhr.status}`)
                } else {
                resolve(JSON.parse(xhr.response))
                }
            }
            xhr.onerror = () => {
                reject(`Ошибка: ${xhr.status}`)
            }

            xhr.send()
        })
                .then(data => console.log(data))
                .catch(err => console.log(err))
    }

    //POST
    static postTask = (url, body) => {

        new Promise( (resolve, reject) => {
        const xhr = new XMLHttpRequest()
            xhr.open('POST', url, body)
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.onload = () => {
                if (xhr.status >= 400){
                    reject(`Ошибка: ${xhr.status}`)
                } else {
                    resolve(JSON.parse(xhr.response))
                }
            }

            xhr.send(JSON.stringify(body))
        })
                    .then(data => console.log(data))
                    .catch(err => console.log(err))
    }

    //PATCH
    static patchTask = (url, id, changes) => {
        new Promise( (resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('PATCH', `${url}${id}`)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.onload = () => {
            if (xhr.status >= 400){
                    reject(`Ошибка: ${xhr.status}`)
                } else {
                    resolve(JSON.parse(xhr.response))
                }
            }
        xhr.send(JSON.stringify(changes))
    })
                    .then(data => console.log(data))
                    .catch(err => console.log(err))
    }

    //DELETE
    static deleteTask = (url, id) => {
        new Promise( (resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('DELETE', `${url}${id}`)
        xhr.onload = () => {
            if (xhr.status >= 400){
                    reject(`Ошибка: ${xhr.status}`)
                } else {
                    resolve(JSON.parse(xhr.response))
                }
            }
            xhr.send()
        })
                    .then(data => console.log(data))
                    .catch(err => console.log(err))        
    }
}


//ЗАПРОСЫ ЧЕРЕЗ Fetch
class RequestFetch {

    //GET
    static getTasks = async (url, id= '') => {
        

        const response = await fetch(`${url}${id}`);
        try {
            const response_1 = await response.json();
            return console.log(response_1);
        } catch (err) {
            return console.log(err);
        }
    } 

    //POST
    static postTask = async (url, body) => {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        try {
            const response_1 = await response.json();
            return console.log(response_1);
        } catch (err) {
            return console.log(err);
        }
    }

    //PATCH
    static patchTask = async (url, id, changes) => {
        const response = await fetch(`${url}${id}`, {
            method: 'PATCH',
            body: JSON.stringify(changes),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        try {
            const response_1 = await response.json();
            return console.log(response_1);
        } catch (err) {
            return console.log(err);
        }
    }

    //DELETE
    static deleteTask = async (url, id) => {
        const response = await fetch(`${url}${id}`, {
            method: 'DELETE',
        });
        try {
            const response_1 = await response.json();
            return console.log(response_1);
        } catch (err) {
            return console.log(err);
        }
    }
}

const arrGet = [RequestFetch.getTasks, RequestXML.getTasks]
const arrPost = [RequestFetch.postTask, RequestXML.postTask]
const arrPatch = [RequestFetch.patchTask,RequestXML.patchTask]
const arrDel = [RequestXML.deleteTask, RequestFetch.deleteTask]

//Контроллер
class Request {

        static get = arrGet[Math.floor (Math.random()*arrGet.length)]
        static post = arrPost[Math.floor (Math.random()*arrPost.length)];
        static patch = arrPatch[Math.floor (Math.random()*arrPatch.length)];
        static del = arrDel[Math.floor (Math.random()*arrDel.length)];
}

    Request.get(url, 674)
    Request.patch(url, 103, changes)
    Request.del(url, 1873)
    // Request.post(url, body) - закомментила, чтобы не создавалась куча тасок)))

    //Не уверена, правильно ли вообще реализовала задание, тема с классами тяжело дается. Но сделала все, что могла)))0))