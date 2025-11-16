import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useEventStore = create(
    persist(
        (set, get) => ({
            events: [],
            allTeams: [],

            setEvents: (events) => set({ events }),
            setAllTeams: (teams) => set({ allTeams: teams }),

            // Save a new team to an event
            saveEventTeam: (eventId, teamData) => set((state) => {
                const existingEventIndex = state.events.findIndex(
                    (event) => event.event_id === eventId
                );

                let updatedEvents;
                if (existingEventIndex !== -1) {
                    updatedEvents = [...state.events];
                    updatedEvents[existingEventIndex] = {
                        ...updatedEvents[existingEventIndex],
                        event_id: eventId,
                        teams: [...updatedEvents[existingEventIndex].teams, teamData],
                        updated_at: new Date().toISOString()
                    };
                } else {
                    updatedEvents = [
                        ...state.events,
                        {
                            event_id: eventId,
                            teams: [teamData],
                            created_at: new Date().toISOString()
                        }
                    ];
                }

                // Update allTeams array as well
                const updatedAllTeams = [...state.allTeams, teamData];

                return {
                    events: updatedEvents,
                    allTeams: updatedAllTeams
                };
            }),

            // Update an existing team
            updateEventTeam: (eventId, teamId, updatedTeamData) => set((state) => {
                console.log("EventId", eventId)
                const eventIndex = state.events.findIndex(
                    (event) => event.event_id === eventId
                );

                if (eventIndex === -1) {
                    console.error(`Event ${eventId} not found`);
                    return state;
                }

                const updatedEvents = [...state.events];
                const teamIndex = updatedEvents[eventIndex].teams.findIndex(
                    (team) => team.team_id === teamId
                );

                if (teamIndex === -1) {
                    console.error(`Team ${teamId} not found in event ${eventId}`);
                    return state;
                }

                // Update team in the event
                updatedEvents[eventIndex] = {
                    ...updatedEvents[eventIndex],
                    teams: [
                        ...updatedEvents[eventIndex].teams.slice(0, teamIndex),
                        updatedTeamData,
                        ...updatedEvents[eventIndex].teams.slice(teamIndex + 1)
                    ],
                    updated_at: new Date().toISOString()
                };

                // Update team in allTeams array
                const allTeamsIndex = state.allTeams.findIndex(
                    (team) => team.team_id === teamId
                );

                const updatedAllTeams = allTeamsIndex !== -1
                    ? [
                        ...state.allTeams.slice(0, allTeamsIndex),
                        updatedTeamData,
                        ...state.allTeams.slice(allTeamsIndex + 1)
                    ]
                    : state.allTeams;

                return {
                    events: updatedEvents,
                    allTeams: updatedAllTeams
                };
            }),

            // Delete a team from an event
            deleteEventTeam: (eventId, teamId) => set((state) => {
                const eventIndex = state.events.findIndex(
                    (event) => event.event_id === eventId
                );

                if (eventIndex === -1) {
                    return state;
                }

                const updatedEvents = [...state.events];
                updatedEvents[eventIndex] = {
                    ...updatedEvents[eventIndex],
                    teams: updatedEvents[eventIndex].teams.filter(
                        (team) => team.team_id !== teamId
                    ),
                    updated_at: new Date().toISOString()
                };

                // Remove from allTeams as well
                const updatedAllTeams = state.allTeams.filter(
                    (team) => team.team_id !== teamId
                );

                return {
                    events: updatedEvents,
                    allTeams: updatedAllTeams
                };
            }),

            getEventById: (eventId) => {
                const state = get();
                return state.events.find((event) => event.event_id === eventId);
            },

            getEventTeams: (eventId) => {
                const state = get();
                const event = state.events.find((event) => event.event_id === eventId);
                return event ? event.teams : [];
            },

            // Get a specific team by teamId (useful for preview/edit)
            getTeamById: (teamId) => {
                const state = get();
                return state.allTeams.find((team) => team.team_id === teamId);
            },

            removeEvent: (eventId) => set((state) => {
                // Remove event and all its teams from allTeams
                const event = state.events.find(e => e.event_id === eventId);
                const teamIdsToRemove = event ? event.teams.map(t => t.team_id) : [];

                return {
                    events: state.events.filter((event) => event.event_id !== eventId),
                    allTeams: state.allTeams.filter(
                        (team) => !teamIdsToRemove.includes(team.team_id)
                    )
                };
            }),

            clearEvents: () => set({ events: [], allTeams: [] }),
        }),
        {
            name: 'event-storage', // LocalStorage key
        }
    )
);

export default useEventStore;