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

const boardsDB = [

    {
        "title": "Trellworks development",
        "createdAt": 1616273668853,
        "labels": [
            {
                "title": "done!!!",
                "color": "#61bd4f",
                "colorName": "green",
                "id": "l101"
            },
            {
                "title": "",
                "color": "#f2d600",
                "colorName": "yellow",
                "id": "l102"
            },
            {
                "title": "",
                "color": "#ff9f1a",
                "colorName": "orange",
                "id": "l103"
            },
            {
                "title": "",
                "color": "#eb5a46",
                "colorName": "red",
                "id": "l104"
            },
            {
                "title": "",
                "color": "#c377e0",
                "colorName": "purple",
                "id": "l105"
            },
            {
                "title": "",
                "color": "#0079bf",
                "colorName": "blue",
                "id": "l106"
            }
        ],
        "styles": {
            "backgroundColor": "#61bd4f"
        },
        "groups": [
            {
                "id": "uqfMo",
                "style": {},
                "title": "Front-end",
                "task": [
                    {
                        "id": "yExk0",
                        "title": "add more activity-logs",
                        "labelIds": [],
                        "description": "needs more activity logs.",
                        "checklists": [],
                        "members": [
                            {
                                "_id": "u103",
                                "fullname": "Gali Nickel",
                                "imgUrl": "https://www.google.com"
                            },
                            {
                                "_id": "u102",
                                "fullname": "Almog Lemberg",
                                "imgUrl": "https://www.google.com"
                            }
                        ]
                    },
                    {
                        "id": "puKP0",
                        "title": "Make dashboard component",
                        "labelIds": [],
                        "description": "",
                        "checklists": [],
                        "members": []
                    },
                    {
                        "id": "Em6SY",
                        "title": "implement user support",
                        "labelIds": [
                            "l104",
                            "l105"
                        ],
                        "description": "",
                        "checklists": [],
                        "members": []
                    }
                ]
            },
            {
                "id": "U3SKt",
                "style": {},
                "title": "back end",
                "task": [
                    {
                        "id": "nnig0",
                        "title": "change local storage service with HTTP service",
                        "labelIds": [
                            "l106"
                        ],
                        "description": "",
                        "checklists": [],
                        "members": []
                    },
                    {
                        "id": "Ww7uG",
                        "title": "set up mongoDB",
                        "labelIds": [
                            "l102",
                            "l103"
                        ],
                        "description": "",
                        "checklists": [],
                        "members": [
                            {
                                "_id": "u101",
                                "fullname": "Guy Zohar",
                                "imgUrl": "https://www.google.com"
                            }
                        ]
                    },
                    {
                        "id": "gcKuC",
                        "title": "prepare test-data",
                        "labelIds": [],
                        "description": "",
                        "checklists": [],
                        "members": [
                            {
                                "_id": "u102",
                                "fullname": "Almog Lemberg",
                                "imgUrl": "https://www.google.com"
                            }
                        ]
                    }
                ]
            },
            {
                "id": "YmIP0",
                "style": {},
                "title": "done!",
                "task": [
                    {
                        "id": "BzJuY",
                        "title": "animate main menu",
                        "labelIds": [
                            "l101"
                        ],
                        "description": "",
                        "checklists": [],
                        "members": [
                            {
                                "_id": "u103",
                                "fullname": "Gali Nickel",
                                "imgUrl": "https://www.google.com"
                            }
                        ]
                    },
                    {
                        "id": "0GqS8",
                        "title": "lay out design basics",
                        "labelIds": [
                            "l101"
                        ],
                        "description": "",
                        "checklists": [],
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
                            }
                        ]
                    },
                    {
                        "id": "vob1b",
                        "title": "decide on a logo font",
                        "labelIds": [
                            "l101"
                        ],
                        "description": "",
                        "checklists": [],
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
                            }
                        ]
                    }
                ]
            }
        ],
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
            }
        ],
        "activities": [
            {
                "byMember": {
                    "fullname": "Guest"
                },
                "title": "added the task",
                "createdAt": 1616273986937,
                "group": "done!",
                "id": "PnxXf",
                "task": {
                    "id": "vob1b",
                    "title": "decide on a logo font"
                }
            },
            {
                "byMember": {
                    "fullname": "Guest"
                },
                "title": "removed the group",
                "createdAt": 1616273973264,
                "group": "My new list",
                "id": "zOAb2",
                "task": {
                    "id": "",
                    "title": ""
                }
            },
            {
                "byMember": {
                    "fullname": "Guest"
                },
                "title": "added the group",
                "createdAt": 1616273972069,
                "group": "My new list",
                "id": "JabYx",
                "task": {
                    "id": "",
                    "title": ""
                }
            },
            {
                "byMember": {
                    "fullname": "Guest"
                },
                "title": "added the task",
                "createdAt": 1616273961480,
                "group": "Front-end",
                "id": "4ASp9",
                "task": {
                    "id": "Em6SY",
                    "title": "implement user support"
                }
            },
            {
                "byMember": {
                    "fullname": "Guest"
                },
                "title": "added the task",
                "createdAt": 1616273956629,
                "group": "back end",
                "id": "kOJhs",
                "task": {
                    "id": "gcKuC",
                    "title": "prepare test-data"
                }
            },
            {
                "byMember": {
                    "fullname": "Guest"
                },
                "title": "added the task",
                "createdAt": 1616273945620,
                "group": "done!",
                "id": "7smVg",
                "task": {
                    "id": "0GqS8",
                    "title": "lay out design basics"
                }
            },
            {
                "byMember": {
                    "fullname": "Guest"
                },
                "title": "removed the group",
                "createdAt": 1616273938958,
                "group": "My new list",
                "id": "Q1ZGu",
                "task": {
                    "id": "",
                    "title": ""
                }
            },
            {
                "byMember": {
                    "fullname": "Guest"
                },
                "title": "added the group",
                "createdAt": 1616273936882,
                "group": "My new list",
                "id": "nAEZm",
                "task": {
                    "id": "",
                    "title": ""
                }
            },
            {
                "byMember": {
                    "fullname": "Guest"
                },
                "title": "removed the group",
                "createdAt": 1616273917962,
                "group": "My new list",
                "id": "yinXB",
                "task": {
                    "id": "",
                    "title": ""
                }
            },
            {
                "byMember": {
                    "fullname": "Guest"
                },
                "title": "added the group",
                "createdAt": 1616273913729,
                "group": "My new list",
                "id": "g8sYN",
                "task": {
                    "id": "",
                    "title": ""
                }
            },
            {
                "byMember": {
                    "fullname": "Guest"
                },
                "title": "added the task",
                "createdAt": 1616273909558,
                "group": "done!",
                "id": "L44JZ",
                "task": {
                    "id": "BzJuY",
                    "title": "animate main menu"
                }
            },
            {
                "byMember": {
                    "fullname": "Guest"
                },
                "title": "renamed a group",
                "createdAt": 1616273905205,
                "group": "done!",
                "id": "raR5o",
                "task": {
                    "id": "",
                    "title": ""
                }
            },
            {
                "byMember": {
                    "fullname": "Guest"
                },
                "title": "added the group",
                "createdAt": 1616273902490,
                "group": "My new list",
                "id": "6eZiv",
                "task": {
                    "id": "",
                    "title": ""
                }
            },
            {
                "byMember": {
                    "fullname": "Guest"
                },
                "title": "added the task",
                "createdAt": 1616273901146,
                "group": "back end",
                "id": "5S04o",
                "task": {
                    "id": "Ww7uG",
                    "title": "set up mongoDB"
                }
            },
            {
                "byMember": {
                    "fullname": "Guest"
                },
                "title": "added the task",
                "createdAt": 1616273896627,
                "group": "back end",
                "id": "CFjMi",
                "task": {
                    "id": "nnig0",
                    "title": "change local storage service with HTTP service"
                }
            },
            {
                "byMember": {
                    "fullname": "Guest"
                },
                "title": "renamed a group",
                "createdAt": 1616273884636,
                "group": "back end",
                "id": "TenRx",
                "task": {
                    "id": "",
                    "title": ""
                }
            },
            {
                "byMember": {
                    "fullname": "Guest"
                },
                "title": "added the group",
                "createdAt": 1616273882049,
                "group": "My new list",
                "id": "hfAEE",
                "task": {
                    "id": "",
                    "title": ""
                }
            },
            {
                "byMember": {
                    "fullname": "Guest"
                },
                "title": "added the task",
                "createdAt": 1616273881243,
                "group": "Front-end",
                "id": "krGMO",
                "task": {
                    "id": "puKP0",
                    "title": "Make dashboard component"
                }
            },
            {
                "byMember": {
                    "fullname": "Guest"
                },
                "title": "changed the description",
                "createdAt": 1616273813769,
                "group": "Front-end",
                "id": "cDdHh",
                "task": {
                    "id": "yExk0",
                    "title": "add more activity-logs"
                }
            },
            {
                "byMember": {
                    "fullname": "Guest"
                },
                "title": "added the task",
                "createdAt": 1616273798044,
                "group": "Front-end",
                "id": "C8KoJ",
                "task": {
                    "id": "yExk0",
                    "title": "add more activity-logs"
                }
            },
            {
                "byMember": {
                    "fullname": "Guest"
                },
                "title": "renamed a group",
                "createdAt": 1616273773980,
                "group": "Front-end",
                "id": "l1EOq",
                "task": {
                    "id": "",
                    "title": ""
                }
            },
            {
                "byMember": {
                    "fullname": "Guest"
                },
                "title": "added the group",
                "createdAt": 1616273764012,
                "group": "My new list",
                "id": "G9LbQ",
                "task": {
                    "id": "",
                    "title": ""
                }
            },
            {
                "byMember": {
                    "fullname": "Guest"
                },
                "title": "changed this board`s name",
                "createdAt": 1616273677484,
                "id": "YsKX3",
                "task": {
                    "id": "",
                    "title": ""
                }
            },
            {
                "id": "DEzGT",
                "title": "This board was created",
                "byMember": {
                    "fullname": "Guest"
                },
                "task": {
                    "id": "",
                    "title": ""
                }
            }
        ],
        "_id": "YhJ2l"
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
