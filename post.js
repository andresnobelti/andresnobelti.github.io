new Vue({
    el: '#app',
    data() {
        return {
            info: null,
            newProject: { nombreProyectoForm: '' },
            response: null,
            responseFilter: null

        }
    },

    mounted() {
        axios
            .get('http://localhost:8080/tracksystemapi/dal/track/project/listar')
            .then(response => (this.info = response.data))
    },

    computed: {
        resultQuery(){
            
          if(this.responseFilter){
          return this.info.filter((info)=>{
            return this.responseFilter.toLowerCase().split(' ').every(v => info.projectName.toLowerCase().includes(v))
          })
          }else{
            return this.info;
          }
        }
      },
    


    methods: {

        created() {
            if (this.newProject.nombreProyectoForm.replace(/ /g, "")!= '') {
                let body = {
                    nombreProyecto: this.newProject.nombreProyectoForm
                };
                axios.post("http://localhost:8081/tracksystemapi/api/track/project/create", body).then((result) => {
                    console.log(result);
                    console.log(result.data.mensaje); {
                        axios
                            .get('http://localhost:8080/tracksystemapi/dal/track/project/listar')
                            .then(response => (this.info = response.data))
                            
                        {
                            alert(result.data.mensaje + '!')
                        }
                    }
                });
                
            }
            this.newProject.nombreProyectoForm = '';

            
        
        }
    }
})