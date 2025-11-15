import React, { useEffect } from "react";
import { getAllMatches } from "../../api/getBackendData";
import { useNavigate } from "react-router-dom";
import useMatchStore from "../../store/useMatchStore";

const Match = () => {
    const navigate = useNavigate();


    const { matches, loading, error, setMatches, setLoading, setError } = useMatchStore();

    useEffect(() => {
        const fetchMatches = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await getAllMatches();
                setMatches(res.data.matches.cricket);
            } catch (err) {
                console.warn("Failed to fetch matches, using fallback data:", err);
                setMatches([
                    { id: 1, teamA: "Dragons", teamB: "Wizards", time: "2025-11-15T18:00:00Z" },
                    { id: 2, teamA: "Knights", teamB: "Titans", time: "2025-11-16T20:30:00Z" },
                ]);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, [setMatches, setLoading, setError]);

    useEffect(() => {
        console.log("Matches", matches);
    }, [matches]);

    return (
        <section className="matches-page min-h-screen">
            <h1 className="bg-red-500 text-red-700">Hello world</h1>
            <h1 className="text-3xl font-bold underline">cricket matches</h1>

            {loading && <p>Loading matches...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && !error && matches.length === 0 && (
                <p>No matches available.</p>
            )}

            <div>
                {matches?.map((match) => (
                    <div
                        key={match.id}
                        className="bg-white p-4 m-2 rounded shadow cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => navigate(`/select-players/${match.event_id}`)}
                    >
                        <h2 className="text-xl font-semibold">
                            {match.t1_short_name || match.teamA} vs {match.t2_short_name || match.teamB}
                        </h2>
                        <p className="text-gray-600">
                            Time: {new Date(match.match_date || match.time).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Match;