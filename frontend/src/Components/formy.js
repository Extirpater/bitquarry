import { React, useState } from 'react';
import ReactDOM from 'react-dom';
import fileDownload from 'js-file-download'
import axios from 'axios'

const Formy = () => {
    const getFile = () => {
        axios.get("ImageFolder.zip", {
            responseType: 'blob'
        }).then(res => {
            fileDownload(res.data, "test.zip");
        }).catch((error) => console.log(error))
    }

    const [toAPI, setToAPI] = useState({
        data: "",
        numimages: 50
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(toAPI);
        getFile();
    }

    const handleChange = (e) => {
        setToAPI({...toAPI, [e.target.name]: [e.target.value]})
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="data" placeholder="keyword" value={toAPI.data} onChange={handleChange}/>
            <input type="number" name="numimages" placeholder="50" value={toAPI.numimages} onChange={handleChange}/>
            <button>Retrieve Images</button>
        </form>
    )
}
export {Formy};