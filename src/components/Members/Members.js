import React from 'react'
import Member from './Member'

// Terdapat sedikit modifikasi pada kode tersebut, yaitu kode this.state.members 
// diganti menjadi props.members karena kita mengirimkan data members melalui props.
const members = (props) => (
    props.members.map((member) => (
        // memisahkan card ini dibawah menjadi satu component terpisah di file member.js
        // <div className="col-md-6" key={member.id}>
        //     <div className="card" style={{ margin: 10 }}>
        //         <div className="card-body">
        //             <h5 className="card-title">{member.id}</h5>
        //             <h5 className="card-title">{member.first_name}</h5>
        //             <h5 className="card-title">{member.last_name}</h5>
        //             {/* kita juga mengirimkan props.editButtonClick dan props.deleteButtonClick 
        //             ke dalam component Members sebagai event handler tombol edit dan delete. */}
        //             <button
        //                 className="btn btn-primary"
        //                 onClick={() => props.editButtonClick(member)}
        //             >Edit</button>
        //             <button
        //                 className="btn btn-danger"
        //                 onClick={() => props.deleteButtonClick(member.id)}
        //             >Delete</button>
        //         </div>
        //     </div>
        // </div>
        <Member
            member={member}
            editButtonClick={(member) => props.editButtonClick(member)}
            deleteButtonClick={(id) => props.deleteButtonClick(id)}
        />
    ))
)

export default members