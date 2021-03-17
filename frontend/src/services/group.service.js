import { storageService } from './async-storage.service'
const BOARD_DB = 'boards'
// const BOARD_URL = '/group'

export const groupService = {
    query,
    getById,
    remove,
    save,
    getEmptyGroup
}

async function query(){
    return storageService.query(BOARD_DB, id)
    // return httpService.get(BOARD_URL)
}


async function getById(boardId, groupId) {
    const board = await storageService.get(BOARD_DB, boardId);
    return board.groups.find(group => group.id === groupId)
    // return httpService.get(`group/${groupId}`)
}

async function remove(groupId) {
    return storageService.remove(BOARD_DB, groupId)
    // return httpService.delete(`group/${groupId}`)
}


async function save(group) {
    if (group._id) {
        return storageService.put(BOARD_DB, group)
        // return httpService.put(TOY_URL + toy._id, toy)
    } else {
        return storageService.post(BOARD_DB, newGroup)
        // return httpService.post(TOY_URL, toy)
    }
}

function getEmptyGroup() {
    return {
        title: '',
        createdAt: Date.now(),
        groups: []
    }
}  