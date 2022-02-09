import { useState, useEffect } from "react";
import baseUrl from "../utils/baseUrl";
import { Flex } from "@chakra-ui/react";
import Router from "next/router";

export default function ProfileSearchBar() {
    
    const [search, updateSearch] = useState("");
    const [query, setQuery] = useState([]);

    useEffect(() => {
        async function handler() {
            setQuery(
                await fetch(`${baseUrl}/api/users/search/${search}`, {
                    method: 'GET'
                })
                    .then((response) => response.json())
                    .then((users) => {
                        return users.data;
                })
            );
        }
        handler();
    }, [search]);

    return (
        <>
            <input type="text" value={search} onChange={(event) => {
                updateSearch(event.target.value);
            }} />
            {query?.map((user) => (
                <Flex onClick={() => Router.push(`${baseUrl}/profile/${user.userName}`)}>
                    <img src={user.profilePicture} />
                    <p>{user.userName}</p>
                    <p>{user.firstName}</p>
                    <p>{user.lastName}</p>
                </Flex>
            ))}
        </>
    );
}