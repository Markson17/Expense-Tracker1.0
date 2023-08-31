import React, { Component } from 'react';

export default class userDashboard extends Component {
    componentDidMount() {
        fetch("http://localhost:3000/users/dashboard", {
            method: "GET",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token")
            }),   
        }).then((res) => res.json())
            .then((data) => {
                console.log(data, "user dashboard")
            })
    }
    render() {
        return (
            <div>
                <h1>User Details</h1>
            </div>
        )
    }
}
