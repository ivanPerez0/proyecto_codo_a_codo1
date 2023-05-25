const nosotrosComponent = {
    template:`
    <section class="contacto_grupo" >
    <div class="flex-container" v-for="contacto in miembros" >
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="..." class="card-img">
        <div class="card-body">
            <h2 class="title-text"> {{ contacto.nombre }} </h2>
            
            <a :href="contacto.linkedin" class="button">Linkedin</a>
        </div>
    </div>
    </section>
    `,

    data(){
        return{
            miembros:[
                {
                    nombre:"Jayris",
                    linkedin:""
                  
                },
                {
                    nombre:"Ivan",
                    linkedin:"https://www.linkedin.com/in/ivan-pz098/"
                   
                },
                {
                    nombre:"Claudio",
                    linkedin:""
                }
            ]
        }
    }

}