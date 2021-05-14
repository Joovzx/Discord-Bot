const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "info",
  description: "Show y'all about my devs.",
  usage: "",
  aliases: ["inf"],
  category: "devs",
  run: async (client, message, args) => {
    
    let owner = client.users.cache.get("ID").tag
    let first = ["#ff6347","#fff578","#3dff31"]; 
    let kedua = first[Math.floor(Math.random() * first.length)];
    
    message.inlineReply(new MessageEmbed()
    .setTitle("My Devs Is"+owner)
    .setColor(message.member.displayHexColor))

}} 
