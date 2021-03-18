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

function getDefaultLabels(){
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
            "id": "a101",
            "title": "Changed Color",
            "createdAt": 154514,
            "byMember": {
                "_id": "u101",
                "fullname": "Abi Abambi",
                "imgUrl": "http://some-img"
            },
            "task": {
                "id": "c101",
                "title": "Replace Logo"
            }
        }]
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
            "id": "a101",
            "title": "Changed Color",
            "createdAt": 154514,
            "byMember": {
                "_id": "u101",
                "fullname": "Abi Abambi",
                "imgUrl": "http://some-img"
            },
            "task": {
                "id": "c101",
                "title": "Replace Logo"
            }
        }]
    }
]

function getBoards() {
    var boards = JSON.parse(localStorage.getItem('boards')) 
    if (!boards || !boards.length){
        console.log('loaded initial db');
    boards = boardsDB;
    _save('boards', boardsDB)
}
    return Promise.resolve(boards)
}
getBoards()
