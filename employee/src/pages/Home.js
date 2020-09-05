import React from 'react';
import { Link } from "react-router-dom"
import { connect } from 'react-redux';

let Home = ({ info }) => (

    <div>
        {isWho(info.role)}
    </div>
)


const isWho = (role) => {
    if (role === "admin") {
        return (
            <div>
                <Link to="/seeallemployee">See all employee</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    info: state.auth
})


Home = connect(mapStateToProps)(Home)

export default Home;


