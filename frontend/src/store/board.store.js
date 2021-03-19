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
        currBoardMembers(state) {
            return state.currBoard.members
        },
        currTask(state) {
            return state.currTask
        },
        activityLog(state) {
            return state.currBoard.activities
        },
    },
    mutations: {
        setBoards(state, { foundBoards }) {
            state.boards = foundBoards
        },
        setBoard(state, { board }) {
            console.log(board.groups[1].task);
            state.currBoard = board;
        },
        setGroup(state, { groupId }) {
            const currGroup = state.currBoard.groups.find(group => group.id === groupId)
            if (currGroup) state.currGroup = currGroup
        },
        setTask(state, { taskId }) {
            state.currBoard.groups.forEach(group => {
                let task = group.task.find(currTask => currTask.id === taskId)
                if (task) state.currGroup = group
            })
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
        async saveBoardChanges(context, { editedBoard }) {
            context.commit({ type: 'setBoard', board: editedBoard });
            await boardService.save(editedBoard)
        },
        async newBoard({ commit }) {
            try {
            }
            catch (err) {
                console.log('Adding new board: Error', err);
            }
        }
    }
}