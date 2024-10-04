<template>
    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 mb-4">
        <div class="single-services text-center faculty-box">
            <div class="services-ion">
                <span :class="faculty.icon"></span>
            </div>
            <div class="services-cap">
                <h5><a href="job_listing.html">{{ faculty.name }}</a></h5>
                <span>({{ faculty.count }})</span>
                <p class="faculty-description">{{ faculty.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FacultyItem',
    props: {
        faculty: Object
    }
};
</script>

<style scoped>
.faculty-box {
    border: 2px solid #007bff;
    border-radius: 10px;
    padding: 20px;
    transition: all 0.3s ease;
    background-color: white;
    color: #333;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 10px;
}

.faculty-box:hover {
    background-color: #007bff;
    color: white;
}

.faculty-box h5 a {
    color: inherit;
    text-decoration: none;
}

.faculty-box h5 a:hover {
    text-decoration: underline;
}

.faculty-description {
    font-size: 0.9rem;
    color: #666;
    margin-top: 10px;
}
</style>
