export const URL = { 
    API_SIGNIN: 'http://localhost:2500/users/signin',
    API_REGISTER: 'http://localhost:2500/users/register',
    API_LOGOUT: 'http://localhost:2500/users/logout',
    API_PROJECT: 'http://localhost:2500/project'
} 

export const OPTIONS = {
    SIZE: [{ key: 'Small', value: 'Small', text: 'Small' }, { key: 'Medium', value: 'Medium', text: 'Medium' }, { key: 'Large', value: 'Large', text: 'Large' }],
    DIFFICULTY: [{ key: 'Easy', value: 'Easy', text: 'Easy' }, { key: 'Normal', value: 'Normal', text: 'Normal' }, { key: 'Complex', value: 'Complex', text: 'Complex' }],
    MEMBERS: [{ key: 'OneToFive', value: '1-5', text: '1-5 members' }, { key: 'FiveToTen', value: '5-10', text: '5-10 members' }, { key: 'TenToFifteen', value: '10-15', text: '10-15 members' }]
}