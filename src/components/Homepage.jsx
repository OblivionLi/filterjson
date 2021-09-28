import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../services/usersApi";
import "./Homepage.css";
import Pagination from "./Pagination";

const Homepage = () => {
    const { data, isFetching } = useGetUsersQuery();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(7);

    useEffect(() => {
        const filteredData = data?.filter(
            (user) =>
                user.name.toLowerCase().includes(searchTerm?.toLowerCase()) ||
                user.username.toLowerCase().includes(searchTerm?.toLocaleLowerCase()) ||
                user.email.toLocaleLowerCase().includes(searchTerm?.toLocaleLowerCase())
        );

        setUsers(filteredData);
    }, [data, searchTerm]);

    const handleFilter = (e) => {
        let filterBy = e.target.value;
        let filteredData;
        const dataToSort = [...data];

        switch (filterBy) {
            case "all":
                setUsers(data);

                break;

            case "idAsc":
                filteredData = dataToSort?.sort((a, b) => a.id - b.id);
                setUsers(filteredData);

                break;

            case "idDesc":
                filteredData = dataToSort?.sort((a, b) => b.id - a.id);
                setUsers(filteredData);

                break;

            case "nameAsc":
                filteredData = dataToSort?.sort((a, b) => {
                    let nameA = a.name.toUpperCase();
                    let nameB = b.name.toUpperCase();

                    if (nameA < nameB) {
                        return -1;
                    }

                    if (nameA > nameB) {
                        return 1;
                    }

                    // names are equal
                    return 0;
                });

                setUsers(filteredData);

                break;

            case "nameDesc":
                filteredData = dataToSort?.sort((a, b) => {
                    let nameA = a.name.toUpperCase();
                    let nameB = b.name.toUpperCase();

                    if (nameA > nameB) {
                        return -1;
                    }

                    if (nameA < nameB) {
                        return 1;
                    }

                    // names are equal
                    return 0;
                });

                setUsers(filteredData);

                break;

            default:
                console.log("Sorry, this choice doesn't exist");
        }
    };

    // get current users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users?.slice(indexOfFirstUser, indexOfLastUser);

    // change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (isFetching) return "Loading..";

    return (
        <>
            <div className="search">
                <input
                    type="text"
                    name="searchText"
                    placeholder="Search by Name/Username/Email.."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="filter">
                    <label htmlFor="users">Filter By:</label>

                    <select name="users" id="users" onChange={handleFilter}>
                        <option value="all" defaultChecked>
                            All
                        </option>
                        <option value="idAsc">ID Asc</option>
                        <option value="idDesc">ID Desc</option>
                        <option value="nameAsc">Name Asc</option>
                        <option value="nameDesc">Name Desc</option>
                    </select>
                </div>
            </div>

            <div className="content-card">
                {currentUsers?.map((user) => (
                    <div className="card" key={user.id}>
                        <p>
                            <span>Id:</span> {user.id}
                        </p>
                        <p>
                            <span>Name:</span> {user.name}
                        </p>
                        <p>
                            <span>Username:</span> {user.username}
                        </p>
                        <p>
                            <span>Email:</span> {user.email}
                        </p>
                        <div className="card-link">
                            <Link to={`/user/${user.id}`} className="link">
                                View User
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                usersPerPage={usersPerPage}
                totalUsers={users?.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </>
    );
};

export default Homepage;
