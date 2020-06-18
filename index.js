const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const { prefix, token } = require('./config.json');

client.login(token);

process.setMaxListeners(20);

client.on('guildMemberAdd', member =>{
  let welcomeEmbed = new Discord.MessageEmbed()
  .setColor('#63e764')
  .setTitle('**Welcome to Aviation hangouts!**')
  .addField("**New Member:**", `Welcome ${member} to the Aviation Hangouts Discord Server! please enjoy your time here :) Make sure to read <#718916575301730359> If you have any issues please contact a member of staff, Thanks :slight_smile:`, false) .setThumbnail('https://cdn.discordapp.com/attachments/718914777291948113/722128964373446660/unknown.png')
  .setTimestamp()

      member.guild.channels.cache.get('718914777291948113').send(welcomeEmbed)
});




  
  client.on('message', msg => {
  if (msg.content === '!invites') {

    var userId = msg.author.id;

    var userInvites = msg.guild.fetchInvites().then(invites => invites.find(invite => invite.inviter.id === userId));

    var useAmount = userInvites.uses;

    if (useAmount === undefined) {

        msg.channel.send(`${msg.author.username} has 0 invites`);
    }

    else {

        msg.channel.send(`${msg.author.username} has ${useAmount} invites`);
    }
}
  }); 



 


  
const config = require("./config.json");


client.on("ready", () => {
 
  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
  
  client.user.setActivity(`Watching over ${client.guilds.cache.size} servers`);
});

client.on("guildCreate", guild => {
  
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`I am currently stalking ${client.guilds.cache.size} servers`);
});

client.on("guildDelete", guild => {

  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`I am currently stalking ${client.guilds.cache.size} servers`);
});


