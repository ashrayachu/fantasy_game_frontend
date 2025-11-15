import React, { useEffect, useState } from "react";
import { ShareAltOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import useEventStore from "../../store/useEventStore";

const Team = () => {
    const { events } = useEventStore();
    const [allteams, setAllteams] = useState([]);

    useEffect(() => {
        if (events.length > 0) {
            let merged = [];
            events.forEach(event => {
                merged = [...merged, ...event.teams];
            });
            setAllteams(merged);
        }
    }, [events]);

    const getTeamRoleCount = (team, role) => {
        return team.players.filter(player => player.role === role).length;
    };

    useEffect(() => {
        console.log(allteams)
    }, [allteams])

    const TeamCard = ({ team, index }) => {
        const [isSelected, setIsSelected] = useState(index === 1);

        return (
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div
                            onClick={() => setIsSelected(!isSelected)}
                            className="cursor-pointer"
                        >
                            {isSelected ? (
                                <div className="w-6 h-6 bg-pink-500 rounded flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            ) : (
                                <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
                            )}
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">
                                Team {index + 1} <span className="text-gray-500 text-sm font-normal">(0 contest joined)</span>
                            </h3>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-200 rounded">
                            <ShareAltOutlined className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded">
                            <EditOutlined className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded">
                            <DeleteOutlined className="text-gray-600" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                    {/* Captain */}
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10  rounded-full flex items-center justify-center">
                            <img src={team.captain ? team.captain.team_logo : `https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/PERW.png`} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-800">
                                {team.captain ? team.captain.name : 'MS Dhoni'}
                            </p>
                            <p className="text-xs text-gray-500">Captain</p>
                        </div>
                    </div>

                    {/* Vice Captain */}
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10  rounded-full flex items-center justify-center">
                            <img src={team.captain ? team.viceCaptain.team_logo : `https://s3.ap-south-1.amazonaws.com/leaguex/team-images/bblw/MLSW.png`} />

                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-800">
                                {team.viceCaptain ? team.viceCaptain.name : 'S Dhawan'}
                            </p>
                            <p className="text-xs text-gray-500">Vice Captain</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex gap-6">
                        <div className="text-center">
                            <p className="text-xs text-gray-500 mb-1">WK</p>
                            <p className="text-sm font-semibold">{getTeamRoleCount(team, "Wicket-Keeper")}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-gray-500 mb-1">BAT</p>
                            <p className="text-sm font-semibold">{getTeamRoleCount(team, "Batsman")}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-gray-500 mb-1">AR</p>
                            <p className="text-sm font-semibold">{getTeamRoleCount(team, "All-Rounder")}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-gray-500 mb-1">BOWL</p>
                            <p className="text-sm font-semibold">{getTeamRoleCount(team, "Bowler")}</p>
                        </div>
                    </div>
                    <button className="bg-pink-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-pink-600">
                        Team Preview
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className=" max-w-5xl mx-auto p-4 bg-white min-h-screen">
            <div className="mb-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Select a team to register</h2>
                    <button className="text-sm text-gray-600 hover:text-gray-800">Contest Rules</button>
                </div>
            </div>

            <div className="space-y-2 mb-24">
                {allteams?.map((team, index) => (
                    <TeamCard key={team.team_id} team={team} index={index} />
                ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
                <div className="max-w-md mx-auto">
                    <p className="text-center text-sm text-gray-500 mb-3">
                        Registration closed in : <span className="text-pink-500 font-semibold">02h 11m Left</span>
                    </p>
                    <div className="flex gap-3">
                        <button className="flex-1 border border-pink-500 text-pink-500 py-3 rounded-lg font-medium hover:bg-pink-50">
                            Create Team
                        </button>
                        <button className="flex-1 bg-pink-500 text-white py-3 rounded-lg font-medium hover:bg-pink-600">
                            Register Team with ₹39
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Team;