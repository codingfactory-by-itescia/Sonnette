/* import { SLACK_OAUTH_TOKEN, BOT_SPAM_CHANNEL } from './constants'
import  { WebClient } from '@slack/web-api';

const web = new WebClient(SLACK_OAUTH_TOKEN);
(async () => {
    // See: https://api.slack.com/methods/chat.postMessage
    const res = await web.chat.postMessage({ username: "Moi", channel: BOT_SPAM_CHANNEL, text: 'Bonjour Kévin' });
    // `res` contains information about the posted message
    console.log('Message sent: ', res.ts);
  })();
 */
