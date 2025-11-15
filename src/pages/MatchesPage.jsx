import React, { useEffect, useState } from "react";
import Match from "../components/matches/Match";
import { getAllMatches } from "../api/getBackendData";

const MatchesPage = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   


    return (
        <section className="matches-page  min-h-screen " >
            <Match/>
        </section>
    );
};

export default MatchesPage;