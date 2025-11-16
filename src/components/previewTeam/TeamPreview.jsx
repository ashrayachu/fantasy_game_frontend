import React, { useEffect, useState } from "react";
import { Table, Tabs, Checkbox } from "antd";

import { useNavigate, useParams } from "react-router-dom";
import useEventStore from "../../store/useEventStore";

const TeamPreview = () => {
    const { teamId } = useParams()
    const navigate = useNavigate();
    const { allTeams } = useEventStore();
    const [team, setTeam] = useState()



    useEffect(() => {
        if (!allTeams) return;

        const found = allTeams.find(t => t.team_id == teamId);
        setTeam(found);

    }, [allTeams]);

    useEffect(() => {
        console.log("team", team)
    }, [team])

    const columns = [
        {
            title: 'Player',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => {

                const isViceCaptain = record.id === team?.viceCaptain?.id
                const isCaptain = record.id === team?.captain?.id

                return (
                    <div className="flex items-center gap-2">
                        <img src={record.team_logo} alt="" className="w-8 h-8" />


                        <div>
                            <div className="font-semibold">{text}</div>
                            <div className="text-xs text-gray-500">{record.country}</div>
                        </div>
                        {isCaptain && (
                            <span className="rounded-md px-2 text-base bg-green-100 border border-green-200">c</span>
                        )}
                        {isViceCaptain && (
                            <span className="rounded-md px-2 text-base bg-green-100 border border-green-200">vc</span>
                        )}



                    </div>
                )
            },
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
            title: 'Role',
            dataIndex: 'role',
            key: 'credits',
            render: (text) => `${text}`,
        },

    ];



    return (
        <div className=" min-h-screen">
            <div className="max-w-6xl mx-auto overflow-hidden">
                <Table
                    dataSource={team?.players}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                />
            </div>
        </div>
    );
};

export default TeamPreview;