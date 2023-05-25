const ApiComponent = {
    template: `
<div class="grid-item fila1">
    <div v-if="isLoading">Cargando...</div>
        <div class="datos" v-else  >
            <div class="city" >
                 <p>{{fecha.getDate()}}/{{fecha.getMonth() + 1}}/{{fecha.getFullYear()}} <br> {{city}}</p>
             </div>
            
            <div class="temperature" v-if="temperature">
                <img :src="'https://openweathermap.org/img/w/' + icon + '.png'" alt="Icono del clima">
                <p> {{ description }}  {{temperature}}°C</p>
            </div>
        </div>
</div>
    `,
    data() {
        return {
            city: "",
            temperature: "",
            description: "",
            icon:"",
            isLoading: true,
            apiKey: "6280963530ccb126228e524fe05e6977",
            url: "",
            fecha : new Date(),

        }
    },
    methods: {
        getLocation() {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
        }
    },
    async created() {
        try {
            const position = await this.getLocation();
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}&units=metric&lang=es`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Unable to fetch weather data.");
            }
            const data = await response.json();

            this.city = data.name;
            this.temperature = Math.round(data.main.temp);
            this.description = data.weather[0].description;
            this.icon = data.weather[0].icon;

            this.isLoading = false;
        }  catch (error) {
            
            // Establece una ciudad por defecto en caso de que no se pueda obtener la ubicación
            this.city = "Buenos Aires";
            const defaultCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`;
            const defaultCityResponse = await fetch(defaultCityUrl);
            if (!defaultCityResponse.ok) {
              throw new Error("Unable to fetch weather data for default city.");
            }
            const defaultCityData = await defaultCityResponse.json();
            this.temperature = Math.round(defaultCityData.main.temp);
            this.description = defaultCityData.weather[0].description;
            this.icon = defaultCityData.weather[0].icon;
      
            this.isLoading = false;
          }
    }

}

const CarritoComponent = {
    template:
        `
    <div class="cart-icon" onclick="showPopup()">
    <i class="fa fa-shopping-cart" aria-hidden="true"></i><span class="cart-count">{{ lista_carrito.length }}</span>
</div>

<div class="popup" id="cart-popup">
    <div class="popup-header">
        <h2>Carrito</h2>
        <button class="popup-close" onclick="hidePopup()">x</button>
    </div>
    <div class="popup-body">
        <p v-if="lista_carrito.length === 0" >No hay productos en el carrito</p>
        <ul v-for="prod in lista_carrito" >
                <li>{{ prod.name }}</li>
        </ul>
        <p v-if="lista_carrito.length != 0" >  Total a Pagar :  {{ productoTotal }}$</p>
    </div>
</div>
    `,
    props: {
        lista_carrito: {
            type: Array,
            default: () => []
        }
    },

    computed: {
        productoTotal() {

            return this.lista_carrito.reduce((total, item) => total + item.price, 0);
        }
    }

}

const HeaderComponent = {

    components: {
        CarritoComponent,
        ApiComponent
    },


    template:
        `
        <header class="grid-container" >
            <ApiComponent/>

<div class="grid-item fila2"  >
        <div class=" columna1 logo">
        <img src="./imagenes/logotipo-moda1.svg" alt="" style="width:170px" >
            
        </div>

        <div class="registro columna2 ">
            <div class="user">
                <a href="#"><i class="fa fa-user" aria-hidden="true"></i>Iniciar Sesion</a>
                <span class="separador">-</span>
                <a href="#">Registrarse</a>
            </div>
            <CarritoComponent :lista_carrito="items" />

        </div>
</div>
            
</header> `,

    props: {
        items: {
            type: Array,
            default: () => []  //ACA LE ESTOY PONIENDO QUE POR DEFAULT SI AL COMPONENTE NO SE LE ENVIA NADA SEA UN ARRAY VACIO
        }
    }



}

const NavComponent = {
    template: `        <nav class="main-header">
    <div id="nav" class="main-nav">
        <div class="nav-links">
            <a class="link-item" href="./index.html">Inicio</a>
            <a class="link-item" href="./catalogo.html">Catalogo</a>
            <a class="link-item" href="./nosotros.html">Nosotros</a>
            <a class="link-item" href="./contacto.html">Contacto</a>
        </div>
    </div>
    <button id="button-menu" class="button-menu">
        <span></span>
        <span></span>
        <span></span>
    </button>
</nav>`
}

const FooterComponent = {
    template: `        <footer>

    <div class="box1">

    <img src="./imagenes/logotipo-moda1.svg" alt="" style="width:150px" >
            <p>Suscribete al newsletter</p>            
            <div class="newsletter_box">

                <input type="text" name="newsletter" id="newsletter" placeholder="Correo Electronico">
                <button class="enviar">Enviar</button>
            </div>
    
        <div class="menu_footer">

            <a href="./index.html">Inicio</a>
            <a href="./catalogo.html">Catalogo</a>
            <a href="./nosotros.html">Nosotros</a>                    
            <a href="./contacto.html">Contacto</a>
    
        </div>
    </div>

    <div class="final">
        <p>Proyecto hecho en Codo a Codo</p>
    </div>

</footer>`,

}