function initVue() {

    new Vue({

        el: "#app",

        data: {

            "test" : "Hello world!"
        }
    })
}

function init() {

    initVue();
}

document.addEventListener("DOMContentLoaded", init)
