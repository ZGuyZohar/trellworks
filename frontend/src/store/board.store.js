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
        currBoard(state) {
            return state.currBoard
        },
        currGroup(state) {
            return state.currGroup
        },
        currTask(state) {
            return state.currTask
        },
    },
    mutations: {
        setBoards(state, { foundBoards }) {
            state.boards = foundBoards
        },
        setBoard(state, { board }) {
            state.currBoard = board;
        },
        setGroup(state, { groupId }) {
            const currGroup = state.currBoard.groups.find(group => group.id === groupId)
            if (currGroup) state.currGroup = currGroup
        },
        setTask(state, { taskId }) {
            const currTask = state.currGroup.task.find(task => task.id === taskId);
            if (currTask) state.currTask = currTask;
        },
    },
    actions: {
        async loadBoards({ commit }) {
            const foundBoards = await boardService.query();
            commit({ type: 'setBoards', foundBoards })
        },
        async getBoard({ commit }, { boardId }) {
            try {
                const foundBoard = await boardService.getById(boardId);
                commit({ type: 'setBoard', board: foundBoard })
            } catch (err) {
                console.log('reviewStore: Error in loadReviews', err)
                throw err
            }
        },
        async addGroup(context) {
            const savedBoard = await boardService.addGroup(context.state.currBoard);
            context.commit({ type: 'setBoard', board: savedBoard });
        },
        async addTask(context, { task }) {
            const savedBoard = await boardService.addTask(task, context.state.currBoard, context.state.currGroup.id);
            context.commit({ type: 'setBoard', board: savedBoard });
        },
        async saveBoardChanges(context, { editedBoard }) {
            context.commit({ type: 'setBoard', board: editedBoard });
            await boardService.save(editedBoard)
        }
    }
}