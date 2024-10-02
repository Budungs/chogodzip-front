<template>
    <button class="tab" :class="{ active: isActive }" @click="navigate">
        {{ label }}
    </button>
</template>

<script>

export default {
    name: "Tab",
    props: {
        name: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        navigate() {
            this.$router.push({ name: `mypage/${this.name}` });
            this.$emit('tab-click', this.name);
        }
    }
};
</script>

<style scoped>
.tab {
    width: 7rem;
    flex-grow: 1;
    padding: 10px 0;
    border: none;
    cursor: pointer;
    border: 1px solid #ccc;
    background: white;
}

.tab.active {
    width: 7rem;
    background-color: #7747B5;
    color: white;
    border: none;
}
</style>