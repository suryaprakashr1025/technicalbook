import React, { useEffect, useState } from 'react'
import { Config } from '../config/Config'
import axios from 'axios'
import { Rings } from 'react-loader-spinner'
import "./userDashboard.css"
import { useNavigate } from 'react-router-dom'
function UserDashboard() {
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


const move = () =>{
    localStorage.removeItem("book")
    navigate("/")
}
   



    return (
        <>
            <div className="tableitem">
            <div style={{ margin: "50px 0px" }}>
                    <h1 style={{ fontWeight: "bold" }}>Book Details</h1>
                    <button  style={{ fontWeight: "bold" }} className='btn btn-primary mt-3' onClick={move}>Logout</button>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">BookName</th>
                            <th scope="col">PDF</th>
                           
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

export default UserDashboard