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
    "title": "Trellworks progress",
    "createdAt": 1616261612006,
    "labels": [
      {
        "title": "",
        "color": "#61bd4f",
        "colorName": "green"
      },
      {
        "title": "",
        "color": "#f2d600",
        "colorName": "yellow"
      },
      {
        "title": "",
        "color": "#ff9f1a",
        "colorName": "orange"
      },
      {
        "title": "",
        "color": "#eb5a46",
        "colorName": "red"
      },
      {
        "title": "",
        "color": "#c377e0",
        "colorName": "purple"
      },
      {
        "title": "",
        "color": "#0079bf",
        "colorName": "blue"
      }
    ],
    "groups": [
      {
        "id": "bkubm",
        "style": {},
        "title": "Frontend",
        "task": [
          {
            "id": "CNJ7e",
            "title": "add more activity logs",
            "labelIds": [],
            "description": "",
            "checklists": [],
            "members": []
          },
          {
            "id": "eflQk",
            "title": "add quick-menu for tasks\n",
            "labelIds": [],
            "description": "",
            "checklists": [],
            "members": []
          }
        ]
      },
      {
        "id": "Bl57w",
        "style": {},
        "title": "Backend",
        "task": [
          {
            "id": "bC6yp",
            "title": "implement HTTP server",
            "labelIds": [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null
            ],
            "description": "",
            "checklists": [],
            "members": []
          }
        ]
      },
      {
        "id": "43s9G",
        "style": {},
        "title": "Design",
        "task": [
          {
            "id": "9q8lZ",
            "title": "add padding to buttons",
            "labelIds": [
              null
            ],
            "description": "",
            "checklists": [],
            "members": []
          }
        ]
      },
      {
        "id": "IdiwC",
        "style": {},
        "title": "Done",
        "task": [
          {
            "id": "pXulq",
            "title": "Animate menu ",
            "labelIds": [],
            "description": "",
            "checklists": [],
            "members": []
          },
          {
            "id": "rCLhY",
            "title": "Change page font",
            "labelIds": [],
            "description": "",
            "checklists": [],
            "members": []
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
        }],    "activities": [
      {
        "byMember": {
          "fullname": "Guest"
        },
        "title": "added the task",
        "createdAt": 1616267511292,
        "group": "Frontend",
        "id": "yEKN7",
        "task": {
          "id": "eflQk",
          "title": "add quick-menu for tasks\n"
        }
      },
      {
        "byMember": {
          "fullname": "Guest"
        },
        "title": "added the task",
        "createdAt": 1616267477907,
        "group": "Frontend",
        "id": "V2htL",
        "task": {
          "id": "CNJ7e",
          "title": "add more activity logs"
        }
      },
      {
        "byMember": {
          "fullname": "Guest"
        },
        "title": "added the task",
        "createdAt": 1616267469195,
        "group": "Backend",
        "id": "AGZ6R",
        "task": {
          "id": "bC6yp",
          "title": "implement HTTP server"
        }
      },
      {
        "byMember": {
          "fullname": "Guest"
        },
        "title": "added the task",
        "createdAt": 1616267461813,
        "group": "Design",
        "id": "3wJxr",
        "task": {
          "id": "9q8lZ",
          "title": "add padding to buttons"
        }
      },
      {
        "byMember": {
          "fullname": "Guest"
        },
        "title": "added the task",
        "createdAt": 1616267410136,
        "group": "Done",
        "id": "HpWq8",
        "task": {
          "id": "rCLhY",
          "title": "Change page font"
        }
      },
      {
        "byMember": {
          "fullname": "Guest"
        },
        "title": "added the task",
        "createdAt": 1616267396958,
        "group": "Done",
        "id": "zcl85",
        "task": {
          "id": "pXulq",
          "title": "Animate menu "
        }
      },
      {
        "byMember": {
          "fullname": "Guest"
        },
        "title": "renamed a group",
        "createdAt": 1616267384392,
        "group": "Done",
        "id": "ve25N",
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
        "createdAt": 1616267382286,
        "group": "My new list",
        "id": "OK5jL",
        "task": {
          "id": "",
          "title": ""
        }
      },
      {
        "byMember": {
          "fullname": "Guest"
        },
        "title": "renamed a group",
        "createdAt": 1616267382245,
        "group": "Design",
        "id": "pL8cP",
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
        "createdAt": 1616267379306,
        "group": "My new list",
        "id": "HCaY2",
        "task": {
          "id": "",
          "title": ""
        }
      },
      {
        "byMember": {
          "fullname": "Guest"
        },
        "title": "renamed a group",
        "createdAt": 1616267379245,
        "group": "Backend",
        "id": "dz02i",
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
        "createdAt": 1616267376160,
        "group": "My new list",
        "id": "UjocG",
        "task": {
          "id": "",
          "title": ""
        }
      },
      {
        "byMember": {
          "fullname": "Guest"
        },
        "title": "renamed a group",
        "createdAt": 1616267374769,
        "group": "Frontend",
        "id": "bjwzm",
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
        "createdAt": 1616267369795,
        "group": "My new list",
        "id": "LPc92",
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
        "createdAt": 1616267368331,
        "id": "dfUWG",
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
        "createdAt": 1616267355768,
        "group": "My new list564654",
        "id": "7hJhe",
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
        "createdAt": 1616261622448,
        "group": "My new list564654",
        "id": "kRraF",
        "task": {
          "id": "E67Wy",
          "title": "shalom almog"
        }
      },
      {
        "byMember": {
          "fullname": "Guest"
        },
        "title": "renamed a group",
        "createdAt": 1616261618546,
        "group": "My new list564654",
        "id": "QvfeK",
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
        "createdAt": 1616261617123,
        "group": "My new list",
        "id": "wzuR5",
        "task": {
          "id": "",
          "title": ""
        }
      },
      {
        "id": "eXIp0",
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
    "_id": "0n6fP"
  },{
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
            color: '#61bd4f',
            colorName: 'green'
        },
        {
            id: 'l102',
            title: '',
            color: '#f2d600',
            colorName: 'yellow'
        },
        {
            id: 'l103',
            title: '',
            color: '#ff9f1a',
            colorName: 'orange'
        },
        {
            id: 'l104',
            title: '',
            color: '#eb5a46',
            colorName: 'red'
        },
        {
            id: 'l105',
            title: '',
            color: '#c377e0',
            colorName: 'purple'
        },
        {
            id: 'l106',
            title: '',
            color: '#0079bf',
            colorName: 'blue'
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
            "labelIds": [],
            "description": '',
            "checklists": []
        },
        {
            "id": "c102",
            "title": "Add Samples",
            "labelIds": ["l101", "l102"],
            "description": '',
            "checklists": []
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
            "labelIds": ["l103", "l104"],
            "description": '',
            "checklists": []
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
        }
        ],
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
        id: 'l101',
        title: '',
        color: '#61bd4f',
        colorName: 'green'
    },
    {
        id: 'l102',
        title: '',
        color: '#f2d600',
        colorName: 'yellow'
    },
    {
        id: 'l103',
        title: '',
        color: '#ff9f1a',
        colorName: 'orange'
    },
    {
        id: 'l104',
        title: '',
        color: '#eb5a46',
        colorName: 'red'
    },
    {
        id: 'l105',
        title: '',
        color: '#c377e0',
        colorName: 'purple'
    },
    {
        id: 'l106',
        title: '',
        color: '#0079bf',
        colorName: 'blue'
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
    "groups": [
        {
            "id": "735dg",
            "title": "Front-End",
            "task": [{
                "id": "XrPqi",
                "title": "Add user support",
                "labelIds": [],
                "description": '',
                "checklists": []
            },
            {
                "id": "RAEDU",
                "title": "Add board gallery",
                "labelIds": [],
                "description": "add clickable previews, and an option to create new boards",
                "checklists": []
            }]
        },
        {
            id: "gycb5",
            title: "Back End",
            task: [{
                "id": "0zJp9",
                "title": "switch local-storage requests with HTTP requests",
                "labelIds": [],
                "description": "",
                "checklists": []
            }]
        },
        {
            title: "Design",
            id: "32cb0",
            task: [{
                "id": "KIVoL",
                "labelIds": ["l101"],
                "title": "add animations",
                "description": "",
                "checklists": []
            },
            {
                "description": "Check google fonts for reference",
                "id": "gDYKM",
                "labelIds": ["39RVz", "l101"],
                "title": "import font for logo",
                "checklists": []
            },
            {
                title: "implement basic color scheme",
                id: "qbehr",
                "labelIds": [],
                "checklists": [],
                "description": "Check google fonts for reference",
            }]
        },

    ],
    'activities': [{
        "byMember": {
            "fullname": "Guest"
        },
        "title": "added the group",
        "createdAt": 1616190794476,
        "group": "My new list",
        "id": "toSgy",
        "task": {}
    },
    { "byMember": { "fullname": "Guest" }, "title": "added the task", "createdAt": 1616190786014, "group": "Design", "id": "OGCgq", "task": { "id": "qbehr", "title": "implement basic color scheme" } },
    {
        "byMember": {
            "fullname": "Guest"
        },
        "title": "changed the description",
        "createdAt": 1616190756788,
        "group": "Front-End",
        "id": "WB3XN",
        "task": {
            "id": "RAEDU",
            "title": "Add board gallery\n"
        }
    },
    {
        "byMember": {
            "fullname": "Guest"
        },
        "title": "added the task",
        "createdAt": 1616190735745,
        "group": "Front-End",
        "id": "PktOn",
        "task": {
            "id": "RAEDU",
            "title": "Add board gallery\n"
        }
    },
    {
        "byMember": {
            "fullname": "Guest"
        },
        "title": "added the task",
        "createdAt": 1616190690475,
        "group": "Front-End",
        "id": "gidPI",
        "task": {
            "id": "XrPqi",
            "title": "Add user support"
        }
    },
    {
        "byMember": {
            "fullname": "Guest"
        },
        "title": "changed the description",
        "createdAt": 1616190651202,
        "group": "Design",
        "id": "DPCpN",
        "task": {
            "id": "gDYKM",
            "title": "import font for logo"
        }
    },
    {
        "byMember": {
            "fullname": "Guest"
        },
        "title": "added the task",
        "createdAt": 1616190626746,
        "group": "Back End",
        "id": "Bt9Zf",
        "task": {
            "id": "0zJp9",
            "title": "switch local-storage requests with HTTP requests"
        }
    },
    {
        "byMember": {
            "fullname": "Guest"
        },
        "title": "added the task",
        "createdAt": 1616190607166,
        "group": "Design",
        "id": "zt3LN",
        "task": {
            "id": "gDYKM",
            "title": "import font for logo"
        }
    },
    {
        "byMember": {
            "fullname": "Guest"
        },
        "title": "added the task",
        "createdAt": 1616190569961,
        "group": "Design",
        "id": "DrRGv",
        "task": {
            "id": "KIVoL",
            "title": "add animations"
        }
    },
    {
        "byMember": {
            "fullname": "Guest"
        },
        "title": "renamed a group",
        "createdAt": 1616190551423,
        "group": "Design",
        "id": "RrihJ",
        "task": {}
    },
    {
        "byMember": {
            "fullname": "Guest"
        },
        "title": "added the group",
        "createdAt": 1616190546987,
        "group": "My new list",
        "id": "YIQ9w",
        "task": {}
    },
    {
        "byMember": {
            "fullname": "Guest"
        },
        "title": "renamed a group",
        "createdAt": 1616190457471,
        "group": "Back End",
        "id": "EQ60R",
        "task": {}
    },
    {
        "byMember": {
            "fullname": "Guest"
        },
        "title": "added the group",
        "createdAt": 1616190454919,
        "group": "My new list",
        "id": "QhqK2",
        "task": {}
    },
    {
        "byMember": {
            "fullname": "Guest"
        },
        "title": "renamed a group",
        "createdAt": 1616190453133,
        "group": "Front-End",
        "id": "TXbzz",
        "task": {}
    },
    {
        "byMember": {
            "fullname": "Guest"
        },
        "title": "added the group",
        "createdAt": 1616190359896,
        "group": "My new list",
        "id": "xtEqE",
        "task": {}
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
