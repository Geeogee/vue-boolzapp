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
                            "status" : "sent",
                            "chevron" : false,
                            "info" : false
                        },

                        {
                            "date" : "10/04/2021 15:32:00",
                            "text" : "Ricordati anche di dargli da mangiare!",
                            "status" : "sent",
                            "chevron" : false,
                            "info" : false
                        },

                        {
                            "date" : "10/04/2021 15:50:00",
                            "text" : "Si, tranquillo!",
                            "status" : "received",
                            "chevron" : false,
                            "info" : false
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
                            "status" : "sent",
                            "chevron" : false,
                            "info" : false
                        },

                        {
                            "date" : "10/04/2021 17:31:10",
                            "text" : "Ci vediamo al bar.",
                            "status" : "received",
                            "chevron" : false,
                            "info" : false
                        },

                        {
                            "date" : "10/04/2020 17:50:00",
                            "text" : "Perfetto!",
                            "status" : "received",
                            "chevron" : false,
                            "info" : false
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
                            "status" : "received",
                            "chevron" : false,
                            "info" : false
                        },

                        {
                            "date" : "10/04/2021 19:15:10",
                            "text" : "Siamo al Coppa, sbrigati.",
                            "status" : "sent",
                            "chevron" : false,
                            "info" : false
                        },

                        {
                            "date" : "10/04/2020 19:16:00",
                            "text" : "Scendo e arrivo! Ordinate anche per me!",
                            "status" : "received",
                            "chevron" : false,
                            "info" : false
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
                            "status" : "received",
                            "chevron" : false,
                            "info" : false
                        },

                        {
                            "date" : "11/04/2021 9:00:10",
                            "text" : "Chi dorme non piglia pesci!",
                            "status" : "received",
                            "chevron" : false,
                            "info" : false
                        },

                        {
                            "date" : "11/04/2020 12:44:10",
                            "text" : "Buongiorno!",
                            "status" : "sent",
                            "chevron" : false,
                            "info" : false
                        }
                    ]
                },

            ],

            "activeUser" : "",
            "messageToSend" : {

                "date" : "",
                "text" : "",
                "status" : "sent",
                "info" : false,
                "chevron" : false
            },

            "messageReceived" : {

                "date": "",
                "text" : "Ok!",
                "status" : "received",
                "info" : false,
                "chevron" : false
            },

            "messageText" : "",
            "filterKey" : "",  
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

            removeMessage: function(index) {

                this.activeUser.messages.splice(index,1);
                if (this.activeUser.messages.length == 0) {

                    this.activeUser = "";
                    this.contacts.splice(index,1)
                }
            },

            showChevron: function(message) {

                message.chevron = true;    
            },

            hideChevron: function(message) {

                if (!message.info) {
                    message.chevron = false
                }
            },

            closeAll: function() {

                this.activeUser.messages.forEach(message => {

                    if(message.info) {
                        message.info = false;
                        message.chevron = false;
                    }
                });

            },

            showMessageInfo: function(messageActive) {

                this.activeUser.messages.forEach(message => {

                    if (message != messageActive) {

                        if (message.info) {
                            message.info = false;
                        }
                    }
                });
                
                messageActive.info = !messageActive.info;
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
        },



        computed: {

            filterChats: function() {

                return this.contacts.filter(contact => {

                    return contact.name.toLowerCase().includes(this.filterKey.toLowerCase())
                });
            }
        }
    })
}

function init() {

    initVue();
}

document.addEventListener("DOMContentLoaded", init)
