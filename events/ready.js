const db = require("quick.db")

module.exports.run = (client) => {
	client.user.setPresence({
status:"dnd",
	activity: { name:`ch.help・Charli XCX - Boom Clap╎Joovzx` , type:"COMPETING"},
})
};