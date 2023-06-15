<script setup lang="ts">
import { ref, watch } from 'vue'
import { asyncFetchApi } from '@/composables/asyncFetchApi'
import ContentPlaceholderWrapper from '@/components/content-placeholder/Wrapper.vue'
import ContentPlaceholderImg from '@/components/content-placeholder/Img.vue'
import ContentPlaceholderText from '@/components/content-placeholder/Text.vue'
import ShipPlaceholder from '@/components/views/ShipPlaceholder.vue'
import Swal from 'sweetalert2'

const starship = <any> ref({})
const searchQuery = ref('')
const loading = ref(true)
const loadingNextPage = ref(false)
const loadingModal = ref(false)
const openModalDetail = ref(false)
const detailError = ref(false)
const starshipDetail = <any> ref({})

async function onFetch (nextPage: boolean = false) {
    if (nextPage) {
        if (starship.value.next === null) {
            // no next page, stop process
            return
        }
        loadingNextPage.value = true
    } else {
        loading.value = true
    }

    let { data: result, error } = await asyncFetchApi(nextPage ? starship.value.next : `https://swapi.dev/api/starships?search=${searchQuery.value}`)

    if (error.value) {
        Swal.fire({
            title: 'Ooppss',
            text: 'Failed to fetch data from SWAPI',
            confirmButtonText: 'OK'
        })
        loading.value = false
        loadingNextPage.value = false
        return
    }

    if (nextPage) {
        // if request made from the `next page`, then merge new result into old result
        result.value.results = starship.value.results.concat(result.value.results)
    }

    starship.value = result.value
    loading.value = false
    loadingNextPage.value = false
}

async function getStarshipDetail (url: string) {
    // reset value
    starshipDetail.value = {}
    loadingModal.value = true
    openModalDetail.value = true
    detailError.value = false

    let { data: result, error } = await asyncFetchApi(url)

    if (error.value) {
        loadingModal.value = false
        detailError.value = true
        return
    }

    starshipDetail.value = result.value
    loadingModal.value = false
}

// running for the first time
onFetch()

// watch search query changes and perform auto-submit
watch(() => searchQuery.value, (sq) => {
    if (sq !== null && (sq.length === 0 || sq.length > 3)) {
        onFetch()
    }
})

