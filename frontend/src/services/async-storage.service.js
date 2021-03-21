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
        "title": "My new board",
        "createdAt": 1616356323361,
        "labels": [
          {
            "title": "",
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
        "groups": [
          {
            "id": "Xy6kf",
            "style": {},
            "title": "My new list",
            "task": [
              {
                "id": "FezW6",
                "title": "גיא אשם",
                "dueDate": "",
                "labelIds": [],
                "description": "",
                "checklists": [],
                "members": [],
                "imgs": []
              }
            ]
          },
          {
            "id": "koyJX",
            "style": {},
            "title": "My new list",
            "task": [
              {
                "id": "mHLd8",
                "title": "אלמוג אשמה",
                "dueDate": "",
                "labelIds": [],
                "description": "",
                "checklists": [],
                "members": [],
                "imgs": []
              }
            ]
          },
          {
            "id": "DnnNx",
            "style": {},
            "title": "My new list",
            "task": [
              {
                "id": "LMz0X",
                "title": "גלי אשמה",
                "dueDate": "",
                "labelIds": [],
                "description": "",
                "checklists": [],
                "members": [],
                "imgs": []
              }
            ]
          }
        ],
        "styles": {
          "backgroundColor": "#61bd4f"
        },
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
            "createdAt": 1616356387230,
            "group": "My new list",
            "id": "2pwWE",
            "task": {
              "id": "mHLd8",
              "title": "אלמוג אשמה"
            }
          },
          {
            "byMember": {
              "fullname": "Guest"
            },
            "title": "added the task",
            "createdAt": 1616356386544,
            "group": "My new list",
            "id": "0aNRC",
            "task": {
              "id": "LMz0X",
              "title": "גלי אשמה"
            }
          },
          {
            "byMember": {
              "fullname": "Guest"
            },
            "title": "added the group",
            "createdAt": 1616356382555,
            "group": "My new list",
            "id": "gW9a5",
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
            "createdAt": 1616356378258,
            "group": "My new list",
            "id": "yP0hx",
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
            "createdAt": 1616356333079,
            "group": "My new list",
            "id": "1DnfR",
            "task": {
              "id": "FezW6",
              "title": "גיא אשם"
            }
          },
          {
            "byMember": {
              "fullname": "Guest"
            },
            "title": "added the group",
            "createdAt": 1616356328639,
            "group": "My new list",
            "id": "ZnX8K",
            "task": {
              "id": "",
              "title": ""
            }
          },
          {
            "id": "Au5jd",
            "title": "This board was created",
            "createdAt": 1616356323361,
            "byMember": {
              "fullname": "Guest"
            },
            "task": {
              "id": "",
              "title": ""
            }
          }
        ],
        "_id": "LIHlf"
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
