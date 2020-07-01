<template>
    <v-container>
        <v-row class="search-text" align="center" justify="center">
            <v-col>
                <form>
                    <v-text-field
                        label="Enter your search here"
                        single-line
                        outlined
                        @keydown.enter="search"
                        append-icon="mdi-magnify"
                        v-model="searchText"
                        class="shrink search-text"
                    ></v-text-field>
                </form>
            </v-col>
        </v-row>
        <v-container class="search-result">
            <v-row dense>
                <v-col
                v-for="(item, i) in items"
                :key="i"
                cols="12"
                >
                    <v-card
                        max-height="150"
                        @click="routeTo(item.id)"
                    >
                        <div class="d-flex flex-no-wrap justify-space-between">
                            <div>
                                <v-row>
                                    <v-row>
                                        <v-card-title
                                            class="title"
                                            v-text="item.title">
                                        </v-card-title>
                                        <v-spacer></v-spacer>
                                        <star-rating
                                            class="rating"
                                            :name="item.id"
                                            :rating ="item.rating"
                                            :v-bind:max-rating="5"
                                            read-only
                                            :increment=0.1
                                            :fixed-points="1"
                                            :star-size="20"
                                            :padding="1">
                                        </star-rating>
                                    </v-row>
                                    <v-card-text 
                                        class="text text-wrap"
                                        v-html="item.content">
                                    </v-card-text> 
                                </v-row>
                            </div>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
/* eslint-disable */
import StarRating from "vue-star-rating";

export default {
    name: "SearchComponent",
    components: {
        StarRating
    },
    methods: {
        search() {
        this.$router.push({ name:'Search', query: { text: this.searchText } });
        axios.get(this.$hostname + this.$hostport + "/api/documents/find/" + this.searchText)
            .then(response => {
                this.items = response.data;
            });
        this.$forceUpdate();
        },
        routeTo(id) {
            this.$router.push({ name:'Document', query: { id: id } });
        }
    },
    data: () => ({
        searchText: "",
        items: null
    }),
    created() {
        this.searchText = this.$route.query.text;
        // const auth = {
        //     headers: {
        //         Authorization:'JWT',
        //         "Content-type": "application/json"
        //     } // + localStorage.getItem('token')
        // }
        if (this.searchText == null) {
            axios.get(this.$hostname + this.$hostport + "/api/documents/getAll/")
                .then(response => {
                    this.items = response.data;
                }).then(() => {
                    this.$forceUpdate();
                });
        }
        else {
            axios.get(this.$hostname + this.$hostport + "/api/documents/find/" + this.searchText)
                .then(response => {
                    this.items = response.data;
                }).then(() => {
                    this.$forceUpdate();
                });
        }
    }
};
</script>

<style>
    .title, .text {
        margin-left:20px;
    }
    .rating {
        margin-right:30px;
    }
    .search-text {
        padding-top:50px;
    }
    .search-result {
        margin-bottom:50px;
    }
</style>