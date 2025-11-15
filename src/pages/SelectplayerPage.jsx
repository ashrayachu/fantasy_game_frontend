import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SelectPlayers from "../components/selectPlayers/SelectPlayers"


const SelectplayerPage = () => {
    const { event_id } = useParams();


    return (
        <section className="matches-page  min-h-screen -600" >
            <SelectPlayers event_id={event_id}  />
        </section>
    );
};

export default SelectplayerPage;