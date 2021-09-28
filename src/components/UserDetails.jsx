import React from "react";
import { useGetUserQuery } from "../services/usersApi";
import "./UserDetails.css";

const UserDetails = ({ match }) => {
    const userId = match.params.id;
    const { data, isFetching } = useGetUserQuery(userId);

    if (isFetching) return "Loading..";

    return (
        <div className="user">
            <div className="user-details">
                <h1>Details</h1>
                <hr />
                <p>
                    <span>Id:</span> {data.id}
                </p>
                <p>
                    <span>Name:</span> {data.name}
                </p>
                <p>
                    <span>Username:</span> {data.username}
                </p>
                <p>
                    <span>Email:</span> {data.email}
                </p>
                <p>
                    <span>Website:</span> {data.website}
                </p>
                <p>
                    <span>Phone Number:</span> {data.phone}
                </p>
            </div>

            <div className="user-details">
                <h1>Address</h1>
                <hr />
                <p>
                    <span>City:</span> {data.address?.city}
                </p>
                <p>
                    <span>Street:</span> {data.address?.street}
                </p>
                <p>
                    <span>Suit:</span> {data.address?.suite}
                </p>
                <p>
                    <span>Zipcode:</span> {data.address?.zipcode}
                </p>
                <p>
                    <span>Geolocation:</span> {"Lat "} {data.address?.geo?.lat}
                    {" Lng "}
                    {data?.address?.geo?.lng}
                </p>
            </div>

            <div className="user-details">
                <h1>Company</h1>
                <hr />
                <p>
                    <span>Name:</span> {data.company?.name}
                </p>
                <p>
                    <span>Bs:</span> {data.company?.bs}
                </p>
                <p>
                    <span>Catch Phrase:</span> {data.company?.catchPhrase}
                </p>
            </div>
        </div>
    );
};

export default UserDetails;
