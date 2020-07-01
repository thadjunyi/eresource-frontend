<template>
    <v-app>
        <v-container>
            <v-row class="video-select" >
                <v-col cols="12">
                    <v-overflow-btn
                        :items="videoTitle"
                        label="Select"
                        v-model="selected"
                        @change="this.onchange"
                        >
                    </v-overflow-btn>
                </v-col>
            </v-row>
            <v-container>
                <v-row dense>
                    <v-col
                    v-for="(item, i) in items"
                    :key="i"
                    cols="12"
                    >
                        <v-card
                            max-height="280"
                            :id="item.id"
                            :name="item.id"
                        >
                            <div class="d-flex flex-no-wrap justify-space-between">
                                <div>
                                    <v-card-title
                                        class="title"
                                        v-text="item.title">
                                    </v-card-title>
                                    <v-html>
                                        <video class="video" width="320" height="240" controls="controls" :src="item.link"></video>
                                    </v-html> 
                                </div>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
            <v-btn
            fab
            class="upload"
            dark
            bottom
            right
            fixed
            @click="dialog = !dialog"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                    <v-card-title> Upload Video </v-card-title>
                    <v-card-text>
                        <input accept="video/*" type="file" ref="file" />
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="this.uploadVideo">Upload</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </v-app>
</template>

<script>
/* eslint-disable */
export default {
  name: "VideoComponent",
  data: () => ({
        dialog: false,
        selected: null,
        videoTitle: null,
        items: null
  }),
  methods: {
    setVideoTitle(data) {
        var videoTitle = [{ text: "All", value: "All" }];
        data.map((item, i) => {
            videoTitle.push({ text: item.title, value: item.id })
        });
        return videoTitle;
    },
    onchange() {
        var id = this.selected;
        if (id == "All") {
            axios.get(this.$hostname + this.$hostport + "/api/video/getAll")
                .then(response => {
                    this.items = response.data;
                }).then(() => {
                    this.$forceUpdate();
                });
        }
        else {
            axios.get(this.$hostname + this.$hostport + "/api/video/get/" + id)
                .then(response => {
                    this.items = response.data;
                }).then(() => {
                this.$forceUpdate();
            });
        }
    },
    getVideo() {
        axios.get(this.$hostname + this.$hostport + "/api/video/getAll")
        .then(response => {
            this.videoTitle = this.setVideoTitle(response.data);
            this.items = response.data;
        }).then(() => {
                this.$forceUpdate();
        });
    },
    uploadVideo() {
        this.dialog = false;
        this.chosenFile = this.$refs.file.files;

        var formData = new FormData();
        formData.append("file", this.chosenFile.item(0));

        axios.post(this.$hostname + this.$hostport + "/api/video/upload", formData)
            .then(response => {
                    this.getVideo();
            });
    }
  },
  created() {
    this.getVideo();
  }
};
</script>

<style>
    .video-select {
        padding-top:50px;    
    }
    .title {
        margin-left:20px;
    }
    .video {
        margin-left:20px;
        padding-bottom:50px;
    }
    .upload {
        margin-bottom:70px;
    }
</style>