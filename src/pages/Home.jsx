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
                            <td>Passport</td>
                            <td>Civil ID</td>
                            <td className='hidden md:block'>Visa Type</td>
                            <td>Phone</td>
                            <td>Start Date</td>
                            <td className='hidden md:block'>Expire</td>
                            <td>Visa Remaining</td>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            peoples.map((person, index) => <tr key={person._id} className={`${dateCaculator(person.expire) > 0 ? 'bg-red-300' : 'bg-green-300'} font-bold rounded-sm gap-5 border-solid border-2 border-indigo-100`} >
                                <td>{index}</td>
                                <td>
                                    <span className='font-bold text-xl'> {person.name}</span><br />
                                    <span className='text-slate-500'> {person.nationality}</span>
                                </td>
                                <td>{person.passport}</td>
                                <td>{person.sivilId}</td>
                                <td className='hidden md:block'>{person?.visa}</td>
                                <td>{person.phone}</td>
                                <td>{person.startDate}</td>
                                <td className='hidden md:block'>{person.expire}</td>
                                <td className=''>
                                    <div className={`badge w-full text-xl p-4 font-bold ${dateCaculator(person.expire) > 0 ? 'badge-error' : 'badge-success'} gap-2`}>
                                        {dateCaculator(person.expire)}
                                    </div>
                                </td>
                                <td className='hidden mt-2 lg:block'>
                                    <button onClick={() => handelPeopleDelete(person._id)} className="btn btn-xs">DELETE</button>
                                    <Link to={`/editPeople/${person._id}`}> <button onClick={() => handelEdit(person._id)} className="btn btn-xs">UPDADE</button></Link>
                                </td>
                                <td>
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