<template>
    <div class="card bg-secondary mb-2" :data-bs-toggle="'collapse'" :data-bs-target="`#${collapseId}`">
        <div class="card-body">
            <div class="d-flex justify-content-between mb-2" :class="item.category === '부동산' ? 'far fa-building' : 'fas fa-piggy-bank'">
                <div class="d-flex align-items-center">
                    <i class="me-2" />
                    <span class="fs-sm text-dark opacity-80 ps-1">
                        <span style="color:var(--caution)">{{ item.agenda }}</span>에 관한 퀴즈입니다. 
                    </span>
                </div>
                <span v-if="item.category === '부동산'" class="badge bg-faded-accent rounded-pill fs-sm" style="margin-left:auto">{{ item.category }}</span>
                <span v-if="item.category === '청약'" class="badge bg-faded-success rounded-pill fs-sm" style="margin-left:auto">{{ item.category }}</span>
            </div>
            <h3 class="h5 card-title pt-1 mb-0">{{ item.title }}</h3>
        </div>
        <div class="collapse" :id="collapseId" data-bs-parent="#accordionJobs">
            <div class="card-body mt-n1 pt-0">
                <p class="lead">정답: {{ item.answer }}</p>
                <p>{{ item.desc }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
    collapseId: {
        type: String,
        required: true,
    }
});
</script>
