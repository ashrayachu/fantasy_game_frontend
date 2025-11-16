import React, { useState } from "react";

const Options = () => {
    const [activeTab, setActiveTab] = useState("All");

    const sports = [
        { name: "Cricket", icon: "🏏", available: true },
        { name: "Football", icon: "⚽", available: false, count: 8 },
        { name: "Basketball", icon: "🏀", available: false },
        { name: "Rugby", icon: "🏈", available: false },
        { name: "Hockey", icon: "🏑", available: false },
    ];

    return (
        <div className="bg-gradient-to-br from-blue-900 to-purple-900 px-4 py-6">

            <div className="flex justify-around items-center  max-w-2xl mx-auto">
                {sports.map((sport) => (
                    <div key={sport.name} className="flex flex-col items-center relative">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center text-2xl ${sport.available ? 'bg-pink-500' : 'bg-blue-800'
                            }`}>
                            {sport.icon}
                        </div>
                        {sport.count && (
                            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                {sport.count}
                            </span>
                        )}
                        <span className="text-white text-xs mt-2">{sport.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Options;