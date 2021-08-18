new Vue({
    el: '#app',
    data() {
        return {
            info: null,
            projects: null,
            status: null,
            newProject: { nombreProyectoForm: '' },
            responseFilter: '',
            newOperation: {idProyectoForm: null,
                            nombreOperacionForm: null}
            

        }
    },



    computed: {
        resultQuery() {

            if (this.responseFilter) {

                return this.info.filter((info) => {

                    return this.responseFilter.split(' ').every(v => info.proxyName.includes(v))

                })
            }

            else {

                return this.info

            }

        },

        buttonLock() {
            let responseProject = this.newProject.nombreProyectoForm
            if (responseProject) {

                let tempArray = this.projects.filter((projects) => {

                    return responseProject.split(' ').every(v => projects.projectName.includes(v))

                })

                if (Object.keys(tempArray).length == 0) {

                    //this.btnDisable= true 
                    return true
                }
                else {
                    if (responseProject != tempArray[0].projectName) {
                        return true
                    }
                    return false
                }
            }
            else {

                return false


            }
        }

    },

    /* Llamada a APIS Get y Post */
    mounted() {
        axios
            .get('http://localhost:8080/tracksystemapi/dal/track/operation/listar')
            .then(response => (this.info = response.data))

        this.tempList = this.resultQuery

        axios
            .get('http://localhost:8080/tracksystemapi/dal/track/project/listar')
            .then(response => (this.projects = response.data))

        if (this.nombreOperacionForm == ! null)
            axios
                .post('http://localhost:8081/tracksystemapi/api/track/operation/create')
                .then(response => (this.operationCreate = response.data))
        else {

        }
    },



    methods: {

        SearchContacts() {

            /* Se crea operacion desde api, luego limpia los campos de los imput  */
            if (this.newOperation.nombreOperacionForm.replace(/ /g, "") != '') {

                idProyecto = this.newOperation.idProyectoForm,
                    nombreOperacion = this.newOperation.nombreOperacionForm

                axios.post('http://localhost:8081/tracksystemapi/api/track/operation/create', null, {
                    params: {
                        idProyecto,
                        nombreOperacion
                    }
                })
                    .then((result) => {
                        console.log(result);
                        console.log(result.data.mensaje);

                        axios
                            .get('http://localhost:8080/tracksystemapi/dal/track/operation/listar')
                            .then(response => (this.info = response.data))

                        this.tempList = this.resultQuery

                    });
            }
            this.newOperation.idProyectoForm = null;
            this.newOperation.nombreOperacionForm = '';

        },


        /* Se crea proyecto desde api, luego limpia los campos de los imput text */
        ProjectCreate() {

            if (this.newProject.nombreProyectoForm.replace(/ /g, "") != '') {

                let body = {
                    nombreProyecto: this.newProject.nombreProyectoForm
                };
                axios.post("http://localhost:8081/tracksystemapi/api/track/project/create", body).then((result) => {
                    console.log(result);

                    console.log(result.data.mensaje);
                    if (result.data.idProyecto == 0)
                        console.log("ID proyecto '" + result.data.idProyecto + "', No se generó");
                    else console.log("ID proyecto generado: " + result.data.idProyecto);
                    console.log(result.data.nombreProyecto)


                });

            }

            this.newProject.nombreProyectoForm = '';



        }


    }
})