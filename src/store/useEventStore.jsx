import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useEventStore = create(
    persist(
        (set, get) => ({
            events: [], 

            setEvents: (events) => set({ events }),
            saveEventTeam: (eventId, teamData) => set((state) => {
                const existingEventIndex = state.events.findIndex(
                    (event) => event.event_id === eventId
                );

                if (existingEventIndex !== -1) {
                    const updatedEvents = [...state.events];
                    updatedEvents[existingEventIndex] = {
                        event_id: eventId,
                        teams: [...updatedEvents[existingEventIndex].teams, teamData],
                        updated_at: new Date().toISOString()
                    };
                    return { events: updatedEvents };
                } else {
                    return {
                        events: [
                            ...state.events,
                            {
                                event_id: eventId,
                                teams: [teamData],
                                created_at: new Date().toISOString()
                            }
                        ]
                    };
                }
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

        
            removeEvent: (eventId) => set((state) => ({
                events: state.events.filter((event) => event.event_id !== eventId)
            })),

          
            clearEvents: () => set({ events: [] }),
        }),
        {
            name: 'event-storage', // LocalStorage key
        }
    )
);

export default useEventStore;