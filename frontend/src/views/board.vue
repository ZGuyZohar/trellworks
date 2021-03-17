<template>
    <h1>I am board</h1>
</template>

<script>
import {boardService} from '../services/board.service.js'

export default { 
    created() { 
        boardService.loadBoard()
    }
}
</script>
