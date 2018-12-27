import React, { Component } from 'react';
import NavLink from "react-router-dom/es/NavLink"
import { withRouter } from 'react-router-dom'

class MentorForm extends Component {
    constructor(props) {
        super(props);
        if (this.props.isEditing) {
            this.state = {
                mentorData: this.props.mentorData,
                active:false
            }
        } else {
            this.state = {
                mentorData: {
                    "first_name": "",
                    "last_name": "",
                    "bday": "",
                    "type": "Mentor",
                    "slack_nickname": "ttps://github.com/a-magdy",
                    "admission_date": "",
                    "status": ""
                },
            }
        }
    }

    updateField = (e) => {
        const { name, value } = e.target;

        this.setState({
            mentorData: {
                ...this.state.mentorData,
                [name]: value,
            }
        })
    }
    changeActive=e=>{
        this.setState({status:"active"})
        }
    

    submitForm = (e) => {
        e.preventDefault();

        let url = '', method = '';

        if (this.props.isEditing) {
            url = `/api/mentors/${this.props.match.params.id}`
            method = 'PUT';
        } else {
            url = `/api/mentors`
            method = 'POST';
        }

        fetch(url, {
            method,
            body: JSON.stringify(this.state.mentorData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.text())
            .then(response => {
                console.log('Success:', response)
                // TODO redirect to the Mentors list page (/Mentors)
                console.log("updated....")
                this.props.history.goBack()
            })
            .catch(error => console.error('Error:', error));
    }

    render() {
        return (
            <div className="container">
                <h3>{this.props.isEditing ? "Edit Mentor" : "Add Mentor"}</h3>
                <div className="card shadow-sm p-3 mb-3">
                    <form onSubmit={this.submitForm}>

                        <div className="row">
                            <div className="col-md-6 mb-2">
                                <input type="text" className="form-control" name="first_name" placeholder="First name" defaultValue={this.state.mentorData.first_name} onChange={this.updateField} />
                            </div>
                            <div className="col-md-6 mb-2">
                                <input type="text" className="form-control" name="last_name" placeholder="Last name" defaultValue={this.state.mentorData.last_name} onChange={this.updateField} />
                            </div>

                            <div className="col-md-6 mb-2">
                                <input type="text" className="form-control" name="bday" placeholder="Birth date" defaultValue={this.state.mentorData.bday} onChange={this.updateField} />
                            </div>
                            <div className="col-md-6 mb-2">
                                <input type="text" className="form-control" name="type" placeholder="type" defaultValue={this.state.mentorData.type} onChange={this.updateField} />
                            </div>

                            <div className="col-md-6 mb-2">
                                <input type="text" className="form-control" name="github" placeholder="GitHub url" defaultValue={this.state.mentorData.slack_nickname} onChange={this.updateField} />
                            </div>
                            <div className="col-md-6 mb-2">
                                <input type="text" className="form-control" name="admission_date" placeholder="Admission date" defaultValue={this.state.mentorData.admission_date} onChange={this.updateField} />
                            </div>

                        </div>

                        <div className="form-group row">
                            <div className="col-sm-2 col-lg-1">Status</div>
                            <div className="col-sm-10 col-lg-11">
                                <div className="form-check">
                                    <label className="form-check-label" htmlFor="status">
                                    <input type="checkbox" className="form-check-input" name="status" 
                                    onChange={(e)=>this.setState({status:e.target.checked})}
                                     checked={this.props.isEditing && this.state.mentorData.status }/> Active
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            <i className="fa fa-floppy-o" aria-hidden="true" /> {this.props.isEditing ? "Update Mentor" : "Add Mentor"}
                        </button>
                        <NavLink className="btn btn-light ml-3" to="/"><i className="fa fa-caret-left"></i> back</NavLink>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(MentorForm);