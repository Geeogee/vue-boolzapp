function initVue() {

    new Vue({

        el: "#app",

        data: {

            // Contacts array
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
                            "date" : "11/04/2021 09:00:00",
                            "text" : "Stai ancora dormendo?",
                            "status" : "received",
                            "chevron" : false,
                            "info" : false
                        },

                        {
                            "date" : "11/04/2021 09:00:10",
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

            "activeTab" : "intro",
            "activeUser" : "",
            "profileUser" : false,
            "messageText" : "",
            "filterKey" : "",
        },

        methods: {


            // Show active user chat
            showChat: function(contact) {

                this.activeUser = contact;
                this.$nextTick(() => this.$refs.messageText.focus());
                
            },

            showProfile: function() {

                this.activeTab = "userProfile";
            },

            userMessagePreview: function(contact) {

                if(this.contacts.includes(contact)) {

                    return contact.messages[contact.messages.length - 1].text.slice(0,15);
                }
            },

            userDatePreview: function(contact) {

                if (this.contacts.includes(contact)) {

                    return contact.messages[contact.messages.length - 1].date.slice(11,16);
                }
            },

            // Send a new message
            sendMessage: function() {

                if (this.messageText.length > 0) {
                    
                    const messageToSend = {

                        "date" : "",
                        "text" : "",
                        "status" : "sent",
                        "info" : false,
                        "chevron" : false
                    }

                    messageToSend.text = this.messageText;
                    let time = this.getTodayDate();
                    messageToSend.date = time;
                    this.activeUser.messages.push(messageToSend);
                    this.messageText = "";
                    // Message reply after 1 second
                    setTimeout(this.receivedMessage, 1000);
                    
                }
            },

            // Create a new received message
            receivedMessage: function() {

                const messageReceived = {

                    "date": "",
                    "text" : "Ok!",
                    "status" : "received",
                    "info" : false,
                    "chevron" : false
                }

                const time = this.getTodayDate();
                messageReceived.date = time;
                this.activeUser.messages.push(messageReceived);
            
            },

            // Deletes a message
            removeMessage: function(index) {

                this.activeUser.messages.splice(index,1);

                // If there are no messages in the active chat
                // It'll be closed and the user'll be deleted from
                // Active users list on the left
                if (this.activeUser.messages.length == 0) {

                    this.contacts.splice(this.contacts.indexOf(this.activeUser),1);
                    this.activeUser = "";
                }
            },

            // Shows chevron on mouse enter
            showChevron: function(message) {

                message.chevron = true;            
            },

            // Hides chevron on mouse leave
            hideChevron: function(message) {

                if (!message.info) {
                    message.chevron = false
                }
            },

            // Closes all the message infos open 
            // When clicking on the div
            // That contains all the messages
            closeAll: function() {

                this.activeUser.messages.forEach(message => {

                    if(message.info) {
                        message.info = false;
                        message.chevron = false;
                    }
                });

            },


            // Shows dropdown menùs for messages
            // And closes all the others dropdowns
            // except the one for the clicked message
            showMessageInfo: function(messageActive) {

                this.activeUser.messages.forEach(message => {

                    if (message != messageActive) {

                        if (message.info) {
                            message.info = false;
                            message.chevron = false;
                        }
                    }
                });
                
                messageActive.info = !messageActive.info;
            },


            // Creates a dates string
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

            // Adds zeros to have the same format
            // for every date
            getDateFormat: function(value) {

                if (value < 10) {

                    value = "0" + value;
                }

                return value;
            }
        },

        computed: {

            // Filter chats function
            filterChats: function() {

                return this.contacts.filter(contact => {

                    return contact.name.toLowerCase().includes(this.filterKey.toLowerCase())
                });
            }
        }

        // updated: function() {

        //     // Still buggy
        //     var container = this.$el.querySelector("#wrapper-messages");
        //     container.scrollTop = container.scrollHeight;
            
        // }

    })
}

function init() {

    initVue();
}

document.addEventListener("DOMContentLoaded", init)
