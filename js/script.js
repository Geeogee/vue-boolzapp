function initVue() {

    new Vue({

        el: "#app",

        data: {

            contacts: [

                {
                    "name" : "Amore",
                    "avatar" : "img/amore.jpg",
                    "messages" : [
                        {
                            "date" : "10/04/2021 15:30:55",
                            "text" : "Hai portato a spasso il cane?",
                            "status" : "sent"
                        },

                        {
                            "date" : "10/04/2021 15:32:00",
                            "text" : "Ricordati anche di dargli da mangiare!",
                            "status" : "sent"
                        },

                        {
                            "date" : "10/04/2021 15:50:00",
                            "text" : "Si, tranquillo!",
                            "status" : "received"
                        }
                    ]
                },

                {
                    "name" : "Gino",
                    "avatar" : "img/gino.jpg",
                    "messages" : [
                        {
                            "date" : "10/04/2021 17:30:55",
                            "text" : "Stasera quindi usciamo?",
                            "status" : "sent"
                        },

                        {
                            "date" : "10/04/2021 17:31:10",
                            "text" : "Ci vediamo al bar.",
                            "status" : "received"
                        },

                        {
                            "date" : "10/04/2020 17:50:00",
                            "text" : "Perfetto!",
                            "status" : "received"
                        }
                    ]
                },

                {
                    "name" : "Gino Ax",
                    "avatar" : "img/gino-ax.jpg",
                    "messages" : [
                        {
                            "date" : "10/04/2021 19:00:07",
                            "text" : "Hai sentito Gino?",
                            "status" : "received"
                        },

                        {
                            "date" : "10/04/2021 19:15:10",
                            "text" : "Siamo al Coppa, sbrigati.",
                            "status" : "sent"
                        },

                        {
                            "date" : "10/04/2020 19:16:00",
                            "text" : "Scendo e arrivo! Ordinate anche per me!",
                            "status" : "received"
                        }
                    ]
                },

                {
                    "name" : "Mamma",
                    "avatar" : "img/mamma.jpg",
                    "messages" : [
                        {
                            "date" : "11/04/2021 9:00:00",
                            "text" : "Stai ancora dormendo?",
                            "status" : "received"
                        },

                        {
                            "date" : "11/04/2021 9:00:10",
                            "text" : "Chi dorme non piglia pesci!",
                            "status" : "received"
                        },

                        {
                            "date" : "11/04/2020 12:44:10",
                            "text" : "Buongiorno!",
                            "status" : "sent"
                        }
                    ]
                },


            ],

            "activeChat" : "",
            "isActive" : false,
            "currentImage" : "",
            "currentName" : ""
        },

        methods: {

            showChat: function(index,contact) {

                const user = this.contacts[index];
                const messages = user.messages;
                this.activeChat = messages;
                this.currentImage = contact.avatar;
                this.currentName = contact.name;
                this.isActive = true;
            }
        }
    })
}

function init() {

    initVue();
}

document.addEventListener("DOMContentLoaded", init)
