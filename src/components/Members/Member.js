import React from 'react'

// memisahkan card ini menjadi satu component terpisah
const member = (props) => (
    // mengirimkan {props.member.id} dsb, ke dalam component Member
        <div className="col-md-6" key={props.member.id}>
            <div className="card" style={{ margin: 10 }}>
                <div className="card-body">
                    <h5 className="card-title">{props.member.id}</h5>
                    <h5 className="card-title">{props.member.first_name}</h5>
                    <h5 className="card-title">{props.member.last_name}</h5>
                    {/* kita juga mengirimkan props.editButtonClick dan props.deleteButtonClick 
                    ke dalam component Members sebagai event handler tombol edit dan delete. */}
                    <button
                        className="btn btn-primary"
                        onClick={() => props.editButtonClick(props.member)}
                    >Edit</button>
                    <button
                        className="btn btn-danger"
                        onClick={() => props.deleteButtonClick(props.member.id)}
                    >Delete</button>
                </div>
            </div>
        </div>
)

export default member