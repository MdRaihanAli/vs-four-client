import React, { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import Swal from 'sweetalert2';

function Home() {

    const allPeople = useLoaderData()

    //  for expire date shorting 
    const ascendingSortedData = allPeople.slice().sort((a, b) => {
        const dateA = new Date(a.expire);
        const dateB = new Date(b.expire);
        return dateA - dateB;
    });

    const [peoples, setPeoples] = useState(ascendingSortedData)
    //  for expire date calculate 
    const dateCaculator = (e) => {
        const today = new Date();
        const targetDate = new Date(e);
        const timeDifference = today.getTime() - targetDate.getTime();
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return daysDifference;
    }


    const handelPeopleDelete = (id) => {
        Swal.fire({
            title: 'Do you want to Delete?',

            showCancelButton: true,
            confirmButtonText: 'Delete',

        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://vs-four-server-production.up.railway.app/deletePeople/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        const afterDelete = ascendingSortedData.filter(x => x._id !== id)
                        setPeoples(afterDelete)

                        Swal.fire('Delete!', '', 'success')
                    })
            }
        })
    }





    return (
        <div className='max-w-7xl mx-auto md:p-5 p-1 '>

            <div className="overflow-x-auto">
                <table className="table table-xs table-pin-rows table-pin-cols">
                    <thead className='text-sm '>
                        <tr className='rounded-sm'>
                            <th>#</th>
                            <td>Name</td>
                            <td>Passport/ ID</td>
                            {/* <td>Civil ID</td> */}
                            <td className='hidden lg:inline'>Visa Type</td>
                            <td className='hidden lg:inline' >Phone</td>
                            <td className='hidden lg:inline' >Working Place</td>
                            <td >Start / Expire </td>
                            {/* <td >Expire</td> */}
                            <td>Visa Remaining</td>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            peoples.map((person, index) => <tr key={person._id} className={`${dateCaculator(person.expire) > 0 ? 'bg-red-300' : 'bg-green-300'} font-bold rounded-sm gap-5 border-solid border-2 border-indigo-100`} >
                                <td>{index + 1}</td>
                                <td>
                                    <span className='font-bold text-xl'> {person.name}</span><br />
                                    <span className='text-slate-500'> {person.nationality}</span>
                                </td>
                                <td>
                                    {
                                        person.passport ? <>
                                            <span className='font-bold text-sm'> {person.passport}</span><br />
                                            <span className='text-slate-500'> {person.sivilId}</span>
                                        </> : <span className='text-slate-500 font-bold text-sm'> {person.sivilId}</span>
                                    }

                                </td>
                                <td className='hidden lg:block'>{person?.visa}</td>
                                <td className='hidden lg:inline' >{person.phone}</td>
                                <td className='hidden lg:inline' >{person.workigPlace}</td>
                                <td >
                                    {
                                        person.startDate ? <>
                                            <span className='font-bold'> {person.startDate}</span><br />
                                            <span className='font-bold'> {person.expire}</span>
                                        </>
                                            :
                                            <span className='font-bold'> {person.expire}</span>

                                    }

                                </td>
                                {/* <td >{person.expire}</td> */}
                                <td className=''>
                                    <div className={`badge w-full text-xl p-4 font-bold ${dateCaculator(person.expire) > 0 ? 'badge-error' : 'badge-success'} gap-2`}>
                                        {dateCaculator(person.expire)}
                                    </div>
                                </td>
                                <td className='' >
                                    <span  >
                                        <button onClick={() => handelPeopleDelete(person._id)} className="btn btn-xs w-full  md:w-[48%] ">DELETE</button>
                                    </span>
                                    <Link to={`/editPeople/${person._id}`}> <button onClick={() => handelEdit(person._id)} className="btn w-full  md:w-[48%] mt-1 btn-xs">UPDADE</button></Link>
                                </td>
                                
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default Home