import { boardService } from '../services/board.service.js'

export const boardStore = {
    state: {
        boards: null,
        currBoard: null,
    },
    getters: {
        boards(state) {
            return state.boards;
        },
        currBoard(state){
            return state.currBoard
        }
    },
    mutations: {
        setBoards(state, {foundBoards}){
            state.boards = foundBoards
        },
        setCurrBoard(state, { foundBoard }) {
            state.currBoard = foundBoard;
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
                commit({ type: 'setCurrBoard', foundBoard })
            } catch (err) {
                console.log('reviewStore: Error in loadReviews', err)
                throw err
            }
        },
    }
}