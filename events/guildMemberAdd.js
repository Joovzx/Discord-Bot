const db = require("quick.db")
const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();
const discord = require("discord.js")


module.exports.run = async (client, member) => {
  let chx = db.get(`welchannel_${member.guild.id}`);

  if (chx === null) {
    return;
  }

  
   let data = await canva.welcome(member, { link: "https://i.pinimg.com/originals/f3/1c/39/f31c39d56512dc8fbf30f9d0fb3ee9d3.jpg" })
 
    const attachment = new discord.MessageAttachment(
      data,
      "welcome-image.png"
    );
  
  


  client.channels.cache.get(chx).send(`<a:TH_chikalala:782772513993261097> Welcome to our Server <@${member.user.id}>\nRead our rule's on <#777327967282003998> and take your own roles in <#772619071127683092>`);
}