client.on("message", async message => {
  
  if(message.author.bot) return;
  

  if(!message.content.startsWith(config.prefix)) return;
  
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "help") {
    let HelpEmbed = new Discord.MessageEmbed()
    .setColor('#ffffff')
    .setTitle(`${message.author.username},My commands are !help, !ping, !dog, !waddle, !ahegao, more to come though`) 
    .setTimestamp()
    return message.channel.send(HelpEmbed)
  }
 if (command === "waddle") {
  let waddleEmbed = new Discord.MessageEmbed()
  .setTitle(`${message.author.tag}, Waddle or die tommorow`)
 .setColor('#0e70df')
 .setImage('https://images-ext-1.discordapp.net/external/kvLhDXQtIUeanQMCwSSz6WlrRAWpJG3XxBQi_E3GwFI/%3Fwidth%3D319%26height%3D475/https/media.discordapp.net/attachments/592463507124125706/721910509783351336/Penguin_bots_bot_pfp_.png')
  return message.channel.send(waddleEmbed)
 }

if(command === "bork")  {
  let borkEmbed = new Discord.MessageEmbed()
  .setTitle('Bork!')
  .setImage(`https://media.discordapp.net/attachments/592463507124125706/723222781508059156/B3Frk.png?width=633&height=475`)
  .setTimestamp()
return message.channel.send(borkEmbed)
}     

 if (command === "ahegao")  {
   let ahegaoEmbed = new Discord.MessageEmbed()
   .setTitle(`Ahegao!`)
   .setImage(`https://cdn.discordapp.com/attachments/592463507124125706/723222937175326791/ahego_.png`)
   .setTimestamp()
   return message.channel.send(ahegaoEmbed)
 }

  if(command === "ping") {

    const m = await message.channel.send("Getting the ping");
    m.edit(`Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
  }

  
  if(command === "say") {
    if(!message.member.roles.cache.some(r=>["Staff"].includes(r.name)))
    return message.reply("Lol noob, you dont have permission");
   
    const sayMessage = args.join(" ");
    
    message.delete().catch(O_o=>{}); 
    
    message.channel.send(sayMessage);
  }

  if(command === "kick") {
    let RolePermsEmbed = new Discord.MessageEmbed()
    .setColor('#cf1313')
    .setTitle(`${message.author.username}, You do not have the required permission to do this`) 
    .setTimestamp()
    
    if(!message.member.roles.cache.some(r=>["Staff"].includes(r.name)))
      return message.channel.send(RolePermsEmbed);


    
    let member = message.mentions.members.first();
    let validMemberEmbed = new Discord.MessageEmbed()
    .setColor('#cf1313')
    .setTitle(`${message.author.username}, please mention a valid user of this server`)
    .setTimestamp()

    let missingBotKickPermmisionsEmbed = new Discord.MessageEmbed()
    .setColor('#cf1313')
    .setTitle(`${message.author.username}, I dont have the permmision to do this.`)

    if(!member)
    return message.channel.send(validMemberEmbed)
    if(!member.kickable) 
    return message.channel.send(missingBotKickPermmisionsEmbed)
    

    let missingBotPermmisionsEmbed = new Discord.MessageEmbed()
    .setColor('#cf1313')
    .setTitle(`${message.author.username}, I dont have the permmision to do this.`)
    
    let reason = args.slice(1).join(' ');
    let kicksuccesEmbed = new Discord.MessageEmbed()
    .setColor('#20d44d')
    .setTitle(`The user has been kicked by ${message.author.tag} because: ${reason}`)
    
    if(!reason) reason = "No reason provided";
    
    
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.channel.send(kicksuccesEmbed);

  }
  
  if(command === "ban") {
      let RolePermsEmbed = new Discord.MessageEmbed()
      .setColor('#cf1313')
      .setTitle(`${message.author.username}, You do not have the required permission to do this`) 
      .setTimestamp()
      if(!message.member.roles.cache.some(r=>["Staff"].includes(r.name)))
      return message.channel.send(RolePermsEmbed);




      let member = message.mentions.members.first();
    let validMemberEmbed = new Discord.MessageEmbed()
    .setColor('#cf1313')
    .setTitle(`${message.author.username}, please mention a valid user of this server`)
    .setTimestamp()

let missingBotPermmisionsEmbed = new Discord.MessageEmbed()
.setColor('#cf1313')
.setTitle(`${message.author.username}, I dont have the permmision to do this.`)

let reason = args.slice(1).join(' ');
let bansuccesEmbed = new Discord.MessageEmbed()
.setColor('#20d44d')
.setTitle(`The user has been banned by ${message.author.tag} because: ${reason}`)


    if(!member)
      return message.channel.send(validMemberEmbed);
    if(!member.bannable) 
      return message.channel.send(missingBotPermmisionsEmbed);

    if(!reason) reason = "No reason provided";
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.channel.send(bansuccesEmbed);
  }

});


client.on('guildMemberRemove', async member => {
	const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK',
	});

	const kickLog = fetchedLogs.entries.first();


	if (!kickLog) return console.log(`${member.user.tag} left the guild, most likely of their own will.`);

	
	const { executor, target } = kickLog;

	if (target.id === member.id) {
		console.log(`${member.user.tag} left the guild; kicked by ${executor.tag}?`);
	} else {
		console.log(`${member.user.tag} left the guild, audit log fetch was inconclusive.`);
	}
});

client.on('guildBanAdd', async (guild, user) => {
	const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD',
	});

	const banLog = fetchedLogs.entries.first();

	
	if (!banLog) return console.log(`${user.tag} was banned from ${guild.name} but no audit log could be found.`);

	
	const { executor, target } = banLog;


	if (target.id === user.id) {
		console.log(`${user.tag} banned in ${guild.name}, banned by ${executor.tag}`);
	} else {
		console.log(`${user.tag} banned in ${guild.name}, no audit logs found.`);
	}
});

client.on('message', async message => {
const fetch = require('node-fetch');
const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase()

fetch('https://aws.random.cat/meow').then(response => response.json());

if (command === 'cat') {
	const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
const CatEmbed = new Discord.MessageEmbed()
.setTitle('CAT!')
.setImage(file)
.setTimestamp()
	message.channel.send(CatEmbed);

}
});




