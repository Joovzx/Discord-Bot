const { keep_alive } = require("./haha.js")
const discord = require("discord.js"); 
const client = new discord.Client({
  disableEveryone: true, fetchAllMembers:true
});

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["command", "events"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
require("discord-reply");
const { APIMessage, Structures } = require("discord.js");
/* SLASH COMMANDS */
const { Slash } = require("discord-slash-commands");
const slash = new Slash(client);
client.on("ready", () => {
    slash.command({
        guildOnly: false,
      //  guildID: "774141197358202881",
        data: {
            name: "joovzx",
            description: "About My Own.",
            type: 4,
            content: `Thats my own.`,
        },
    });
});
/*-----------------------------------*/
class Message extends Structures.get("Message") {
    async inlineReply(content, options) {
        const mentionRepliedUser = typeof ((options || content || {}).allowedMentions || {}).repliedUser === "undefined" ? true : ((options || content).allowedMentions).repliedUser;
        delete ((options || content || {}).allowedMentions || {}).repliedUser;

        const apiMessage = content instanceof APIMessage ? content.resolveData() : APIMessage.create(this.channel, content, options).resolveData();
        Object.assign(apiMessage.data, { message_reference: { message_id: this.id } });
    
        if (!apiMessage.data.allowed_mentions || Object.keys(apiMessage.data.allowed_mentions).length === 0)
            apiMessage.data.allowed_mentions = { parse: ["users", "roles", "everyone"] };
        if (typeof apiMessage.data.allowed_mentions.replied_user === "undefined")
            Object.assign(apiMessage.data.allowed_mentions, { replied_user: mentionRepliedUser });

        if (Array.isArray(apiMessage.data.content)) {
            return Promise.all(apiMessage.split().map(this.inlineReply.bind(this)));
        }

        const { data, files } = await apiMessage.resolveFiles();
        return this.client.api.channels[this.channel.id].messages
            .post({ data, files })
            .then(d => this.client.actions.MessageCreate.handle(d).message);
    }
}

Structures.extend("Message", () => Message);

client.package = require("./package.json")
client.db = require("quick.db")
client.config = require("./config.json")
client.fetch = require("node-fetch")

client.login(process.env.token);