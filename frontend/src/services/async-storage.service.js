export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

function query(entityType) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return Promise.resolve(entities)
}


function get(entityType, entityId) {
    return query(entityType)
        .then(entities =>
            entities.find(entity => entity._id === entityId))
}

function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}

function postMany(entityType, newEntities) {
    return query(entityType)
        .then(entities => {
            newEntities = newEntities.map(entity => ({
                ...entity,
                _id: _makeId()
            }))
            entities.push(...newEntities)
            _save(entityType, entities)
            return newEntity
        })
}



function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}


function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function getDefaultLabels() {
    const defaultColors = ['#61bd4f', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0', '#0079bf']
    return defaultColors.map(color => {
        return getEmptyLabel(color)
    })
}

const boardsDB = [{
    "_id": "b101",
    "title": "Robot dev proj",
    "createdAt": 1589983468418,
    "createdBy": {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "imgUrl": "http://some-img"
    },
    "style": {},
    "labels": [
        {
            id: 'l101',
            title: '',
            color: '#61bd4f'
        },
        {
            id: 'l102',
            title: '',
            color: '#f2d600'
        },
        {
            id: 'l103',
            title: '',
            color: '#ff9f1a'
        },
        {
            id: 'l104',
            title: '',
            color: '#eb5a46'
        },
        {
            id: 'l105',
            title: '',
            color: '#c377e0'
        },
        {
            id: 'l106',
            title: '',
            color: '#0079bf'
        }
    ],
    "members": [{
        "_id": "u101",
        "fullname": "Tal Tarablus",
        "imgUrl": "https://www.google.com"
    }],
    "groups": [{
        "id": "g101",
        "title": "list 1",
        "task": [{
            "id": "c101",
            "title": "Replace logo",
            "labelIds": []
        },
        {
            "id": "c102",
            "title": "Add Samples",
            "labelIds": ["l101", "l102"]
        }
        ],
        "style": {}
    },
    {
        "id": "g102",
        "title": "list 2",
        "task": [{
            "id": "c103",
            "title": "Do that",
            "labelIds": ["l103", "l104"]
        },
        {
            "id": "c104",
            "title": "Help me",
            "description": "description",
            "comments": [{
                "id": "ZdPnm",
                "txt": "also @yaronb please CR this",
                "createdAt": 1590999817436.0,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Tal Tarablus",
                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                }
            }],
            "checklists": [{
                "id": "YEhmF",
                "title": "Checklist",
                "todos": [{
                    "id": "212jX",
                    "title": "To Do 1",
                    "isDone": false
                }]
            }],
            "members": [{
                "_id": "u101",
                "username": "Tal",
                "fullname": "Tal Tarablus",
                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            }],
            "labelIds": [],
            "createdAt": 1590999730348,
            "dueDate": 16156215211,
            "byMember": {
                "_id": "u101",
                "username": "Tal",
                "fullname": "Tal Tarablus",
                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "style": {
                "bgColor": "#26de81"
            }
        }
        ],
        "style": {}
    }
    ],
    "activities": [{
        byMember: { fullname: "Guest" },
        createdAt: "2021-03-19T10:24:07.695Z",
        group: "list 2",
        id: "yIblp",
        task: { id: "PTbnQ", title: "Test task" },
        title: "added the task"
    },
    {
        byMember: { fullname: "Guest" },
        createdAt: "2021-03-19T10:25:10.956Z",
        group: "My new list",
        id: "1NFLT",
        task: {},
        title: "added the group"
    },
    {
        byMember: { fullname: "Guest" },
        createdAt: "2021-03-19T10:41:00.555Z",
        group: "My new list",
        id: "Vr0Y4",
        task: {},
        title: "added the group"
    },
    {
        byMember: { fullname: "Guest" },
        createdAt: "2021-03-19T10:41:02.921Z",
        group: "My new list",
        id: "68Z5V",
        task: {},
        title: "added the group",
    },
    {
        byMember: { fullname: "Guest" },
        createdAt: "2021-03-19T10:41:18.200Z",
        group: "My new list",
        id: "Gug1T",
        task: { id: "hwe7X", title: "Change label description" },
        title: "added the task"
    },
    {
        byMember: { fullname: "Guest" },
        createdAt: "2021-03-19T10:42:04.397Z",
        group: "list 1",
        id: "0qwBa",
        task: {},
        title: "removed the group"
    }
    ]
},
{
    "_id": "b102",
    "title": "Sprint 4 Trellworks",
    "createdAt": 1589983468418,
    "createdBy": {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "imgUrl": "http://some-img"
    },
    "style": {},
    "labels": [{
        "id": "l101",
        "title": "Done",
        "color": "#61bd4f"
    }],
    "members": [
        {
            "_id": "u102",
            "fullname": "Almog Lemberg",
            "imgUrl": "https://www.google.com"
        },
        {
            "_id": "u103",
            "fullname": "Gali Nickel",
            "imgUrl": "https://www.google.com"
        },
        {
            "_id": "u101",
            "fullname": "Guy Zohar",
            "imgUrl": "https://www.google.com"
        }],
    "groups": [{
        "id": "g101",
        "title": "list 1",
        "task": [{
            "id": "c101",
            "title": "Replace logo",
            "labelIds": []
        },
        {
            "id": "c102",
            "title": "Add Samples",
            "labelIds": []
        }
        ],
        "style": {}
    },
    {
        "id": "g102",
        "title": "list 2",
        "task": [{
            "id": "c103",
            "title": "Do that",
            "labelIds": []
        },
        {
            "id": "c104",
            "title": "Help me",
            "description": "description",
            "comments": [{
                "id": "ZdPnm",
                "txt": "also @yaronb please CR this",
                "createdAt": 1590999817436.0,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Tal Tarablus",
                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                }
            }],
            "checklists": [{
                "id": "YEhmF",
                "title": "Checklist",
                "todos": [{
                    "id": "212jX",
                    "title": "To Do 1",
                    "isDone": false
                }]
            }],
            "members": [{
                "_id": "u101",
                "username": "Tal",
                "fullname": "Tal Tarablus",
                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            }],
            "labelIds": [],
            "createdAt": 1590999730348,
            "dueDate": 16156215211,
            "byMember": {
                "_id": "u101",
                "username": "Tal",
                "fullname": "Tal Tarablus",
                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "style": {
                "bgColor": "#26de81"
            }
        }
        ],
        "style": {}
    }
    ],
    "activities": [{
        byMember: { fullname: "Guest" },
        createdAt: "2021-03-19T10:24:07.695Z",
        group: "list 2",
        id: "yIblp",
        task: { id: "PTbnQ", title: "Test task" },
        title: "added the task"
    },
    {
        byMember: { fullname: "Guest" },
        createdAt: "2021-03-19T10:25:10.956Z",
        group: "My new list",
        id: "1NFLT",
        task: {},
        title: "added the group"
    },
    {
        byMember: { fullname: "Guest" },
        createdAt: "2021-03-19T10:41:00.555Z",
        group: "My new list",
        id: "Vr0Y4",
        task: {},
        title: "added the group"
    },
    {
        byMember: { fullname: "Guest" },
        createdAt: "2021-03-19T10:41:02.921Z",
        group: "My new list",
        id: "68Z5V",
        task: {},
        title: "added the group",
    },
    {
        byMember: { fullname: "Guest" },
        createdAt: "2021-03-19T10:41:18.200Z",
        group: "My new list",
        id: "Gug1T",
        task: { id: "hwe7X", title: "Change label description" },
        title: "added the task"
    },
    {
        byMember: { fullname: "Guest" },
        createdAt: "2021-03-19T10:42:04.397Z",
        group: "list 1",
        id: "0qwBa",
        task: {},
        title: "removed the group"
    }
    ]
}
]

function getBoards() {
    var boards = JSON.parse(localStorage.getItem('boards'))
    if (!boards || !boards.length) {
        console.log('loaded initial db');
        boards = boardsDB;
        _save('boards', boardsDB)
    }
    return Promise.resolve(boards)
}
getBoards()
