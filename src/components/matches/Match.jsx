import React, { useEffect } from "react";
import { getAllMatches } from "../../api/getBackendData";
import { useNavigate } from "react-router-dom";
import useMatchStore from "../../store/useMatchStore";

import Options from "./Options.jsx"
import AdBanner from "./AdBanner.jsx"


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



    const getMatchNumber = (index) => {
        return `${index + 10}th IPL Match`;
    };

    return (
        <section className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
            <Options />

            <div className="max-w-2xl mx-auto px-4 py-6">
                {loading && (
                    <div className="text-center py-8">
                        <p className="text-gray-600">Loading matches...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                        <p className="text-red-600">Error: {error}</p>
                    </div>
                )}

                {!loading && !error && matches.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-600">No matches available.</p>
                    </div>
                )}

                <div className="space-y-4">
                    {matches?.map((match, index) => {
                        const teamA = match.t1_short_name || match.teamA;
                        const teamB = match.t2_short_name || match.teamB;

                        return (
                            <div
                                key={match.id}
                                className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                onClick={() => navigate(`/select-players/${match.event_id}`)}
                            >
                                <p className="text-center text-gray-500 text-sm mb-4">
                                    {getMatchNumber(index)}
                                </p>

                                <div className="flex items-center justify-between">
                                    {/* Team A */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-2 shadow-lg">
                                            <img src="https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/PERW.png" />
                                        </div>
                                        <span className="font-bold text-gray-800 text-sm">{teamA}</span>
                                    </div>

                                    {/* VS */}
                                    <div className="flex flex-col items-center px-4">
                                        <span className="text-3xl font-bold text-gray-800">VS</span>
                                    </div>

                                    {/* Team B */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-16  rounded-full flex items-center justify-center text-3xl mb-2 shadow-lg">
                                            <img src="https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/MLSW.png" />
                                        </div>
                                        <span className="font-bold text-gray-800 text-sm">{teamB}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Match;