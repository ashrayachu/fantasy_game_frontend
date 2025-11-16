import React, { useEffect, useState } from "react";
import TeamPreview from "../components/previewTeam/TeamPreview"


const TeamPreviewPage = () => {

    return (
        <section className="matches-page  min-h-screen -600" >
            <TeamPreview  />
        </section>
    );
};

export default TeamPreviewPage;