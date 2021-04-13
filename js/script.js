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
            "userProfile" : {

                "name" : "Gioele",
                "nameEditable" : false,
                "profileStatus" : "Sto dormendo",
                "statusEditable" : false
            }
            
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



            createNewMessage: function(text,status) {

                const newMessage = {

                    "date" : this.getTodayDate(),
                    "text" : text,
                    "status" : status,
                    "info" : false,
                    "chevron" : false
                }

                return newMessage
            },

            // Send a new message
            sendMessage: function() {

                if (this.messageText.length > 0) {
                    
                    const newMessage = this.createNewMessage(this.messageText, "sent");
                    this.activeUser.messages.push(newMessage);
                    this.messageText = "";

                    // Message reply after 1 second
                    // ActiveChat contains the chat where the automatic reply
                    // Will be displayed. Without it, the automatic reply
                    // will be visualized in the new chat, not in the one
                    // where the message is sent
                    const activeChat = this.activeUser; // !important
                    setTimeout(() => this.receiveMessage(activeChat) , 2000);
                }
            },

            // Create a new received message
            receiveMessage: function(activeChat) {

                const newMessage = this.createNewMessage("Ok!" , "received");
                activeChat.messages.push(newMessage);
            },

            // Deletes a message
            removeMessage: function(index) {

                this.activeUser.messages.splice(index,1);

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

            // Creates a dates string
            getTodayDate: function() {
                
                const time = new Date();
                let seconds = this.getDateFormat(time.getSeconds());
                let minutes = this.getDateFormat(time.getMinutes());
                let hours = this.getDateFormat(time.getHours());
                let year = this.getDateFormat(time.getFullYear());
                let months = this.getDateFormat(time.getMonth() + 1);
                let day = this.getDateFormat(time.getDate()); 

                return `${day}/${months}/${year} ${hours}:${minutes}:${seconds}`
            },

            // Adds zeros to have the same format
            // for every date
            getDateFormat: function(value) {

                if (value < 10) {

                    value = "0" + value;
                }

                return value;
            },

            editName: function() {

                this.userProfile.nameEditable = !this.userProfile.nameEditable;
                if (this.userProfile.nameEditable) {
                    this.$nextTick( () => this.$refs.profileName.focus())
                }
                
            },

            editStatus: function() {

                this.userProfile.statusEditable = !this.userProfile.statusEditable;
                if (this.userProfile.statusEditable) {
                    this.$nextTick( () => this.$refs.profileStatus.focus())
                }
                
            }
        },


        // Functions used to format text
        filters: {

            lastMessagePreview: function(messages) {

                const lastMessage = messages[messages.length-1].text;
                return lastMessage.slice(0,15);
                
            },

            lastDatePreview: function(messages) {

                const lastMessageDate = messages[messages.length - 1].date;
                return lastMessageDate.slice(11,16);
            }
        },

        computed: {

            // Filter chats function
            filterChats: function() {

                return this.contacts.filter(contact => {

                    return contact.name.toLowerCase().includes(this.filterKey.toLowerCase())
                });
            }
        },

        updated() {

            // Still doens't recognize absolute menù
            if (this.activeContact) { 

                const container = this.$el.querySelector("#wrapper-messages");
                container.scrollTop = container.scrollHeight; 
            }
                 
        }

    })
}

function init() {

    initVue();
}

document.addEventListener("DOMContentLoaded", init)
