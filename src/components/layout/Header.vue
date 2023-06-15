<script lang="ts" setup>
function openGit () {
    window.open('https://github.com/zerosdev/swapi-starship', '_blank')
}
</script>
<template>
    <header id="topnav" class="defaultscroll sticky">
        <div class="container">
            <RouterLink :to="`/`" class="logo">
                <img src="/images/starwars.png" height="26" class="logo-dark-mode" alt="">
            </RouterLink>
            <div class="menu-extras">
                <div class="menu-item">
                    <a class="navbar-toggle" id="isToggle" onclick="toggleMenu()">
                        <div class="lines">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </a>
                </div>
            </div>
            <ul class="buy-button list-inline mb-0">
                <li class="list-inline-item mb-0">
                    <div class="dropdown dropdown-primary">
                        <button type="button" class="btn btn-pills dropdown-toggle p-0" @click="openGit()">
                            <img src="https://icon-library.com/images/github-icon-white/github-icon-white-6.jpg" class="rounded-pill avatar avatar-sm-sm" alt="ZerosDev">
                        </button>
                    </div>
                </li>
            </ul>
            <div id="navigation">
                <ul class="navigation-menu nav-left">
                    <li><a target="_blank" href="https://github.com/zerosdev" class="sub-menu-item">GitHub</a></li>
                    <li><a target="_blank" href="https://linkedin.com/in/rony-wisnu-wardana" class="sub-menu-item">LinkedIn</a></li>
                    <li><a target="_blank" href="https://facebook.com/rony.w.wardana" class="sub-menu-item">Facebook</a></li>
                    <li><a target="_blank" href="mailto:ronywisnuwardana@gmail.com" class="sub-menu-item">Email</a></li>
                </ul>
            </div>
        </div>
    </header>
</template>