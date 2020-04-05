<template>
    <div>
        <v-app-bar>
            <v-spacer></v-spacer>
            <h1>Elige un Grupo</h1>
            <v-spacer></v-spacer>
        </v-app-bar>
    <v-container fluid class="groups-style">
        <v-row >
            <v-col cols="4">
                <v-card v-for="(a_group, i) in a_groups" :key="i" class="mx-auto">
                    <v-card-text class="mx-auto">
                        <h1>{{a_group}}</h1>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card v-for="(b_group, i) in b_groups" :key="i" class="mx-auto">
                    <v-card-text class="mx-auto">
                        <h1>{{b_group}}</h1>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card v-for="(c_group, i) in c_groups" :key="i" class="mx-auto">
                    <v-card-text class="mx-auto">
                        <h1>{{c_group}}</h1>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                a_groups:['A-1','A-2','A-3'],
                b_groups:['B-1','B-2','B-3'],
                c_groups:['C-1','C-2','C-3'],
            }
        },
        methods: {
            name() {
                
            }
        },
    }
</script>

<style lang="scss" scoped>
.groups-style{
    height: 100%;
}
</style>