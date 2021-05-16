const { MessageEmbed } = require("discord.js");
const db = require("quick.db")
module.exports = {
  name: "help",
  alises: ["h","tolong","command","commands","cmds","cmd"],
  description:
    "Get list of all command and even get to know every command detials",
  usage: "help <cmd>",
  category: "info",
  run: async (client, message, args) => {
    if (args[0]) {
      const command = await client.commands.get(args[0]);

      if (!command) {
        return message.channel.send("Unknown Command: " + args[0]);
      }

      let embed = new MessageEmbed()
        .setAuthor(command.name, client.user.displayAvatarURL())
        .addField("Description", command.description || "Not Set Yet.")
        .addField("Usage", "`" + command.usage + "`" || "Not Provied.")
        .setThumbnail(client.user.displayAvatarURL())
        .setColor(message.guild.me.displayHexColor)
        .setFooter(client.user.username, client.user.displayAvatarURL());

      return message.channel.send(embed);
    } else {
      const commands = await client.commands;

      let emx = new MessageEmbed()
       // .setDescription("Join my server or Die :D")
        .setColor(message.guild.me.displayHexColor)
       // .setTitle(message.guild.name)
       // .setImage("https://cdn.discordapp.com/attachments/827058797138804737/830273806237040660/20210409_1224001.gif")
       // .setFooter("Nicki Discord Bot!")
       // .setDescription(" <a:apibirukecil:783338745449283666>  <a:hurufh:783220761182994472> <a:hurufe:783220511810781194> <a:hurufl:783221600728121355> <a:hurufp:783221701952929802>    <a:hurufp:783221701952929802> <a:hurufa:783220545323270154> <a:hurufg:783220704220676117> <a:hurufe:783220511810781194>  <a:apibirukecil:783338745449283666> \u200b")
       .setTimestamp()
        .setThumbnail(client.user.displayAvatarURL())
      let com = {};
      for (let comm of commands.array()) {
        let category = comm.category || "No Category";
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for(const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "`" + value.join("`, `") + "`";

        emx.addField(`${category.toUpperCase()}`, desc); //value.length
      }

      let database = db.get(`cmd_${message.guild.id}`)

      if(database && database.length) {
        let array =[]
        database.forEach(m => {
          array.push("`" + m.name + "`")
        })

        emx.addField("Custom Commands", array.join(", "))
      }

      return message.channel.send(emx);
    }
  }
};