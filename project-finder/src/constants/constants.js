import io from "socket.io-client";

export const URL = {
    API_SIGNIN: 'https://project-finder-api.herokuapp.com/users/signin',
    API_REGISTER: 'https://project-finder-api.herokuapp.com/users/register',
    API_LOGOUT: 'https://project-finder-api.herokuapp.com/users/logout',
    API_PROJECT: 'https://project-finder-api.herokuapp.com/project',
    API_ADD_PROJECT: 'https://project-finder-api.herokuapp.com/project/addProject',
    API_PROJECT_COUNT: 'https://project-finder-api.herokuapp.com/project/count',
    API_PROJECT_USER: 'https://project-finder-api.herokuapp.com/project/projectsFromUser',
    API_CHAT_MESSAGES: 'https://project-finder-api.herokuapp.com/chat',
    API_PROJECT_MEMBERS: 'https://project-finder-api.herokuapp.com/project/projectMembers',
    API_PROJECT_APPLY: 'https://project-finder-api.herokuapp.com/project/apply',
    API_CHAT_LAST_MESSAGES: 'https://project-finder-api.herokuapp.com/chat/lastMessage',
    API_PROJECT_APPLIED: 'https://project-finder-api.herokuapp.com/users/projectApplied',
    API_PROJECT_REQUEST: 'https://project-finder-api.herokuapp.com/users/projectRequest',
    API_USER_TO_PROJECT: 'https://project-finder-api.herokuapp.com/users/acceptRequest',
    API_DECLINE_REQUEST: 'https://project-finder-api.herokuapp.com/users/declineRequest',
    API_MAIL: 'https://project-finder-api.herokuapp.com/email'
}

export const OPTIONS = {
    SIZE: [{ key: 'Small', value: 'Small', text: 'Small' }, { key: 'Medium', value: 'Medium', text: 'Medium' }, { key: 'Large', value: 'Large', text: 'Large' }],
    CATEGORY: [{ key: 'Web Application', value: 'Web Application', text: 'Web Application' }, { key: 'Mobile Application', value: 'Mobile Application', text: 'Mobile Application' }, { key: 'Others', value: 'Others', text: 'Others' }],
    DURATION: [{ key: '1', value: '1', text: '1 Month' }, { key: '2', value: '3', text: '3 Month' }, { key: '3', value: '6', text: '6 Month' }, { key: '4', value: '12', text: '12 Month' }],
    MEMBERS: [{ key: '1', value: '1', text: '1 Member' }, { key: '2', value: '2', text: '2 Members' }, { key: '3', value: '3', text: '3 Members' }, { key: '4', value: '4', text: '4 Members' }, { key: '5', value: '5', text: '5 Members' }, { key: '6', value: '6', text: '6 Members' }, { key: '7', value: '7', text: '7 Members' }, { key: '8', value: '8', text: '8 Members' }, { key: '9', value: '9', text: '9 Members' }, { key: '10', value: '10', text: '10 Members' }]
}


export const MARKS_MEBMERS = [
    {
        value: 0,
        label: 'All',
    },
    {
        value: 10,
        label: '1',
    },
    {
        value: 20,
        label: '2',
    },
    {
        value: 30,
        label: '3',
    },
    {
        value: 40,
        label: '4',
    },
    {
        value: 50,
        label: '5',
    },
    {
        value: 60,
        label: '6',
    },
    {
        value: 70,
        label: '7',
    },
    {
        value: 80,
        label: '8',
    },
    {
        value: 90,
        label: '9',
    },
    {
        value: 100,
        label: '10',
    }
]

export const MARKS_DURATION = [
    {
        value: 0,
        label: 'All',
    },
    {
        value: 25,
        label: '1 Month',
    },
    {
        value: 50,
        label: '3 Month',
    },
    {
        value: 75,
        label: '6 Month',
    },
    {
        value: 100,
        label: '12 Month',
    }
]

export const ENDPOINT = 'https://project-finder-api.herokuapp.com';

export let notifySocket = io(ENDPOINT);