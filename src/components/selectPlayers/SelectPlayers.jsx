import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Table, Tabs, Checkbox } from "antd";
import { getAllPlayers } from "../../api/getBackendData";
import useMatchStore from "../../store/useMatchStore";
import useEventStore from "../../store/useEventStore";

const Selectplayers = () => {
    const { event_id } = useParams();
    const navigate = useNavigate();
    const { matches } = useMatchStore();
    const { saveEventTeam, getEventTeams } = useEventStore();

    const [bowlers, setBowlers] = useState([]);
    const [batsman, setBatsman] = useState([]);
    const [allRounders, setAllRounders] = useState([]);
    const [wicketKeepers, setwicketKeepers] = useState([]);
    const [team, setTeam] = useState({
        totalPlayers: 0,
        totalCredits: 0,
        players: [],
        captain: null,
        viceCaptain: null,
    });
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [showCaptainModal, setShowCaptainModal] = useState(false);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const res = await getAllPlayers();
                const allPlayers = res.data;

                if (allPlayers?.length !== 0) {
                    const bowlers = allPlayers.filter((player) => player.role === "Bowler");
                    setBowlers(bowlers);
                    const batsman = allPlayers.filter((player) => player.role === "Batsman");
                    setBatsman(batsman);
                    const allrounders = allPlayers.filter((player) => player.role === "All-Rounder");
                    setAllRounders(allrounders);
                    const wicketKeepers = allPlayers.filter((player) => player.role === "Wicket-Keeper");
                    setwicketKeepers(wicketKeepers);
                }
            } catch (e) {
                console.log("error fetching players:", e);
            }
        };
        fetchPlayers();
    }, []);

    useEffect(() => {
    if (saveSuccess) {
        setTimeout(() => {
            navigate('/teams');
        }, 1500); // Navigate after a short delay to show success message
    }
}, [saveSuccess, navigate]);

    const getTeamCount = (teamName) => {
        const filteredTeam = team.players.filter((player) => player.team_name === teamName);
        return filteredTeam.length;
    };

    const getRoleCount = (role) => {
        const filteredTeam = team.players.filter((player) => player.role === role);
        return filteredTeam.length;
    };

    const handleAddPlayer = (player) => {
        if (team.players.some(p => p.id === player.id)) {
            alert("Player already added");
            return;
        }
        if (team.totalPlayers >= 11) {
            alert("You can select only 11 players");
            return;
        }
        if (team.totalCredits + player.event_player_credit > 100) {
            alert("Total credits cannot exceed 100");
            return;
        }
        const teamCount = getTeamCount(player.team_name);
        if (teamCount >= 7) {
            alert(`Maximum 7 players allowed from ${player.team_name}`);
            return;
        }
        const roleCount = getRoleCount(player.role);
        if (player.role === "Batsman" && roleCount >= 7) {
            alert("Maximum 7 batsmen allowed");
            return;
        }
        if (player.role === "Bowler" && roleCount >= 7) {
            alert("Maximum 7 bowlers allowed");
            return;
        }
        if (player.role === "Wicket-Keeper" && roleCount >= 5) {
            alert("Maximum 5 wicket-keepers allowed");
            return;
        }
        if (player.role === "All-Rounder" && roleCount >= 4) {
            alert("Maximum 4 all-rounders allowed");
            return;
        }
        setTeam(prev => ({
            ...prev,
            totalPlayers: prev.totalPlayers + 1,
            totalCredits: prev.totalCredits + player.event_player_credit,
            players: [...prev.players, player]
        }));
    };

    const handleRemovePlayer = (playerId) => {
        const playerToRemove = team.players.find(p => p.id === playerId);
        if (playerToRemove) {
            setTeam(prev => ({
                ...prev,
                totalPlayers: prev.totalPlayers - 1,
                totalCredits: prev.totalCredits - playerToRemove.event_player_credit,
                players: prev.players.filter(p => p.id !== playerId),
                captain: prev.captain?.id === playerId ? null : prev.captain,
                viceCaptain: prev.viceCaptain?.id === playerId ? null : prev.viceCaptain,
            }));
        }
    };

    const handleSaveTeam = () => {
        if (team.totalPlayers === 0) {
            alert("Please add at least one player to your team");
            return;
        }

        if (team.totalPlayers !== 11) {
            alert("You must select exactly 11 players");
            return;
        }

        if (getRoleCount("Bowler") < 3) {
            alert("Please add at least 3 bowlers to your team");
            return;
        }

        if (getRoleCount("Batsman") < 3) {
            alert("Please add at least 3 batsmen to your team");
            return;
        }

        if (getRoleCount("Wicket-Keeper") < 1) {
            alert("Please add at least 1 wicket keeper to your team");
            return;
        }

        if (team.totalCredits > 100) {
            alert("Total credits cannot exceed 100");
            return;
        }

        setShowCaptainModal(true);
    };

    const handleCaptainSelection = () => {
        if (!team.captain) {
            alert("Please select a captain");
            return;
        }
        if (!team.viceCaptain) {
            alert("Please select a vice captain");
            return;
        }
        if (team.captain.id === team.viceCaptain.id) {
            alert("Captain and Vice Captain cannot be the same player");
            return;
        }

        const teamData = {
            team_id: `team_${Date.now()}`,
            event_id: event_id,
            totalPlayers: team.totalPlayers,
            totalCredits: team.totalCredits,
            players: team.players,
            captain: team.captain,
            viceCaptain: team.viceCaptain,
            created_at: new Date().toISOString()
        };

        saveEventTeam(event_id, teamData);
        setSaveSuccess(true);
        setShowCaptainModal(false);

        setTimeout(() => {
            setSaveSuccess(false);
        }, 3000);

        console.log("Team saved successfully:", teamData);
        if(saveSuccess){
            navigate('/teams')
        }
    };

    const columns = [
        {
            title: 'Player',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div className="flex items-center gap-2">
                    <img src={record.team_logo} alt="" className="w-8 h-8" />
                    <div>
                        <div className="font-semibold">{text}</div>
                        <div className="text-xs text-gray-500">{record.country}</div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Points',
            dataIndex: 'points',
            key: 'points',
            render: () => Math.floor(Math.random() * 100),
        },
        {
            title: 'Credits',
            dataIndex: 'event_player_credit',
            key: 'credits',
            render: (text) => `${text}`,
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => {
                const isAdded = team.players.some(p => p.id === record.id);
                return (
                    <Checkbox
                        checked={isAdded}
                        onChange={() => isAdded ? handleRemovePlayer(record.id) : handleAddPlayer(record)}
                    />
                );
            },
        },
    ];

    const tabItems = [
        {
            key: 'wk',
            label: `WK (${getRoleCount("Wicket-Keeper")})`,
            children: (
                <Table
                    dataSource={wicketKeepers}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                />
            ),
        },
        {
            key: 'bat',
            label: `Batsman (${getRoleCount("Batsman")})`,
            children: (
                <Table
                    dataSource={batsman}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                />
            ),
        },
        {
            key: 'ar',
            label: `AR (${getRoleCount("All-Rounder")})`,
            children: (
                <Table
                    dataSource={allRounders}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                />
            ),
        },
        {
            key: 'bowl',
            label: `Bowler (${getRoleCount("Bowler")})`,
            children: (
                <Table
                    dataSource={bowlers}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                />
            ),
        },
    ];

    return (
        <section className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Select Players</h1>
                        <div className="flex gap-6">
                            <div>
                                <span className="text-gray-600">Players: </span>
                                <span className="text-xl font-bold">{team.totalPlayers}/11</span>
                            </div>
                            <div>
                                <span className="text-gray-600">Credits Left: </span>
                                <span className="text-xl font-bold">{100 - team.totalCredits}</span>
                            </div>
                        </div>
                    </div>

                    {saveSuccess && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                            Team saved successfully!
                        </div>
                    )}

                    {team.totalPlayers > 0 && (
                        <div className="bg-gray-50 p-4 rounded mb-4">
                            <h3 className="font-bold mb-2">Selected Players ({team.totalPlayers})</h3>
                            <div className="flex flex-wrap gap-2">
                                {team.players.map((player) => (
                                    <div key={player.id} className="bg-white px-3 py-1 rounded border flex items-center gap-2">
                                        <span className="text-sm">{player.name}</span>
                                        <button
                                            onClick={() => handleRemovePlayer(player.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow-sm">
                    <Tabs defaultActiveKey="bat" items={tabItems} />
                </div>

                <div className="mt-4 flex gap-4">
                  
                    <button
                        onClick={handleSaveTeam}
                        className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-lg"
                    >
                        Save Team
                    </button>
                </div>
            </div>

            {showCaptainModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h2 className="text-2xl font-bold mb-4">Select Captain & Vice Captain</h2>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-2">Captain</label>
                            <select
                                className="w-full border border-gray-300 rounded p-2"
                                value={team.captain?.id || ''}
                                onChange={(e) => {
                                    const id = Number(e.target.value);
                                    const player = team.players.find(p => p.id === id);
                                    setTeam(prev => ({ ...prev, captain: player }));
                                }}
                            >
                                <option value="">Select Captain</option>
                                {team.players.map((player) => (
                                    <option key={player.id} value={String(player.id)}>
                                        {player.name}
                                    </option>
                                ))}
                            </select>

                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-2">Vice Captain</label>
                            <select
                                className="w-full border border-gray-300 rounded p-2"
                                value={team.viceCaptain?.id || ''}
                                onChange={(e) => {
                                    const id = Number(e.target.value);
                                    const player = team.players.find(p => p.id === id);
                                    setTeam(prev => ({ ...prev, viceCaptain: player }));
                                }}
                            >
                                <option value="">Select Vice Captain</option>
                                {team.players.map((player) => (
                                    <option key={player.id} value={String(player.id)}>
                                        {player.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowCaptainModal(false)}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCaptainSelection}
                                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
export default Selectplayers;