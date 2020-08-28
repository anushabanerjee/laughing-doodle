import React from 'react';
import './style.css';
import UserCard from "../usercard/usercard.js"

class UserGallery extends React.Component { 

    constructor(props) {
    super(props)
    this.state = {
        users: [],
        isLoading: false,
        currentPage:0

         }
    }

    componentDidMount = () => {
        this.fetchUsers();
    }

    fetchUsers = () => {
        const pageToFetch = this.state.currentPage +1;

        const url = `https://reqres.in/api/users?page=${pageToFetch}`

        this.setLoading(true);

        fetch(url, {
            method:"GET"
        })
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            const prevUsers = [...this.state.users, ...result.data]

            this.setState({
                users: prevUsers,
                currentPage: pageToFetch
            })

            this.setLoading(false);
        })
        .catch((error) => {
            this.setLoading(false)
        })
    }

    setLoading = (status) => {
        this.setState({
            isLoading:status
        })
    }


    render = () => {
        return (
            <div className="container">
                <p className="title"><u>User Gallery</u></p>

                <div className="show-area">
                    {this.state.users.map((user) => {
                        return(
                            <UserCard
                                key={user.id}
                                picUrl ={user.avatar}
                                firstName={user.first_name}
                                lastName={user.last_name}
                                email={user.email}
                                />
                        )
                        
                    })}
                </div>
                {this.state.isLoading ? (
          <span className="loading-text">Loading ...</span>
        ) : (
          <button className="load-btn" onClick={this.fetchUsers}>
            Load More
          </button>
        )}
      </div>
    );
  };
}

export default UserGallery;