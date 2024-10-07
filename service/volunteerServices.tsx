export interface VolunteerRequestint {
    timestamp: string; // ISO string format for the timestamp
    username: string; // The name of the user volunteering
    location: string;
    volunteer?: boolean;
}
export interface isVolunteeredint {
    timestamp: string,
    username: string
}
export  interface feedingDoneRequestint {
    timestamp: string,
    username: string,
}
interface VolunteerResponseData {
    message?: string; // Optional message providing additional context
    timestamp: string; // The timestamp of when the request was processed
    location: string; // name of the volunteered location
    username: string; // The username of the volunteer
}
interface VolunteerResponse {
    status: 'accepted' | 'declined';
    data: VolunteerResponseData;
}
interface feedingDoneResponse {
    status: 'accepted' | 'declined';
}
export const volunteerRequest = async ({ timestamp, username, location, volunteer}: VolunteerRequestint): Promise<VolunteerResponse> => {
    // Simulate a network request with a delay
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate 2 second delay

    const isAccepted = "accepted";
    if(volunteer){
        // Randomly decide to accept or decline the request
        const isAccepted = Math.random() > 0.5; // 50% chance to accept
    }

    return {
        status: isAccepted ? "accepted" : "declined",
        data: {
            message: isAccepted ? "Thank you for volunteering!" : "Your request has been declined.",
            timestamp: new Date().toISOString(),
            location,
            username,
        }
    };
};
export const isVolunteered = async({username, timestamp}: isVolunteeredint): Promise<VolunteerResponse> => {
    return {
        status: "accepted",
        data: {
            message: "Thank you for volunteering!",
            timestamp: new Date().toISOString(),
            location: "Üniyurt - Makine",
            username: username
        }
    }
}
export const feedingDoneRequest = async({username, timestamp}: feedingDoneRequestint): Promise<feedingDoneResponse> => {
    return {
        status: "accepted",
    }
}