// handle next page load by window scroll or known as infinite scroll
window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;
    if (((scrollTop + clientHeight) >= (scrollHeight - 100)) && !loading.value && !loadingNextPage.value) {
        onFetch(true)
    }
}, {
    passive: true
});
</script>
<template>
    <div>
        <section class="bg-half-100 d-table w-100 pb-0">
            <div class="container position-relative" style="z-index: 1;"></div>
        </section>
        <section class="section pb-0">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12">
                        <div class="features-absolute">
                            <div class="row justify-content-center" id="reserve-form">
                                <div class="col-xl-10 mt-lg-5">
                                    <div class="card bg-white feature-top border-0 shadow rounded p-3">
                                        <div class="registration-form text-dark text-start">
                                            <div class="row g-lg-0">
                                                <div class="col-lg-9 col-md-6">
                                                    <div class="filter-search-form position-relative filter-border">
                                                        <i class="uil uil-search icons"></i>
                                                        <input type="text" id="search-keyword" class="form-control filter-input-box bg-light border-0" placeholder="Search the ship name" v-model="searchQuery">
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-6 mt-3 mt-lg-0">
                                                    <button id="search" style="height: 60px;" class="btn btn-search rounded-md searchbtn submit-btn w-100" :disabled="loading" @click="onFetch()">
                                                        <div class="spinner-border white" role="status" v-if="loading"></div>
                                                        <template v-else>
                                                            Search
                                                        </template>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container mt-4 pt-2 pt-lg-0">
                <div class="row">
                    <template v-if="loading">
                        <div class="col-sm-6 col-md-4 col-lg-3 text-center mt-2 mb-5" v-for="c in [...Array(12).keys()]">
                            <ShipPlaceholder />
                        </div>
                    </template>
                    <template v-else>
                        <div class="col-sm-6 col-md-4 col-lg-3 text-center align-items-stretch mt-2 mb-5 starship-col" v-for="ss in starship.results">
                            <div class="mx-auto starship-box">
                                <img class="mx-auto starship-icon" src="https://cdn-icons-png.flaticon.com/512/2949/2949053.png" :alt="starship.name" />
                                <div class="card-body content position-relative p-0 mt-3">
                                    <a href="item-detail-one.html" class="title text-dark h6">{{ ss.name }}</a>
                                    <div class="d-flex justify-content-between mt-3 px-2">
                                        <button class="btn btn-sm btn-search rounded-pill py-1 px-4"  @click="getStarshipDetail(ss.url)">Detail</button>
                                        <star-rating :rating="parseFloat(ss.hyperdrive_rating)" :star-size="14" :fixed-points="1" :read-only="true" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-if="loadingNextPage">
                        <div class="col-sm-6 col-md-4 col-lg-3 text-center mt-2 mb-5" v-for="c in [...Array(8).keys()]">
                            <ShipPlaceholder />
                        </div>
                    </template>
                </div>
            </div>
        </section>
        <b-modal size="xl" v-model="openModalDetail" :bodyClass="'p-0'" @hide.prevent :hideHeaderClose="true" :scrollable="true">
            <template #title>
                <i class="bi-rocket-takeoff"></i> {{ loadingModal ? 'Loading...' : 'Starship Detail' }}
            </template>
            <div class="row px-3" v-if="loadingModal">
                <div class="col-12 col-md-5 col-lg-4 p-3">
                    <ContentPlaceholderWrapper>
                        <ContentPlaceholderImg style="height: 250px" />
                    </ContentPlaceholderWrapper>
                </div>
                <div class="col-12 col-md-7 col-lg-8 p-0 detail-divider">
                    <table class="table table-striped mb-0">
                        <tbody>
                            <tr v-for="i in [...Array(8).keys()]">
                                <td>
                                    <ContentPlaceholderWrapper>
                                        <ContentPlaceholderText :lines="1" />
                                    </ContentPlaceholderWrapper>
                                </td>
                                <td>
                                    <ContentPlaceholderWrapper>
                                        <ContentPlaceholderText :lines="1" />
                                    </ContentPlaceholderWrapper>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row px-3" v-else-if="starshipDetail.name">
                <div class="col-12 col-md-5 col-lg-4 d-flex flex-wrap align-items-center p-3">
                    <img src="https://cdn-icons-png.flaticon.com/512/2949/2949053.png" class="mx-auto starship-detail__icon w-100" />
                    <div class="badge-price">
                        ${{ $filters.number_format(starshipDetail.cost_in_credits, 0, '', ',') }}
                    </div>
                </div>
                <div class="col-12 col-md-7 col-lg-8 p-0 detail-divider">
                    <table class="table table-striped table-detail mb-0">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>:</td>
                                <td>{{ starshipDetail.name }}</td>
                            </tr>
                            <tr>
                                <td>Model</td>
                                <td>:</td>
                                <td>{{ starshipDetail.model }}</td>
                            </tr>
                            <tr>
                                <td>Class</td>
                                <td>:</td>
                                <td>{{ starshipDetail.starship_class }}</td>
                            </tr>
                            <tr>
                                <td>Manufacturer</td>
                                <td>:</td>
                                <td>{{ starshipDetail.manufacturer }}</td>
                            </tr>
                            <tr>
                                <td>Length</td>
                                <td>:</td>
                                <td>{{ starshipDetail.length }} Meters</td>
                            </tr>
                            <tr>
                                <td>Passengers</td>
                                <td>:</td>
                                <td>{{ starshipDetail.passengers }}</td>
                            </tr>
                            <tr>
                                <td>Crew</td>
                                <td>:</td>
                                <td>{{ starshipDetail.crew }}</td>
                            </tr>
                            <tr>
                                <td>Cargo Capacity</td>
                                <td>:</td>
                                <td>{{ $filters.number_format(starshipDetail.cargo_capacity, 0, '', ',') }} Kg</td>
                            </tr>
                            <tr>
                                <td>Hyperdrive Rating</td>
                                <td>:</td>
                                <td>
                                    <star-rating :rating="parseFloat(starshipDetail.hyperdrive_rating)" :star-size="14" :fixed-points="1" :read-only="true" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <template #footer>
                <button class="btn btn-md btn-secondary" @click="openModalDetail = false">Close</button>
            </template>
        </b-modal>
    </div>
</template>
