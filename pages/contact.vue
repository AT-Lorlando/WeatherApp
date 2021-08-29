<template>
  <div>
      <header class="z-20 fixed flex items-center justify-between w-full p-2 border-b-4 border-red-200 bg-gradient-to-b from-blue-400 h-28">
      <h1 class="w-full text-6xl text-center text-green-800 transition duration-500 ease-in-out cursor-pointer hover:text-white">
        WeatherApp
      </h1>
      <nav class="main-nav">
        <div class="logo">
        my.company
        </div>
        <Burger/>
        </nav>
    </header>
    <Bar>
     <ul class="sidebar-panel-nav">
       <li><nuxt-link to="/">Home</nuxt-link></li>
       <li><nuxt-link to="/">About</nuxt-link></li>
       <li><nuxt-link to="/contact">Contact</nuxt-link></li>
     </ul>
    </Bar>
    <div class="flex flex-col w-full h-screen items-center justify-center">
        <div class="flex flex-col contact-form font-serif w-1/2 items-center">
            <h1 class="text-3xl hover:text-blue-700 pb-8">Contact Form</h1>
		    
                <form @submit.prevent="submit" @reset="onReset" class="text-x1 border-2 w-1/2">
                    <div>
                        <label>name</label>
                        <input v-model="name" placeholder="vos nom / prénom"/>
                    </div>
                    <div>
                        <label>email</label>
                        <input v-model="email" placeholder="votre adresse mail"/>
                    </div>
                    <div>
                        <label>message</label>
                        <textarea v-model="message" placeholder="votre message"></textarea>
                    </div>
                    <button class="submit">submit</button>
                    <button class="reset">reset</button>
                </form>
        
        </div>
        <p>Coucou</p>
    </div>
    </div>

</template>

<script>
/*
    Un formulaire de mail
    
*/
import Burger from '@/components/Menu/Burger.vue';
import Bar from '@/components/Menu/Bar.vue';

export default {
    components: {
        Burger,
        Bar
    },
    data() {
        return {
            name: "",
            email: "",
            message: "",
        };
     },
    computed: {
        formValid() {
            const { name, email, message } = this;
            return (
            name.length > 0 &&
            /(.+)@(.+){2,}.(.+){2,}/.test(email) &&
            message.length > 0
            );
        }
    },
    methods: {
        onReset() {
            this.name = "";
            this.email = "";
            this.message = "";
        },
        submit() {
            if (!this.formValid) {
                return;
            }
            if (!localStorage.getItem("messages")) {
                localStorage.setItem("messages", JSON.stringify([]));
            }
            const messages = JSON.parse(localStorage.getItem("messages"));
            const { name, email, message } = this;
            messages.push({
                name,
                email,
                message,
            });
            localStorage.setItem("messages", JSON.stringify(messages));
        }
    }
  }

</script>

<style>
 .main-nav {
   display: flex;
   justify-content: space-between;
   padding: 0.5rem 0.8rem;
 }

 ul.sidebar-panel-nav {
   list-style-type: none;
 }

 ul.sidebar-panel-nav > li > a {
   color: #fff;
   text-decoration: none;
   font-size: 1.5rem;
   display: block;
   padding-bottom: 0.5em;
 }
 
 .contact-form .submit {
	background: #da552f;
	border: solid 1px #da552f;
	color: white;
	cursor: pointer;
	padding: 10px 50px;
	text-align: center;
	text-transform: uppercase;
}
.contact-form .reset {
	background: #376183;
	border: solid 1px #376183;
	color: grey;
	cursor: pointer;
	padding: 10px 50px;
	text-align: center;
	text-transform: uppercase;
}
</style>