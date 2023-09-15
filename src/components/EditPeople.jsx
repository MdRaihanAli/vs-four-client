import React from 'react'
import { useNavigate, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

function EditPeople() {
    const person = useLoaderData()
    const { _id, name, phone, passport, sivilId, nationality, occupation, visa, startDate, expire, workigPlace } = person
    const navigate = useNavigate()

    const handelUpdate = (event) => {
        event.preventDefault();

        const form = event.target;

        const name = form.name.value;
        const phone = form.phone.value;
        const passport = form.passport.value;
        const sivilId = form.sivilId.value;
        const nationality = form.nationality.value;
        const occupation = form.occupation.value;
        const visa = form.visa.value;
        const startDate = form.startDate.value;
        const expire = form.expire.value;
        const workigPlace = form.workigPlace.value;

        const user = { name, phone, passport, sivilId, nationality, occupation, visa, startDate, expire, workigPlace }

        // console.log(_id);

        fetch(`https://vs-four-server-production.up.railway.app/updatePeople/${_id}`, {
            method: "PATCH",
            headers: { 'content-type': "application/json" },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Updated',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/')
                console.log("dddddddd", data);
            })
        // console.log(user);
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content">

                    <div className="card flex-shrink-0 w-full max-w-3xl shadow-2xl bg-base-100">
                        <h1 className="text-3xl font-bold text-center mt-2">Edit information!</h1>
                        <form onSubmit={handelUpdate} className="card-body">

                            <div className='flex gap-2'>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Name</span>
                                    </label>
                                    <input type="text" placeholder="Name" defaultValue={name} name='name' className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Phone</span>
                                    </label>
                                    <input type="number" placeholder="Phone Number" defaultValue={phone} name='phone' className="input input-bordered" />
                                </div>
                            </div>

                            <div className='flex gap-2'>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Passport Number</span>
                                    </label>
                                    <input type="text" placeholder="Passport Number" defaultValue={passport} name='passport' className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Civil ID</span>
                                    </label>
                                    <input type="text" placeholder="Civil ID" defaultValue={sivilId} name='sivilId' className="input input-bordered" />
                                </div>
                            </div>

                            <div className='flex gap-2'>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Nationality</span>
                                    </label>
                                    <input type="text" placeholder="Nationality" defaultValue={nationality} name='nationality' className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Occupation</span>
                                    </label>
                                    <input type="text" placeholder="Occupation" defaultValue={occupation} name='occupation' className="input input-bordered" />
                                </div>
                            </div>

                            <div className='flex gap-2'>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Working Place</span>
                                    </label>
                                    <input type="text" defaultValue={workigPlace} name='workigPlace' placeholder="Working Place" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Visa type</span>
                                    </label>
                                    <select defaultValue={visa} name="visa" className='input input-bordered' id="">
                                        <option value="tourist">Tourist</option>
                                        <option value="work permit">Work Permit </option>
                                    </select>
                                </div>
                            </div>

                            <div className='flex gap-2'>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-bold">Start Date</span>
                                    </label>
                                    <input type="date" defaultValue={startDate} name='startDate' className="input input-bordered" />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-bold">Expire</span>
                                    </label>
                                    <input type="date" defaultValue={expire} name='expire' className="input input-bordered" />
                                </div>
                            </div>

                            <div className='flex gap-2'>

                                <div className="form-control mt-6 w-full">
                                    <div className='flex justify-end'>
                                        <input type='submit' value='UPDATE' className="btn btn-primary" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPeople