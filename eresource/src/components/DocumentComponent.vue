<template>
    <v-container class="document">
        <v-row dense>
            <v-col
            cols="12"
            >
                <v-card>
                    <div class="d-flex flex-no-wrap justify-space-between document-content">
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
                                        :increment="0.1"
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
        <v-card-title>Past Comments</v-card-title>
        <v-row dense>
            <v-col
            v-for="(comment, i) in item.comments"
            :key="i"
            cols="12"
            >
                <v-card>
                    <div class="d-flex flex-no-wrap justify-space-between document-content">
                        <div>
                            <v-row>
                                <star-rating
                                    class="comments-rating"
                                    :rating ="comment.rating"
                                    :v-bind:max-rating="5"
                                    read-only
                                    :increment="0.1"
                                    :fixed-points="1"
                                    :star-size="20"
                                    :padding="1">
                                </star-rating>
                                <v-card-text 
                                    class="text text-wrap"
                                    v-html="comment.comment">
                                </v-card-text> 
                            </v-row>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <v-row dense>
            <v-container fluid>
                <v-textarea
                    clearable
                    label="New Comments"
                    :rows="3"
                    v-model="comments"
                ></v-textarea>
                <star-rating
                    @rating-selected ="setRating"
                    class="user-rating"
                    v-model="rating"
                    :star-size=40
                    :padding="1">
                </star-rating>
                <v-btn 
                    dark
                    @click="this.rate"
                >
                    Rate
                </v-btn>
            </v-container>
        </v-row>
    </v-container>
</template>

<script>
/* eslint-disable */
import StarRating from "vue-star-rating";

export default {
    name: "DocumentComponent",
    components: {
        StarRating
    },
    methods: {
        setRating(rating) {
            this.rating= rating;
        },
        getItem() {
            axios.get(this.$hostname + this.$hostport + "/api/documents/get/" + this.id)
                .then(response => {
                    this.item = response.data;
                }).then(() => {
                    this.$forceUpdate();
                });
        },
        rate() {
            const auth = {
                headers: {
                    Authorization:'JWT',
                    "Content-type": "application/json"
                } // + localStorage.getItem('token')
            }
            axios.put(this.$hostname + this.$hostport + "/api/documents/addComment/" + this.id,
                { comment: this.comments, rating: this.rating }, auth)
                .then(response => {
                    console.log(response.data);
                }).then(() => {
                    this.getItem();
                });
        }
    },
    data: () => ({
        id: null,
        item: null,
        absolute: true,
        opacity: 1,
        overlay: false,
        comments: null,
        rating:0
    }),
    created() {
        this.id = this.$route.query.id;
        this.getItem();
    }
}
</script>

<style>
    .document {
        padding-top:60px;
        padding-bottom:60px; 
    }
    .title, .text {
        margin-left:20px;
    }
    .rating {
        margin-right:30px;
    }
    .comments-rating {
        margin-top:10px;
        margin-left:35px;
    }
    .user-rating {
        padding-bottom:20px;
    }
</style>