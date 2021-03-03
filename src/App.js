import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import Members from './components/Members/Members'
import Form from './components/Form/Form'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      members: [],
      first_name: '',
      last_name: '',
      buttonDisabled: false,
      formStatus: 'Create',
      memberIdSelected: null,
    }
  }

  componentDidMount() {
    axios.get('https://reqres.in/api/users?page=1')
      .then(response => {
        this.setState({ members: response.data.data })
      })
      .catch(error => {
        console.log(error)
      })
  }

  inputOnChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmitHandler = event => {
    console.log("Form telah disubmit")
    event.preventDefault()
    this.setState({ buttonDisabled: true });
    var payload = {
      first_name: this.state.first_name,
      last_name: this.state.last_name
    };

    var url = "https://reqres.in/api/users"
    if (this.state.formStatus == 'Create') {
        this.addMember(url, payload)
    } else {
        url = 'https://reqres.in/api/users/${this.state.memberIdSelected}'
        this.editMember(url, payload)
    }
  };

  addMember = (url,payload) => {
    axios.post(url, payload)
      .then(response => {
        console.log(response);
        var members = [...this.state.members];
        members.push(response.data);
        this.setState({ members, buttonDisabled: false, first_name: '', last_name: '' })
      })
      .catch(error => {
        console.log(error);
      });
    }

    // Penjelasan dari kode di dibawah adalah, ketika kita mendapatkan response sukses dari server,
    // maka kita akan meng-edit juga data member yang ada di state kita. Pertama, kita copy state member 
    // dan kita cari member yang akan kita edit berada di index berapa. Setelah mendapatkan index nya, 
    // maka kita ubah property first_name dan last_name nya. Berikutnya, kita lakukan setState untuk 
    // merubah data di state.
    editMember = (url, payload) => {
      axios.put(url, payload)
        .then(response => {
          var members = [...this.state.members]
          var indexMember = members.findIndex(member => member.id === this.state.memberIdSelected)

          // mengganti data yang ada dalam state members dan index yang sesuai
          members[indexMember].first_name = response.data.first_name
          members[indexMember].last_name = response.data.last_name
          this.setState({
            members,
            buttonDisabled: false,
            first_name: '',
            last_name: '',
            formStatus: 'Create',
          })
        })
        .catch(error => {
          console.log(error);
        })  
    };

  // Kita gunakan object member untuk merubah state form input,
  // dan kita juga akan menyimpan id member pada state memberId
  editButtonHandler = (member) => {
    this.setState( {
      first_name : member.first_name,
      last_name : member.last_name,
      formStatus : 'Edit',
      memberIdSelected : member.id,
    })
  }

  deleteButtonHandler = (id) => {
    var url = 'https://reqres.in/api/users/$(id)';
    axios.delete(url)
      .then(response => {
        if(response.status === 204) {
          var members = [...this.state.members]
          var index = members.findIndex(member => member.id === id)
          members.splice(index, 1)
          this.setState({ members })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className="container">
        <h1>Codepolitan DevSchool</h1>
        <div className="row">
          <div className="col-md-6" style={{ border: '1px solid black' }}>
            <h2>Member</h2>
            <div className="row">
              {/* kita gunakan component Members di dalam jsx, serta mengirimkan props yang diperlukan */}
                <Members 
                    members={this.state.members}
                    editButtonClick={(member) => this.editButtonHandler(member)}
                    deleteButtonClick={(id) => this.deleteButtonHandler(id)}
                />
            </div>
          </div>
          
          <div className="col-md-6" style={{ border: '1px solid black' }}>
            <h2>Form {this.state.formStatus}</h2>
            {/* kita akan memisahkan form yang ada di App.js menjadi component terpisah ke file Form.js*/}
            {/* <form onSubmit={this.onSubmitHandler}>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  value={this.state.first_name}
                  onChange={this.inputOnChangeHandler}
                />
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    value={this.state.last_name}
                    onChange={this.inputOnChangeHandler}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={this.state.buttonDisabled}
                >Submit</button>
              </div>
            </form> */}
            <Form
                onSubmitForm={this.onSubmitHandler}
                onChange={this.inputOnChangeHandler}
                first_name={this.state.first_name}
                last_name={this.state.last_name}
                buttonDisabled={this.state.buttonDisabled}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
