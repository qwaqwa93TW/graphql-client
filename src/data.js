export const argData = [
    { value: 'c_mission', args: { id: null, name: null, c_temp1: null, c_temp2: null } },
    { value: 'u_mission', args: { id: null, name: null, c_temp1: null, c_temp2: null } },
    { value: 'd_mission', args: { id: null, name: null, c_temp1: null, c_temp2: null } },
];

export const treeData = [
    // query, mutation, subscription
    { id: 'query', pId: null, value: 'query', title: 'query', selectable: false },
    { id: 'mutation', pId: null, value: 'mutation', title: 'mutation', selectable: false },
    { id: 'subscription', pId: null, value: 'subscription', title: 'subscription', selectable: false },

    // query children
    { id: 'q_workspace', pId: 'query', value: 'q_workspace', title: 'workspace' },
    { id: 'q_roadmap', pId: 'query', value: 'q_roadmap', title: 'roadmap' },
    { id: 'q_robot', pId: 'query', value: 'q_robot', title: 'robot' },
    { id: 'q_misstion', pId: 'query', value: 'q_mission', title: 'misstion' },

    // mutation children
    { id: 'm_mission', pId: 'mutation', value: 'm_mission', title: 'mission', selectable: false },
    { id: 'm_robot', pId: 'mutation', value: 'm_robot', title: 'robot', selectable: false },
    { id: 'm_edge', pId: 'mutation', value: 'm_edge', title: 'edge', selectable: false },
    { id: 'm_node', pId: 'mutation', value: 'm_node', title: 'node', selectable: false },

    // subscription children
    { id: 's_robot', pId: 'subscription', value: 's_robot', title: 'robot' },
    { id: 'misstion', pId: 'subscription', value: 's-misstion', title: 'mission' },

    // mission mutation create, update, delete
    { id: 'c_mission', pId: 'm_mission', value: 'c_mission', title: 'create' },
    { id: 'u_mission', pId: 'm_mission', value: 'u_mission', title: 'update' },
    { id: 'd_mission', pId: 'm_mission', value: 'd_mission', title: 'delete' },

    // robot mutation create, update, delete
    { id: 'c_robot', pId: 'm_robot', value: 'c_robot', title: 'create' },
    { id: 'u_robot', pId: 'm_robot', value: 'u_robot', title: 'update' },
    { id: 'd_robot', pId: 'm_robot', value: 'd_robot', title: 'delete' },

    // edge mutation create, update, delete
    { id: 'c_edge', pId: 'm_edge', value: 'c_edge', title: 'create' },
    { id: 'u_edge', pId: 'm_edge', value: 'u_edge', title: 'update' },
    { id: 'd_edge', pId: 'm_edge', value: 'd_edge', title: 'delete' },

    // node mutation create, update, delete
    { id: 'c_node', pId: 'm_node', value: 'c_node', title: 'create' },
    { id: 'u_node', pId: 'm_node', value: 'u_node', title: 'update' },
    { id: 'd_node', pId: 'm_node', value: 'd_node', title: 'delete' },
];