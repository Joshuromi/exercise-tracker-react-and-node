import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []}
    }

    componentDidMount(){
        axios.get('http://localhost:3030/exercises/')
            .then(res => {
                console.log(res.data);
                this.setState({exercises: res.data})
            })
            .catch(err => console.log(err));
    }

    deleteExercise(id) {
        axios.delete('http://localhost:3030/exercises/'+id);
        
        this.setState({
            exercises: this.state.exercises.filter(exercise => exercise._id !== id)
        })
    }

    render() {
        return(
            <div>
                <h2>Logged Exercises</h2>
                <br />
                    <div className="card-columns">
                        {
                            this.state.exercises.map(exercise => {
                                return(
                                    <div key={exercise._id} className="card text-center" >
                                        <div className="card-header"><h5>Username</h5>{exercise.username}</div>
                                        <div className="card-body">
                                            <h5 className="card-title">Description</h5>
                                            <p className="card-text">{exercise.description}</p>
                                            <h5 className="card-title">Duration (mins)</h5>
                                            <p className="card-text">{exercise.duration}</p>
                                            <Link 
                                                className="btn btn-primary btn-sm"
                                                to={"/edit/"+exercise._id}
                                            >Edit</Link>
                                            &nbsp;
                                            <button 
                                                className="btn btn-danger btn-sm"
                                                onClick={() => {this.deleteExercise(exercise._id)}}
                                            >Delete</button>
                                        </div>
                                        <div className="card-footer text-muted"><h5>Date</h5> {exercise.date.substring(0,10)}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
            </div>
        )
    }
}

export default  ExercisesList;