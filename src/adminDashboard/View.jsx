import React, { useEffect, useState } from 'react'
import { Config } from '../config/Config'
import axios from 'axios'
import { Rings } from 'react-loader-spinner'
import "./View.css"
import { Link, useNavigate } from 'react-router-dom'
function View() {
    const navigate = useNavigate()
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(false)


    const getData = async () => {
        try {
            // setLoading(true)
            const getData = await axios.get(`${Config.api}/viewbook`, {
                headers: {
                    "Authorization": localStorage.getItem("book")
                }
            })
            console.log(getData.data)
            setUser(getData.data)
            setLoading(false)
        } catch (error) {
            alert("something went wrong")
        }
    }

    useEffect(() => {
        getData()
    }, [])



    const deleteItem = async (id) => {
        try {
            console.log('id', id)
            const deletelist = await axios.delete(`${Config.api}/deletebook/${id}`, {
                headers: {
                    "Authorization": localStorage.getItem("book")
                }
            })
            alert("Deleted file")
            getData()
        } catch (error) {
            alert("something went wrong")
        }
    }

    const move = () =>{
       
        navigate("/adminDashboard/empty")
    }
    const logout = () =>{
        localStorage.removeItem("book")
        navigate("/")
    }

    return (
        <>
            <div className="tableitem">
                <div style={{ margin: "50px 0px" }}>
                    <h1 style={{ fontWeight: "bold" }}>Book Details</h1>
                    <Link to={`/adminDashboard/empty`} style={{ fontWeight: "bold" }} className='btn btn-primary mt-3 mx-2' onClick={move}>Upload Book</Link>
                    <button  style={{ fontWeight: "bold" }} className='btn btn-primary mt-3' onClick={logout}>Logout</button>
                </div>

                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">BookName</th>
                            <th scope="col">PDF</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {loading ? <div class="d-flex justify-content-center rings1" style={{ width: "370%" }}><Rings
                            height="80"
                            width="80"
                            color="black"
                            radius="6"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel="rings-loading"
                        /> </div> :
                            user.map(book => {
                                return (
                                    <tr>
                                        <td>{book.bookname}</td>
                                        <td><a className='btn btn-primary' href={book.pdf} target='_blank'>Download PDF</a></td>
                                        <td>
                                            <Link to={`/adminDashboard/${book._id}`} className='btn btn-primary mx-2' style={{ cursor: "pointer" }}>Update</Link>
                                            <a className='btn btn-primary' onClick={() => deleteItem(book._id)}>Delete</a>

                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>




        </>
    )
}

export default View