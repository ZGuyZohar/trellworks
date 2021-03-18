<template>
    <section class="pop-up">
        <div class="header">
            <slot name="header">    </slot><span @click="closePopup">X</span>
        </div>
        <slot></slot>
        <h1>testest</h1>
        <h1>testest</h1>
    </section>  
</template>

<script>
export default {
    methods: {
        closePopup(){
            this.$emit('closePopup', false)
        }
    }
}
</script>