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

            "activeUser" : "",
            "messageToSend" : {

                "date" : "",
                "text" : "",
                "status" : "sent"
            },

            "messageReceived" : {

                "date": "",
                "text" : "Ok!",
                "status" : "received"
            },

            "messageText" : "",
        },

        methods: {

            showChat: function(contact) {

                this.activeUser = contact;
            },

            sendMessage: function() {

                if (this.messageText.length > 0) {

                    this.messageToSend.text = this.messageText;
                    let time = this.getTodayDate();
                    this.messageToSend.date = time;
                    this.activeUser.messages.push(this.messageToSend);
                    setTimeout(this.receivedMessage, 2000);
                    
                }
            },

            receivedMessage: function() {

                const time = this.getTodayDate();
                this.messageReceived.date = time;
                this.activeUser.messages.push(this.messageReceived)

            },

            getTodayDate: function() {
                
                const time = new Date();
                let seconds = this.getDateFormat(time.getSeconds()).toString();
                let minutes = this.getDateFormat(time.getMinutes()).toString();
                let hours = this.getDateFormat(time.getHours()).toString();
                let year = this.getDateFormat(time.getFullYear()).toString();
                let months = this.getDateFormat(time.getMonth() + 1).toString();
                let day = this.getDateFormat(time.getDate()).toString(); 

                return `${day}/${months}/${year} ${hours}:${minutes}:${seconds}`
            },

            getDateFormat: function(value) {

                if (value < 10) {

                    value = "0" + value;
                }

                return value;
            }
        }
    })
}

function init() {

    initVue();
}

document.addEventListener("DOMContentLoaded", init)
