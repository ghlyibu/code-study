<template>
    <div>
        {{ count }}
        <button @click="addCount">add</button>
    </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';

export default {
    setup() {
        const state = reactive({
            count: 0,
        });
        const addCount = () => {
            state.count++;
        };

        return {
            ...toRefs(state),
            addCount
        };
    }
};
</script>

<style lang="scss" scoped></style>