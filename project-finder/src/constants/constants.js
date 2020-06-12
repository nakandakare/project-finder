export const URL = {
    API_SIGNIN: 'http://localhost:2500/users/signin',
    API_REGISTER: 'http://localhost:2500/users/register',
    API_LOGOUT: 'http://localhost:2500/users/logout',
    API_PROJECT: 'http://localhost:2500/project',
    API_ADD_PROJECT: 'http://localhost:2500/project/addProject',
    API_PROJECT_COUNT: 'http://localhost:2500/project/count',
    API_PROJECT_USER: 'http://localhost:2500/project/projectsFromUser',
    API_CHAT_MESSAGES: 'http://localhost:2500/chat',
    API_PROJECT_MEMBERS: 'http://localhost:2500/project/projectMembers',
    API_PROJECT_APPLY: 'http://localhost:2500/project/apply',
    API_CHAT_LAST_MESSAGES: 'http://localhost:2500/chat/lastMessage',
    API_PROJECT_APPLIED: 'http://localhost:2500/users/projectApplied',
    API_PROJECT_REQUEST: 'http://localhost:2500/users/projectRequest',
    API_USER_TO_PROJECT: 'http://localhost:2500/project/userToProject',
    API_DECLINE_REQUEST: 'http://localhost:2500/users/declineRequest'
}

export const OPTIONS = {
    SIZE: [{ key: 'Small', value: 'Small', text: 'Small' }, { key: 'Medium', value: 'Medium', text: 'Medium' }, { key: 'Large', value: 'Large', text: 'Large' }],
    CATEGORY: [{ key: 'Web Application', value: 'Web Application', text: 'Web Application' }, { key: 'Mobile Application', value: 'Mobile Application', text: 'Mobile Application' }, { key: 'Others', value: 'Others', text: 'Others' }],
    DURATION: [{ key: '1', value: '1', text: '1 Month' }, { key: '2', value: '3', text: '3 Month' }, { key: '3', value: '6', text: '6 Month' }, { key: '4', value: '12', text: '12 Month' }]
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