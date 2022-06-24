<template>
    <div class="notification is-danger" v-if="notification">
        <button class="delete" @click="closeNotification()"></button>
            {{ message }}
    </div>
</template>
<script>
export default {

    props: {
        message: {
            type: String
        },

        notification: {
            type: Boolean,
            required: true
        },

        closeNotification: Function
    }
}
</script>