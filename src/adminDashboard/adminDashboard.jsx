import React from 'react'
import "./adminDashboard.css"
import axios from 'axios'
import { Config } from "../config/Config"
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


function AdminDashboard() {
    const navigate = useNavigate()
    const [bname, setbname] = useState()
    const [bpdf, setpdf] = useState(null)
    const { bookId } = useParams()
    console.log(bookId.length)
    const saveBook = (e) => {
        console.log(e.target.value)
        setbname(e.target.value)

    };

    const saveFile = (e) => {
        console.log(e.target.files[0])
        setpdf(e.target.files[0]);
    };

    const upload = async () => {
        try {
           
                const formdata = new FormData();
                formdata.append('bookname',bname)
                formdata.append('pdf', bpdf);
                const book =bookId.length > 5 ?await axios.put(`${Config.api}/updatebook/${bookId}`, formdata, {
                    headers: {
                        "Authorization": localStorage.getItem("book")
                    }
                }) .then(response => {
                   
                    alert('File and text updated successfully')
                    console.log('File and text updated successfully', response);
                    navigate("/view")
                  })
                  .catch(error => {
                    alert('Error updateding file and text')
                    console.error('Error updateding file and text', error);
                  }) : await axios.post(`${Config.api}/uploadpdf`, formdata, {
                    headers: {
                        "Authorization": localStorage.getItem("book")
                    }
                }) .then(response => {
                   
                    alert('File and text uploaded successfully')
                    console.log('File and text uploaded successfully', response);
                    navigate("/view")
                  })
                  .catch(error => {
                    alert('Error uploading file and text')
                    console.error('Error uploading file and text', error);
                  });
                  setbname('')
                  setpdf(null)
           
           
        } catch (error) {
            alert("something went wrong")
        }
    }
    const move = () =>{
        navigate("/view")
    }

    return (
        <>
            <div className='container uploadfile'>

                <div className="col-lg-4 col-md-6 col-12 mx-auto">


                   

                        <div class="mb-3 text-center">
                            <h5 class="py-lg-1 py-3" style={{ fontWeight: "bold", fontSize: "21px" }}>{bookId.length>5? 'UPDATE PDF': 'UPLOAD PDF'}</h5>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">bookname</label>
                            <input
                                name="bookname"
                                type="text"
                                id="staticEmail2"
                                onChange={saveBook}
                                value={bname}
                                class='form-control' />
                        </div>

                        <div className="mb-3">
                            <label class="form-label">pdf</label>
                            <input
                                name="pdf"
                                type="file"
                                id="inputpdf2"
                                onChange={saveFile}
                                class="form-control" />
                        </div>

                        <div className="col-lg-12" style={{ marginTop: "20px", display: "flex", flexDirection:"column",justifyContent: "center",alignItems:"center",fontWeight:"bold" }}>
                            <button className="btn btn-primary  col-lg-12 logbtn mx-auto" style={{fontWeight:"bold" }}
                              type="submit"  onClick={upload}>{bookId.length>5? 'update': 'upload'}</button>
                              <button className='btn btn-primary mt-2' onClick={move}>Back</button>
                        </div>

                 

                </div>

            </div >



        </>
    )
}

export default AdminDashboard