<template>
    <div>
        <b-navbar toggleable="lg" type="light" variant="light">
            <div class="container">
               <nuxt-link class="navbar-brand" to="/">BOManejo</nuxt-link>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <div class="nav-item">
                        <nuxt-link class="nav-link" to="/dashboard">Dashboard</nuxt-link>
                    </div>
                    
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <div class="nav-item">
                        <nuxt-link class="nav-link" to="/auth/register">Register</nuxt-link>
                    </div>
                    <div class="nav-item">
                        <nuxt-link class="nav-link" to="/auth/login">Login</nuxt-link>
                    </div>
                </b-navbar-nav>
                
                </b-collapse> 
            </div>
            
        </b-navbar>
    </div>
</template>