import { SLACK_OAUTH_TOKEN, BOT_SPAM_CHANNEL } from './constants'
import  { WebClient } from '@slack/web-api';

const web = new WebClient(SLACK_OAUTH_TOKEN);

async function sendMessageSlack(username, message){
  // See: https://api.slack.com/methods/chat.postMessage
  const res = await web.chat.postMessage({ username: username, channel: BOT_SPAM_CHANNEL, text: message });
  // `res` contains information about the posted message
  console.log('Message sent: ', res.ts);
}
