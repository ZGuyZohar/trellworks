import { boardService } from '../services/board.service.js'

export const boardStore = {
    state: {
        boards: null,
        currBoard: null,
        currGroup: null,
        currTask: null
    },
    getters: {
        boards(state) {
            return state.boards; 
        },
        currBoard(state){
            return state.currBoard
        },
        currGroup(state){
            return state.currGroup
        },
        currTask(state){
            return state.currTask
        }
    },
    mutations: {
        setBoards(state, {foundBoards}){
            state.boards = foundBoards
        },
        getBoard(state, { foundBoard }) {
            state.currBoard = foundBoard;
        },
        getGroup(state, {groupId}){
            const currGroup = state.currBoard.groups.find(group => group.id === groupId)
            state.currGroup = currGroup
        },
        getTask(state, {taskId}){
            state.currBoard.groups.forEach(group => {
                const task = group.task.find(task => {
                    return task.id === taskId
                });
                if(task) state.currTask = task;
            })
        },
    },
    actions: {
        async loadBoards({commit}){
            const foundBoards = await boardService.query();
            commit({type: 'setBoards', foundBoards})
        },
        async getBoard({commit}, {boardId}) {
            try {
                const foundBoard = await boardService.getById(boardId);
                commit({ type: 'getBoard', foundBoard })
            } catch (err) {
                console.log('reviewStore: Error in loadReviews', err)
                throw err
            }
        },
    }
}