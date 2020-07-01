<template>
    <v-app>
        <v-container>
            <v-row class="audio-select" >
                <v-col cols="12">
                    <v-overflow-btn
                        :items="audioTitle"
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
                            max-height="130"
                            :id="item.id"
                            :name="item.id"
                        >
                            <div class="d-flex flex-no-wrap justify-space-between search-result">
                                <div>
                                    <v-card-title
                                        class="title"
                                        v-text="item.title">
                                    </v-card-title>
                                    <v-html>
                                        <figure>
                                            <audio
                                                class="audio"
                                                controls
                                                :src="item.link">
                                            </audio>
                                        </figure>
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
                    <v-card-title> Upload Audio </v-card-title>
                    <v-card-text>
                        <input accept="audio/*" type="file" ref="file" />
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="this.uploadAudio">Upload</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </v-app>
</template>

<script>
/* eslint-disable */
export default {
  name: "AudioComponent",
  data: () => ({
        dialog: false,
        selected: null,
        audioTitle: null,
        items: null,
  }),
  methods: {
    setAudioTitle(data) {
        var audioTitle = [{ text: "All", value: "All" }];
        data.map((item, i) => {
            audioTitle.push({ text: item.title, value: item.id })
        });
        return audioTitle;
    },
    onchange() {
        var id = this.selected;
        if (id == "All") {
            axios.get(this.$hostname + this.$hostport + "/api/audio/getAll")
                .then(response => {
                    this.items = response.data;
                }).then(() => {
                    this.$forceUpdate();
                });
        }
        else {
            axios.get(this.$hostname + this.$hostport + "/api/audio/get/" + id)
                .then(response => {
                    this.items = response.data;
                }).then(() => {
                    this.$forceUpdate();
                });
        }
    },
    getAudio() {
        axios.get(this.$hostname + this.$hostport + "/api/audio/getAll")
        .then(response => {
            this.audioTitle = this.setAudioTitle(response.data);
            this.items = response.data;
        }).then(() => {
                this.$forceUpdate();
        });
    },
    uploadAudio() {
        this.dialog = false;
        this.chosenFile = this.$refs.file.files;

        var formData = new FormData();
        formData.append("file", this.chosenFile.item(0));

        axios.post(this.$hostname + this.$hostport + "/api/audio/upload", formData)
            .then(response => {
                    this.getAudio();
            });
    }
  },
  created() {
    this.getAudio();
  }
};
</script>

<style>
    .audio-select {
        padding-top:50px;    
    }
    .title, .audio {
        margin-left:20px;
    }
</style>