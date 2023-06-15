<script setup lang="ts">
</script>
<template>
    <div class="mx-auto starship-box">
        <ContentPlaceholderWrapper>
            <ContentPlaceholderImg :class="'starship-icon__placeholder'" style="width: 50%;border-radius: 7px;position: absolute;bottom: 55%;left: 25%;transform: translate(-50, -50);" />
        </ContentPlaceholderWrapper>
        <div class="card-body content position-relative p-0 mt-3">
            <ContentPlaceholderWrapper class="mx-auto w-75">
                <ContentPlaceholderText :lines="1" :line_width="100" />
            </ContentPlaceholderWrapper>
            <div class="d-flex justify-content-between mt-3 px-2">
                <ContentPlaceholderWrapper class="mx-auto w-75">
                    <ContentPlaceholderText :lines="1" :line_width="100" />
                </ContentPlaceholderWrapper>
                <ContentPlaceholderWrapper class="mx-auto w-75">
                    <ContentPlaceholderText :lines="1" :line_width="100" />
                </ContentPlaceholderWrapper>
            </div>
        </div>
    </div>
</template>