import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const BOARD_DB = 'boards'
// const BOARD_URL = '/board'

export const boardService = {
    query,
    getById,
    remove,
    save,
    getEmptyBoard,
    getEmptyTask,
    getEmptyGroup,
    getEmptyLabel,
    getDefaultLabels
}

async function query() {
    return storageService.query(BOARD_DB)
    // return httpService.get(BOARD_URL)
}

async function getById(boardId) {
    return storageService.get(BOARD_DB, boardId)
    // return httpService.get(`board/${boardId}`)
}

async function remove(boardId) {
    return storageService.remove(BOARD_DB, boardId)
    // return httpService.delete(`board/${boardId}`)
}


async function save(board) {
    if (board._id) {
        return storageService.put(BOARD_DB, board)
        // return httpService.put(TOY_URL + toy._id, toy)
    } else {
        return storageService.post(BOARD_DB, newBoard)
        // return httpService.post(TOY_URL, toy)
    }
}

function getEmptyBoard() {
    return {
        title: '',
        createdAt: Date.now(),
        boards: [],
        groups: []
    }
}


function getEmptyGroup() {
    return {
        id: utilService.makeId(),
        style: {},
        title: 'My new list',
        task: []
    }
}

function getEmptyTask() {
    //// add more properties later here such as: description, etc. as we go!////
    return {
        id: utilService.makeId(),
        title: '',
        labels: []
    }
}

function getDefaultLabels(){
    const defaultColors = ['#61bd4f', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0', '#0079bf']
    defaultColors.map(color => {
        return getEmptyLabel(color)
    })
}

function getEmptyLabel(color = '') {
    return {
        id: utilService.makeId(),
        title: '',
        color
    }
}
// async function update(board) {
//     return storageService.put(BOARD_DB, board)
//     // board = await httpService.put(`board/${board._id}`, board)
//     // Handle case in which admin updates other board's details
// }

// ***** CHANGED UPDATE FUNCTION FROM STARTER TO SAVE FUNCTION,
// COMMENTING BECAUSE IM NOT SURE WHY IT WASNT ADDED ALREADY IN THE STARTER,
// MIGHT NEED TO CHANGE BACK  