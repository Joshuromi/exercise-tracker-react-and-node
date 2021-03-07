import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class CreateExercise extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3030/users/')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user.username),
                        username: res.data[0].username 
                    }) 
                }
            })
    }

    onChangeUsername(event) {
        this.setState({ username: event.target.value })
    }

    onChangeDescription(event) {
        this.setState({ description: event.target.value })
    }

    onChangeDuration(event) {
        this.setState({ duration: event.target.value })
    }

    onChangeDate(date) {
        this.setState({ date: date })
    }

    onSubmit(event) {
        event.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        axios.post('http://localhost:3030/exercises/add', exercise)
            .then(res => console.log(res.data));


        window.location = "/";
    }

    render() {
        return(
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput" 
                            required 
                            className="form-control" 
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        >
                        {
                            this.state.users.map((user) => (
                                <option key={user} value={user}>
                                    {user}
                                </option>
                            ))
                        }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text" required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker 
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit"
                            className="btn btn-primary"
                            value="Create Exercise Log"
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default  CreateExercise;