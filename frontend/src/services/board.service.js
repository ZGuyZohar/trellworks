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
    addGroup,
    removeGroup,
    addTask
}

async function query() {
    return storageService.query(BOARD_DB)
    // return httpService.get(BOARD_URL)
}

async function addGroup(board) {
    try {
        const boardCopy = JSON.parse(JSON.stringify(board));
        const group = _getEmptyGroup();
        boardCopy.groups.push(group);
        save(boardCopy);
        return boardCopy;
    } catch (err) {
        console.log(err);
    }
}

async function removeGroup(groupId, board) {
    const boardCopy = JSON.parse(JSON.stringify(board));
    const groupIdx = boardCopy.groups.findIndex(group => group.id === groupId);
    boardCopy.groups.splice(groupIdx, 1);
    save(boardCopy);
    return boardCopy;
}

async function addTask(task, board, groupId) {
    try {
        task.id = utilService.makeId()
        const boardCopy = JSON.parse(JSON.stringify(board));
        const group = boardCopy.groups.find(group => group.id === groupId);
        group.task.push(task)
        save(boardCopy);
        return boardCopy;
    } catch (err) {
        console.log(err);
    }
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


function _getEmptyGroup() {
    return {
        id: utilService.makeId(),
        style: {},
        title: 'My new list',
        task: []
    }
}

function getEmptyTask(){
    return {
        
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